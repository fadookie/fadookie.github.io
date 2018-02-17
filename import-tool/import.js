const _ = require('lodash');
const config = require('./config.json');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.db, config.user, config.password, config.options);
const yaml = require('js-yaml');
const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');
const assert = require('assert');

const getPosts = async (query) => {
  const posts = (await sequelize.query(query, { type: sequelize.QueryTypes.SELECT}));
  return _.chain(posts)
    .groupBy('ID')
    .transform((result, post, postId) => {
      post[0].meta = {};
      result[postId] = post[0];
    })
    .value();
};

const base64Encode = text => Buffer.from(text).toString('base64');

const deserialize = (serialized) => JSON.parse(execSync(`php ./deserialize.php '${serialized}'`).toString());

const main = async () => {
  const posts = await getPosts('SELECT * FROM wp_posts WHERE wp_posts.post_type = "portfolio" AND wp_posts.post_status = "publish"');
  const attachments = await getPosts('SELECT * FROM wp_posts WHERE wp_posts.post_type = "attachment"');

  const postMeta = await sequelize.query('SELECT post_id, meta_key, meta_value FROM wp_posts INNER JOIN wp_postmeta ON wp_posts.ID=wp_postmeta.post_id WHERE wp_posts.post_type = "portfolio" AND wp_posts.post_status = "publish"', { type: sequelize.QueryTypes.SELECT });
  const imageMetaAll = await sequelize.query('SELECT * FROM wp_postmeta WHERE meta_key = "_wp_attached_file" OR meta_key = "_wp_attachment_metadata"', { type: sequelize.QueryTypes.SELECT });


  const getImageInfo = imageID => ({
    value: attachments[imageID].guid,
    postId: attachments[imageID].ID,
  });

  const getImageUrls = (imageDict) => {
    const image = getImageInfo(imageDict.value);
    const imageMetaAndFile = imageMetaAll.filter(x => x.post_id === image.postId);
    const imageFile = imageMetaAndFile.find(x => x.meta_key === '_wp_attached_file').meta_value;
    const imageMetaSerialized = imageMetaAndFile.find(x => x.meta_key === '_wp_attachment_metadata').meta_value;
    const imageMeta = deserialize(base64Encode(imageMetaSerialized));


    assert.notStrictEqual(imageFile, undefined, "image filename not found");
    assert.notStrictEqual(imageMeta.sizes.thumbnail.file, undefined, "thumbnail image not found");
    assert.notStrictEqual(imageMeta.sizes.medium.file, undefined, "medium image not found");

    const imageS3URL = image.value.replace('http://www.eliotlash.com/', 'https://eliotlash.s3.amazonaws.com/');
    const thumb = imageS3URL.replace(imageFile, imageMeta.sizes.thumbnail.file);
    const medium = imageS3URL.replace(imageFile, imageMeta.sizes.medium.file);
    const large = imageMeta.sizes.large ? imageS3URL.replace(imageFile, imageMeta.sizes.large.file) : undefined;

    return large ? { thumbUrl: thumb, mediumUrl: medium, largeUrl: large } : { thumbUrl: thumb, mediumUrl: medium };
  };

  postMeta.forEach((meta) => {
    let value;
    switch(meta.meta_key) {
      case 'portfolio_media':
        const attachmentJson = deserialize(meta.meta_value);
        const groupedAttachments = _.groupBy(attachmentJson, 'type');

        console.log('groupedAttachments', Object.keys(groupedAttachments));

        let otherImagesPretty = [];
        if (groupedAttachments.image) {
          const coverImage = _.head(groupedAttachments.image);
          const coverImageUrls = getImageUrls(coverImage);
          posts[meta.post_id].meta.cover = Object.assign({ value: getImageInfo(coverImage.value).value }, coverImageUrls);

          const otherImages = _.tail(groupedAttachments.image);
          otherImagesPretty = _.map(otherImages, (otherImage) => {
            const info = getImageInfo(otherImage.value);
            const urls = getImageUrls(otherImage);
            return Object.assign({ type: 'image', value: info.value }, urls);
          });
          console.log('got other images:', otherImagesPretty);
          // otherImagesPretty = _.map(otherImages, attachment =>
          //   Object.assign({}, attachment, getImageUrls(attachment.value))
          // );
        }
        let newValue = _.chain(groupedAttachments)
          .omit('image')
          .toPairs()
          .unzip()
          .tail()
          .flattenDeep()
          .concat(otherImagesPretty)
          .value();
        console.log('newValue', JSON.stringify(newValue));
        value = newValue;
        break;
      default:
        if(meta.meta_key.startsWith('portfolio')) {
          value = meta.meta_value;
        } else if (!meta.meta_key.startsWith('_') && meta.meta_key !== 'aktt_notify_twitter') {
          throw new Error(`Unrecognized meta key '${meta.meta_key}'`);
        }
        break;
    }
    if (value) {
      posts[meta.post_id].meta[meta.meta_key.replace('portfolio_', '')] = value;
    }
  });

  _.mapValues(posts, (post) => {

    const filepath = `${__dirname}/../_works/${post.post_name}.html`;
    const fileContents = readFileSync(filepath).toString();
    const frontMatterRegexp = /---\n/g;
    const frontMatterStart = frontMatterRegexp.exec(fileContents);
    const frontMatterStartIndex = frontMatterStart.index + frontMatterStart[0].length;
    const frontMatterEnd = frontMatterRegexp.exec(fileContents); // get second match

    const frontMatterYaml = fileContents.slice(frontMatterStartIndex, frontMatterEnd.index);
    const frontMatterObj = yaml.safeLoad(frontMatterYaml);

    frontMatterObj.portfolio = post.meta;

    const newFrontMatterYaml = yaml.safeDump(frontMatterObj);

    const spliceString = (string, start, end, newString) =>
      string.slice(0, start) + newString + string.slice(end);
    const newFileContents = spliceString(fileContents, frontMatterStartIndex, frontMatterEnd.index, newFrontMatterYaml);

    writeFileSync(filepath, newFileContents);

    console.log('wrote to', filepath, ': ', newFileContents);
  });
  console.log('done.');
};
main().catch((e) => {
  console.error(e);
  exit(1);
});




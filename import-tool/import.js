const _ = require('lodash');
const config = require('./config.json');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.db, config.user, config.password, config.options);
const yaml = require('js-yaml');
const atob = require('atob');
const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');

const getPosts = async (query) => {
  const posts = (await sequelize.query(query, { type: sequelize.QueryTypes.SELECT}));
  return _.chain(posts)
    .groupBy('ID')
    .transform((result, post, postId) => {
      post[0].meta = {}
      result[postId] = post[0];
    })
    .value();
};

const main = async () => {
  const posts = await getPosts('SELECT * FROM wp_posts WHERE wp_posts.post_type = "portfolio" AND wp_posts.post_status = "publish"');
  const attachments = await getPosts('SELECT * FROM wp_posts WHERE wp_posts.post_type = "attachment"');

  const postmeta = await sequelize.query('SELECT post_id, meta_key, meta_value FROM wp_posts INNER JOIN wp_postmeta ON wp_posts.ID=wp_postmeta.post_id WHERE wp_posts.post_type = "portfolio" AND wp_posts.post_status = "publish"', { type: sequelize.QueryTypes.SELECT});
  postmeta.forEach((meta) => {
    let value;
    switch(meta.meta_key) {
      case 'portfolio_media':
        const serialized = atob(meta.meta_value).toString()
        const attachmentJson = JSON.parse(execSync(`php ./deserialize.php '${serialized}'`).toString());
        const attachmentData = _.chain(attachmentJson)
          .map(attachment => {
            if (attachment.type === 'image') {
              const value = attachments[attachment.value].guid;
              return Object.assign({}, attachment, { value });
            } else {
              return attachment;
            }
          })
          .value();
        posts[meta.post_id].meta.cover = attachmentData.find(x => x.type === 'image').value;
        value = attachmentData;
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

    const filepath = `${__dirname}/../_works/${post.post_name}.html`
    const fileContents = readFileSync(filepath).toString();
    const frontMatterRegexp = /---/g;
    frontMatterRegexp.exec(fileContents);
    const frontMatterEnd = frontMatterRegexp.exec(fileContents); // get second match

    const portfolioYaml = yaml.safeDump({ portfolio: post.meta });

    const spliceString = (string, index, newString) =>
      string.slice(0, index) + newString + string.slice(index);
    const newFileContents = spliceString(fileContents, frontMatterEnd.index, portfolioYaml);

    writeFileSync(filepath, newFileContents);

    console.log('wrote to', filepath);
  });
  console.log('done.');
};
main();




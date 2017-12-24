const _ = require('lodash');
const config = require('./config.json');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.db, config.user, config.password, config.options);

const main = async () => {
  const posts = (await sequelize.query('SELECT * FROM wp_posts WHERE wp_posts.post_type = "portfolio" AND wp_posts.post_status = "publish"', { type: sequelize.QueryTypes.SELECT}));
  const postHash = _.chain(posts)
    .groupBy('ID')
    .transform((result, post, postId) => {
      post[0].meta = {}
      result[postId] = post[0];
    })
    .value();
  console.log('got posts', postHash);

  const postmeta = await sequelize.query('SELECT * FROM wp_posts INNER JOIN wp_postmeta ON wp_posts.ID=wp_postmeta.post_id WHERE wp_posts.post_type = "portfolio" AND wp_posts.post_status = "publish"', { type: sequelize.QueryTypes.SELECT});
  postmeta.forEach((meta) => {
  });
};
main();




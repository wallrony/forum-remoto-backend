import express from 'express';
import PostsController from '../data/controllers/PostsController';
import ReportController from '../data/controllers/ReportController';
import PostTagController from '../data/controllers/PostTagController';
import ContentLikeController from '../data/controllers/ContentLikeController';

const coreRouter = express.Router();

coreRouter.route('/users/:user_id/reports')
  .get(ReportController.index)
  .post(ReportController.add)
coreRouter.route('/users/:user_id/reports/:report_id')
  .delete(ReportController.delete)

coreRouter.route('/posts')
  .get(PostsController.index)
coreRouter.route('/users/:user_id/posts')
  .get(PostsController.userIndex)
  .post(PostsController.add)
coreRouter.route('/users/:user_id/posts/:post_id')
  .get(PostsController.show)
  .put(PostsController.update)
  .delete(PostsController.delete);

coreRouter.route('/posts_tags')
  .get(PostTagController.index);

coreRouter.route('/users/:user_id/content-like')
  .get(ContentLikeController.index)
  .post(ContentLikeController.add)
  .put(ContentLikeController.update);

export default coreRouter;
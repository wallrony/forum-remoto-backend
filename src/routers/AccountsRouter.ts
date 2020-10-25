import express from 'express';
import AuthController from '../data/controllers/AuthController';
import UserController from '../data/controllers/UserController';

const accountsRouter = express.Router();

accountsRouter.post('/login', AuthController.login);

accountsRouter.route('/users')
  .get(UserController.show)

accountsRouter.route('/users/register')
  .post(UserController.add)

accountsRouter.route('/users/:user_id')
  .put(UserController.update)
  .delete(UserController.delete);

export default accountsRouter;
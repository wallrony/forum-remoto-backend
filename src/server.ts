import express from 'express';
import cors from 'cors';

import accountsRouter from './routers/AccountsRouter';
import coreRouter from './routers/CoreRouter';
import AuthController from './data/controllers/AuthController';

const server = express();

server.use(express.json());
server.use(cors());
server.all('*', AuthController.treatAuthorization);
server.use('/api/core/', coreRouter)
server.use('/api/accounts/', accountsRouter);

export default server;
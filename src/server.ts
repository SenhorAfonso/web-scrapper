import express from 'express';
import fetchRouter from './routes/fetchRoutes';

class Server {
  server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
  }

  private middlewares() {
    this.server.use('/api', fetchRouter);
  }

}

export default new Server().server;
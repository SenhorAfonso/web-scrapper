import express from 'express';

class Server {
  server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
  }

  private middlewares() {
  }

}

export default new Server().server;
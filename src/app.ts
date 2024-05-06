import server from './server';

class App {

  constructor() {
    this.start();
  }

  private start() {
    server.listen(3000, () => {
      console.log('Servidor está ouvindo na porta 3000!');
    });
  }

}

new App();
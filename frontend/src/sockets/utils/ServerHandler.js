const io = require('socket.io-client');
const http = require('http');
const ioBack = require('socket.io');

export class ServerHandler {
  constructor() {
    this.httpServer = http.createServer().listen();
    this.ioServer = ioBack(this.httpServer);

    this.ioServer.on('connection', (serverSocket) => {
      this.serverSocket = serverSocket;
    });
  }

  setUpSocket(done) {
    this.httpServerAddr = this.httpServer.address();
    this.socket = io.connect(`http://[${this.httpServerAddr.address}]:${this.httpServerAddr.port}`, {
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true,
      transports: ['websocket'],
    });
    
    this.socket.on('connect', () => {
      done();
    });
    return this.socket;
  }

  cleanUp() {
    this.ioServer.close();
    this.httpServer.close();
  }

  getServerSocket() {
    return this.serverSocket;
  }

  getSocket() {
    return this.socket;
  }
}

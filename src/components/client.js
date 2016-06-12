'use strict';

import Socket from 'socket.io-client';

class Client {
  constructor() {
    const host = 'http://localhost:4200';
    const options = {};

    this.socket = new Socket(host, options);
  }

  onMetadata(callback) {
    this.socket.on('metadata', callback);
  }

  onComplete(callback) {
    this.socket.on('complete', callback);
  }

  onData(callback) {
    this.socket.on('data', callback);
  }

  onCompute(callback) {
    this.socket.on('compute', callback);
  }

  sendData(data) {
    this.socket.emit('data', data);
  }

  sendNumber(number) {
    this.socket.emit('number', number);
  }
}

const client = new Client();
export default client;

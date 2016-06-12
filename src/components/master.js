'use strict';

import EventEmitter from 'events';
import md5 from 'md5';
import Slave from './slave';
import Client from './client';

class Master {
  constructor() {
    this.ee = new EventEmitter();

    Client.onComplete((time) => {
      this.ee.emit('complete', time);
    });

    Client.onData((data) => {
      this.ee.emit('data', data);
    });

    Client.onCompute(({range, hashes}) => {
      console.log(`Slave received range from ${range.start} to ${range.end}`);

      Slave.worker(hashes, range.start, range.end, (number) => {
        console.log(`Number found: ${number}`);
        Client.sendNumber(number);
      });
    });
  }

  generateItems(count, maxValue) {
    const numbers = [];

    for (let i = 0; i < count; i++) {
      const number = Math.floor(Math.random() * maxValue);
      numbers.push(number);
    }

    const items = numbers.map((number) => {
      return {
        number,
        hash: md5(number),
        success: false
      }
    });

    return items;
  }

  runOnSingleHost(count, maxValue) {
    this.start = new Date().getTime();
    const items = this.generateItems(count, maxValue);
    const data = {
      items,
      maxValue
    };
    const hashes = data.items.map(({hash}) => hash);
    this.ee.emit('data', data);

    Slave.compute(hashes, maxValue, (number) => {
      console.log(`Number found: ${number}`);
      const complete = Master.setSuccess(data.items, number);
      this.ee.emit('data', data);

      if (complete) {
        const time = new Date().getTime() - this.start;
        this.ee.emit('complete', time);
      }
    });
  }

  runOnMultipleHosts(count, maxValue) {
    this.start = new Date().getTime();
    const items = this.generateItems(count, maxValue);
    this.data = {
      items,
      maxValue
    };
    Client.sendData(this.data);
  }

  static setSuccess(items, number) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].number === number) {
        items[i].success = true;
      }
    }

    return items.reduce((current, {success}) => current && success, true);
  }
  
  onData(callback) {
    this.ee.on('data', callback);
  }

  onComplete(callback) {
    this.ee.on('complete', callback);
  }
}

const master = new Master();
export default master;

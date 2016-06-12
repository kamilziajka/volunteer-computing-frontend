'use strict';

import md5 from 'md5';

const Slave = {};

Slave.compute = (hashes, maxValue, callback) => {
  const currentValue = 0;
  Slave.worker(hashes, currentValue, maxValue, callback);
};

Slave.worker = (hashes, currentValue, maxValue, callback) => {
  for (let i = currentValue; i < maxValue; i++) {
    const hash = md5(i);

    if (!!~hashes.indexOf(hash)) {
      callback(i);

      setTimeout(() => {
        Slave.worker(hashes, ++i, maxValue, callback);
      }, 0);

      break;
    }
  }
};

export default Slave;

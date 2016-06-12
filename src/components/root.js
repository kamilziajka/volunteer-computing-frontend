'use strict';

import React, {Component} from 'react';
import Metadata from './metadata';
import Controller from './controller';
import Status from './status';

class Root extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <Metadata/>
            <Controller/>
            <Status/>
          </div>
        </div>
      </div>
    );
  };
}

export default Root;

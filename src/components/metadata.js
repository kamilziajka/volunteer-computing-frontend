'use strict';

import React, {Component} from 'react';
import client from './client';

class Metadata extends Component {
  state = {
    clients: 0
  };

  componentDidMount() {
    client.onMetadata(({clients}) => {
      this.setState({clients});
    });
  }

  render() {
    const {clients} = this.state;

    return (
      <div className="panel panel-default panel-info">
        <div className="panel-body">
          <div className="col-md-12">
            <h4>Clients: {clients}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Metadata;

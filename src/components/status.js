'use strict';

import React, {Component} from 'react';
import Master from './master';

class Metadata extends Component {
  state = {
   data: {
     items: [],
     maxValue: 0
   }
  };

  componentDidMount() {
    Master.onData((data) => {
      this.setState({data});
    });
  }

  render() {
    const {data} = this.state;

    const items = data.items.map(({number, hash, success}, index) => {
      return (
        <div className="col-md-3" key={index}>
          <span className={`col-md-12 label label-${success ? 'success' : 'primary'} label-data`}>{number}: {hash}</span>
        </div>
      );
    });

    const warning = (
      <div className="col-md-12">
        <div className="col-md-12 label label-info label-data">No data generated yet</div>
      </div>
    );

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          {items.length ? items : warning}
        </div>
      </div>
    );
  }
}

export default Metadata;

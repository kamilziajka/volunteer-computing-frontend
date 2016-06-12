'use strict';

import React, {Component} from 'react';
import Master from './master';

class Metadata extends Component {
  state = {
    count: 16,
    maxValue: 100000,
    time: 0
  };

  componentDidMount() {
    Master.onComplete((time) => {
      this.setState({time});
    })
  }

  runOnSingleHost() {
    const {count, maxValue} = this.state;
    this.setState({start: new Date()});
    
    Master.runOnSingleHost(count, maxValue, () => {
      this.setState({
        end: new Date(),
        complete: true
      })
    });
  }

  runOnMultipleHosts() {
    const {count, maxValue} = this.state;
    this.setState({start: new Date()});

    Master.runOnMultipleHosts(count, maxValue, () => {
      this.setState({
        end: new Date(),
        complete: true
      })
    });
  }

  handleCountChange(event) {
    this.setState({
      count: event.target.value
    });
  }

  handleMaxValueChange(event) {
    this.setState({
      maxValue: event.target.value
    });
  }

  render() {
    const {count, maxValue, time} = this.state;

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="col-md-12">
            <div className="form">
              <div className="form-group margin-right">
                <label for="count" className="margin-right">Hashes: </label>
                <input type="text" className="form-control" id="count" placeholder="16" value={count} onChange={this.handleCountChange.bind(this)}/>
              </div>

              <div className="form-group margin-right">
                <label for="maxValue" className="margin-right">Range max value: </label>
                <input type="text" className="form-control" id="maxValue" placeholder="100000" value={maxValue} onChange={this.handleMaxValueChange.bind(this)}/>
              </div>

              <a className="btn btn-primary margin-right" href="/" target="_blank">Open a new client</a>

              <button className="btn btn-success margin-right" onClick={this.runOnSingleHost.bind(this)}>Run on a single host</button>

              <button className="btn btn-success margin-right" onClick={this.runOnMultipleHosts.bind(this)}>Run on multiple hosts</button>

              {time ? <button className="btn btn-primary disabled">Time: {time / 1000}s</button> : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Metadata;

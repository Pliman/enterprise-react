import React from 'react';
import styles from './home-h5.less';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 content">
            content
          </div>
        </div>
      </div>
    );
  }
}

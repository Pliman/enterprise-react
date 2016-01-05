import React from 'react';
import styles from './home-browser.less';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4">
            <ul className="nav nav-pills nav-stacked">
              <li role="presentation" className="active"><a href="#">Home</a></li>
              <li role="presentation"><a href="#">Profile</a></li>
              <li role="presentation"><a href="#">Messages</a></li>
            </ul>
          </div>
          <div className="col-sm-8 content">
            content
          </div>
        </div>
      </div>
    );
  }
}

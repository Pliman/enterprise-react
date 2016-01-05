import React from 'react';
import styles from './login.less';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }

  render() {
    return (
      <div className="container">
        <form method="post">
          <div className="form-group">
            <label htmlFor="username">User name:</label>
            <input type="text" className="form-control" id="username"
                   placeholder="user name"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" className="form-control" id="password"
                   placeholder="Password"/>
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }
}

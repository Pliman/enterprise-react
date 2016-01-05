import React from 'react';
import styles from './login-h5.less';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    return (
      <div className={styles.app}>
        bar
      </div>
    );
  }
}

import React from 'react';
import {run, Route, DefaultRoute, RouteHandler} from 'react-router';
import ReactDOM from 'react-dom';
import Login from './login/Login-h5.js';
import Home from './home/Home-h5.js';

import appStyleH5 from './app-h5.less';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      app: {
        platform: "browser"
      }
    };
  }
  render() {
    return (<RouteHandler />);
  }
}

const routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="login" handler={Login} />
    <Route name="home" handler={Home} />
  </Route>
);

document.addEventListener('DOMContentLoaded', function () {
  run(routes,
    function (Handler) {
      ReactDOM.render(<Handler />, document.getElementById('h5-root'));
    });
});

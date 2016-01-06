import React from 'react';
import {run, Route, DefaultRoute, RouteHandler} from 'react-router';
import ReactDOM from 'react-dom';
import Login from './login/Login.js';
import Home from './home/Home.js';

var docReady = require("exports?docReady!../lib/docready/docready");
import './app.less';

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
    <DefaultRoute name="login" handler={Login}/>
    <Route name="home" handler={Home}/>
  </Route>
);

docReady(function () {
  run(routes,
    function (Handler) {
      ReactDOM.render(<Handler />, document.getElementById('root'));
    });
});

//document.addEventListener('DOMContentLoaded', function () {
//  run(routes,
//    function (Handler) {
//      ReactDOM.render(<Handler />, document.getElementById('root'));
//    });
//});

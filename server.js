/* eslint no-console: 0 */
import fs from 'fs';
import path from 'path';
import webpack from  'webpack';
import config from './webpack.config.js';
import webpackMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';

import koa from  'koa';
import route from 'koa-route';
import koaStatic from  'koa-static';
import gzip from 'koa-gzip';
import bodyParser from 'koa-bodyparser';
import send from 'koa-send';
import $proxy from 'koa-http-proxy';
import nodeCommandParams from 'node-command-params';

const app = koa();
app.use(gzip());
app.use(bodyParser());

// runtime params
// proxy proxy backend server
const runtimeConfig = nodeCommandParams();
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // 静态文件
  // app.use(koaStatic('dist'));

  // mocks
  app.use(route.all('*', function* (path, next) {
    try {
      let filePath = path + '.' + this.req.method + '.json';

      fs.accessSync(__dirname + '/mocks' + filePath, fs.R_OK);
      yield send(this, filePath, { root: __dirname + '/mocks' });
    } catch (e) {
      yield next;
    }
  }));

  // Proxy api requests
  if (runtimeConfig.proxy) {
    app.use($proxy(runtimeConfig.proxy)); // ex: http://localhost:3100
  }

  // app.use(route.all('/hello', function* () {
  //   this.body = 'hello';
  // }));
} else {
  app.use(koaStatic('dist'));

  app.use(route.get('*', function* () {
    yield send(this, 'dist/index.html');
  }));
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }

  console.info('==>   Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

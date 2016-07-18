const path                  = require('path');
const express               = require('express');
const webpack               = require('webpack');
const webpackMiddleware     = require('webpack-dev-middleware');
const webpackHotMiddleware  = require('webpack-hot-middleware');
const config                = require('../../webpack');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = express();


if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    //historyApiFallback: true,
    publicPath: config.output.publicPath,
    contentBase: path.resolve(__dirname, '../../client/assets'),
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
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../../build/index.html')));
    res.end();
  });
} else {
  app.use(express.static(path.resolve(__dirname, '../../build')));
  app.get('*', function response(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../../build') });
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

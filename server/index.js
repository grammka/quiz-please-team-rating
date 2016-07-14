var path              = require('path');
var webpack           = require('webpack');
var WebpackDevServer  = require('webpack-dev-server');
var config            = require('../webpack');


new WebpackDevServer(webpack(config), {
  //hot: true,
  historyApiFallback: true,
  contentBase: path.resolve(__dirname, '../client/assets'),
  publicPath: config.output.publicPath
})
  .listen(3000, 'localhost', function (err) {
    if (err) {
      return console.log(err);
    }
  
    console.log('Listening at http://localhost:3000/');
  });

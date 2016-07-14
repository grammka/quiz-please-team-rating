var path      = require('path')
var webpack   = require('webpack')


var paths = {
  client: path.join(__dirname, '../client/index.js'),
  build: path.join(__dirname, '../build')
}

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    paths.client
  ],

  output: {
    path: paths.build,
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [ 'react-hot', 'babel' ],
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        loader: 'style!css?sourceMap&modules&localIdentName=[local]__[hash:base64:5]&importLoaders=1!stylus?url resolve'
      },
      {
        test: /\.css$/,
        loader: 'css?modules'
      },
      {
        test: /\.(ttf|eot|svg|woff2?)(\?.+)?$/,
        include: /fonts/,
        loader: 'file',
        query: {
          context: paths.build,
          name: 'assets/fonts/[1]',
          regExp: 'assets/fonts/(.*)'
        }
      }
    ]
  },

  resolve: {
    modulesDirectories: [ 'client', 'shared', 'node_modules' ],
    extensions: [ '', '.js', '.jsx', '.css', '.styl' ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  stylus: {
    use: [
      require('nib')()
    ],
    import: [
      '~nib/lib/nib/index.styl',
      '~assets/styl/_modules/index.styl'
    ]
  }
}

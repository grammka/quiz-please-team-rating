var path                  = require('path')
var webpack               = require('webpack')
var HtmlWebpackPlugin     = require('html-webpack-plugin')


var paths = {
  base: path.join(__dirname, '../'),
  client: path.join(__dirname, '../client/index.js'),
  build: path.join(__dirname, '../build')
}

const globals = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
}


module.exports = {
  devtool: 'eval',
  //devtool: 'cheap-module-source-map',

  entry: [
    paths.client
  ],

  output: {
    path: paths.build,
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [ 'react-hot', 'babel' ],
        exclude: /node_modules/
      },
      {
        test: /vanilla\.kinetic\.js$/,
        loader: 'imports?window=>{}!exports?window.VanillaKinetic',
        include: /vanilla\.kinetic/
      },
      {
        test: /\.styl$/,
        loader: 'style!css?sourceMap&modules&localIdentName=[local]__[hash:base64:5]&importLoaders=1!stylus?url resolve'
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules'
      },
      {
        test: /\.(png|ico|jpg|jpeg|gif)$/,
        loader: 'url',
        query: {
          name: 'assets/[ext]/[name].[hash:6].[ext]',
          limit: 8192
        }
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url',
        query: {
          name: 'assets/[ext]/[name].[hash:6].[ext]',
          limit: 10000,
          mimetype: 'image/svg+xml'
        }
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
    modulesDirectories: [ 'local_modules', 'client', 'shared', 'node_modules' ],
    extensions: [ '', '.js', '.jsx', '.css', '.styl' ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.base, 'client/assets/index.html'),
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(globals)
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

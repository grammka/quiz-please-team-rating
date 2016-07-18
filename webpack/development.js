export default (webpackConfig) => {
  webpackConfig.entry.app.push(
    'webpack-hot-middleware/client?path=/__webpack_hmr'
  )

  return webpackConfig
}

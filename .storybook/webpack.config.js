const path = require('path')

module.exports = {
  mode: 'development',
  resolve: {
    alias: {
      assets: path.resolve(__dirname, '../assets')
    },
    extensions: ['.js', '.jsx', '.css', '.scss', '.png', '.jpg', '.gif', '.jpeg', '.svg']
  },
  module: {
    rules: [   
      {
        test: /\.(css|scss|sass)$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader', 
        options: {
          noquotes: true
        }
      },
      {
        test: /\.(eot|woff|woff2)$/,
        loader: ['file-loader'],
      }
    ]
  }
}

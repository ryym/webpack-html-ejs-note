
// module.exports = {
//   entry: './index.js',

//   output: {
//     path: 'dist',
//     filename: '[name].js'
//   },

//   module: {
//     loaders: [

//       {
//         test: /\.html$/,
//         loaders: [
//           'file?name=[name].[ext]',
//           'val',
//           'html'
//         ],
//         exclude: /node_modules/
//       }

//     ]
//   }
// }

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './index.js',

  output: {
    path: 'dist',
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.html$/,
        loaders: [
          'html?interpolate&minimize',
          // 'val',
          // 'apply',
          // 'ejs-compiled'
        ],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [

    new HtmlWebpackPlugin({
      // template: 'ejs!val!html!index.html',
      template: 'ejs-compiled!extract!index.html',
    })

  ]

}

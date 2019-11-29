const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function (env, argv) {
  
  let common = {
    mode: argv.production ? 'production' : 'development',
    watch: true,
    devtool: argv.production ? '' : 'inline-source-map'
  };
  
  let jsConfigs = {
    ...common,
    entry: {
      'dynamic-settings': './src/js/dynamic-settings.js',
      'image-selector': './src/js/image-selector.js',
    },
    
    output: {
      path: path.resolve(__dirname, './includes/js/'),
      filename: '[name].js',
      chunkFilename: '[name].bundle.js',
      libraryTarget: 'this',
      publicPath: '/wp-content/plugins/ad-theme-settings/includes/js/',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-syntax-dynamic-import'
              ]
            }
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(path.resolve(__dirname, './js/'), {})
    ],
  
    externals: {
      jquery: 'jQuery'
    },
  };
  
  let sassConfig = {
    ...common,
    entry: {
      'admin': './src/sass/admin.scss'
    },
  
    output: {
      path: path.resolve(__dirname, './includes/css/'),
      filename: '[name].css',
      chunkFilename: '[name].bundle.css',
      libraryTarget: 'this',
      publicPath: '/wp-content/plugins/ad-theme-settings/includes/js/',
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {loader: MiniCssExtractPlugin.loader},
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new CleanWebpackPlugin(path.resolve(__dirname, './includes/css'), {})
    ]
  };
  
  
  return [jsConfigs, sassConfig]
};
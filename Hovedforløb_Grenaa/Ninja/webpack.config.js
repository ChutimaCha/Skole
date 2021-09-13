const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDevelopment = process.env.NODE_ENV === 'development'
//const LiveReloadPlugin = require('webpack-livereload-plugin');


module.exports = {
    mode: 'development',
    entry: [
        path.resolve('./src/app.js')
    ],
    watch: true,


    plugins: [
    
        new webpack.ProvidePlugin({
            PIXI: 'pixi.js'
        }),

        new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
        })

    ],

    entry: ["@babel/polyfill", "./src/app.js"],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/(node_modules)/,
                    path.resolve(__dirname, 'browser.js'),
                    path.resolve(__dirname, 'bootstrap.js')
                ],
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }

            },

            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
              },

              {
                test: /\.(jpg|png|svg)$/,
                  loader: 'url-loader'
              
              },
              

            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
              }

          
             
             
              
        ],

        
    },

    resolve: {
         extensions: ['.js', '.jsx', '.scss']
          },

    devtool: 'inline-source-map',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname + "/dist")

    }
};
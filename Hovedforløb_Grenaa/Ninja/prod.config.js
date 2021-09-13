const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    watch: true,


    plugins: [
        new webpack.ProvidePlugin({
            PIXI: 'pixi.js'
          }),
    
        new UglifyJsPlugin({

            uglifyOptions: {

                compress: {
                    drop_console: true
                },
                
                output: {
                    comments: false,
                    beautify: false

                }

            }


        }),
       
       /*
        new UnminifiedWebpackPlugin({
            postfix:''
        })
    */
   
    ],




    entry: ["@babel/polyfill", "./src/app.js"],
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: [/(node_modules)/, 
                        path.resolve(__dirname, 'browser.js'), 
                        path.resolve(__dirname, 'bootstrap.js')],
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


        ]
    },
    devtool: 'inline-source-map',
    output: {
        filename:   "bundle.js",
        path: path.resolve(__dirname + "/dist")
         
    }
};
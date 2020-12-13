const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const miniCss = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
       main: './js/index.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new miniCss({
            filename: '[name].[contenthash].css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        })
    ],
    module: {
        rules: [
            {
                test: /\.js/,
                use:[
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                          }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif|mp3)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    }
                }, {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 70
                        }
                    }         
                }],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
             {
                test:/\.(s*)css$/,
                use: [miniCss.loader,
                    "css-loader", 
                    "sass-loader", 
                ],
            },
        ]
    },
};
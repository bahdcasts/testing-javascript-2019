require('dotenv').config()
const path = require('path')
const glob = require('glob-all')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const MiniExtractCssPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-Za-z0-9-_:/]+/g) || []
    }
}

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: {
        index: [
            devMode && 'webpack-hot-middleware/client?reload=true',
            './client/index.js'
        ].filter(Boolean)
    },
    output: {
        path: path.resolve(__dirname, 'server/public/'),
        filename: 'app.js',
        publicPath: '/',
        chunkFilename: '[name].app.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniExtractCssPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        devMode && new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        !devMode &&
            new PurgecssPlugin({
                paths: glob.sync([
                    path.join(__dirname, 'client/**/*.vue'),
                    path.join(__dirname, 'client/**/*.css')
                ]),
                extractors: [
                    {
                        extractor: TailwindExtractor,
                        extensions: ['html', 'js', 'css', 'vue']
                    }
                ]
            }),
        new MiniExtractCssPlugin({
            filename: 'app.css'
        })
    ].filter(Boolean),
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({}),
            devMode && new webpack.HotModuleReplacementPlugin()
        ].filter(Boolean)
    }
}

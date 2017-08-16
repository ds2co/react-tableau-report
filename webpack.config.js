const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const srcDir = path.resolve(__dirname, 'src'),
    destDir = path.resolve(__dirname);

module.exports = {
    context: srcDir,
    entry: {
        "react-tableau-report": "./TableauReport.js",
        "react-tableau-report.min": "./TableauReport.js"
    },
    output: {
        path: destDir,
        filename: "[name].js",
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader"
                ]
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            test: /\.min\.js$/,
            minimize: true,
            extractComments: true
        })
    ],
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules')
        ]
    },
    externals: {
        "react": "commonjs react",
        "url": "commonjs url"
    }
}
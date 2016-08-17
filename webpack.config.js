'use strict';

const webpack          = require('webpack');
const path             = require('path');
const env              = process.env.NODE_ENV || 'dev';
const apiUrl           = process.env.API_URL;
const isDevEnvironment = env === 'dev';
const plugins          = [
    new webpack.DefinePlugin({
        'ENVIRONMENT': JSON.stringify(env),
        'API_URL'    : JSON.stringify({
            prod : apiUrl || '',
            stage: apiUrl || '',
            dev  : apiUrl || 'http://localhost:8081/'
        }[env])
    })
];

console.log('BUILD FOR ENVIRONMENT:', env);

!isDevEnvironment && plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
}));

module.exports = {
    entry    : {
        app: './src/js/index.js'
    },
    output   : {
        path      : path.resolve(__dirname, "dist"),
        publicPath: '/assets/',
        filename  : 'bundle.' + env + '.js'
    },
    devServer: {
        contentBase: __dirname
    },
    module   : {
        loaders: [
            {test: /\.css$/, loader: 'style!css?modules'},
            {test: /\.scss/, loader: 'style!css?modules!postcss-loader!sass'},
            {test: /\.html$/, loader: 'html'},
            {test: /\.json/, loader: 'json'},
            {
                test   : /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader : 'babel',
                query  : {
                    presets: ["react", "es2015", "babel-preset-stage-0"]
                }
            },
            {
                test  : /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
            },
            {
                test  : /\.(jpg|png|jpeg|gif|ico)$/,
                loader: 'url-loader?limit=1024&name=img/[name].[ext]'
            }
        ]
    },

    plugins: plugins,
    devtool: isDevEnvironment ? 'inline-source-map' : null,
    watch  : isDevEnvironment
};
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('./../config')
const { resolve } = require('./../utils')
const theme = require('./../../theme')
const { cacheLoader } = require('./loaders')

const cssLoader = modules => ({
    loader: 'css-loader',
    options: {
        modules: modules
            ? {
                  mode: 'local',
                  localIdentName: '[local]--[hash:base64:8]'
              }
            : false
    }
})

const sassLoader = {
    loader: 'sass-loader',
    options: {
        sassOptions: {
            includePaths: [require('bourbon').includePaths, resolve('src/styles')]
        }
    }
}

const lessLoader = {
    loader: 'less-loader',
    options: {
        javascriptEnabled: true,
        modifyVars: theme
    }
}

const baseLoaders = modules => [
    config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
    cacheLoader,
    cssLoader(modules),
    'postcss-loader'
]

module.exports = [
    {
        test: /\.css$/,
        include: [resolve('node_modules')],
        use: baseLoaders(false)
    },
    {
        test: /\.scss$/,
        include: [resolve('src')],
        use: [...baseLoaders(true), sassLoader]
    },
    {
        // for ant design
        test: /\.less$/,
        // less do not use threadLoader
        // https://github.com/webpack-contrib/thread-loader/issues/10
        use: [...baseLoaders(false), lessLoader]
    },
    {
        test: /\.js$/,
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/,
    },
    {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
    },
    {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
    },
    {
        test: /\.(scss|sass)$/,
        loaders: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'sass-loader',
        ],
    },
    {
        test: /\.styl$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "stylus-loader" // compiles Stylus to CSS
          }
        ]
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
    }
]

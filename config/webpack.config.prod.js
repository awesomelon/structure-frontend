const path = require('path'),
    HtmlWebPackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ImageminPlugin = require('imagemin-webpack-plugin').default,
    TerserPlugin = require('terser-webpack-plugin'),
    OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: ['./src/index.js'],
    output: {
        filename: 'static/bundle.[contenthash].js',
        path: path.resolve('build')
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /(node_modules|bower_components|node_modules\/(?!(dom7|ssr-window|swiper)\/).*)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        rootMode: 'upward'
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({
                                    browsers: ['> 1%', 'last 2 versions']
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'static/images'
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'webpack test',
            template: './public/index.html',
            favicon: './public/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: false
            },
            filename: 'index.html'
        }),

        new MiniCssExtractPlugin({
            filename: 'static/style.[contenthash].css'
        }),

        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            cache: true
        }),

        new CleanWebpackPlugin()
    ]
};

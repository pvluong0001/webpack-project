const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = [
    /** không phụ thuộc vào js file */
    {
        mode: 'development',
        // devtool: "source-map",
        context: __dirname,
        entry: {
            type1: './src/app.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.(scss|css)$/,
                    exclude: /node_modules/,
                    use: [
                        // fallback to style-loader in development
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                includePaths: ['./src/styles/app2.scss'],
                                sourceMap: true
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }), new HtmlWebpackPlugin({
                inject: 'body',
                template: './src/body.html',
                filename: 'type1.html'
            })
        ]
    },
    /** phụ thuộc vào js file */
    {
        mode: 'development',
        entry: {
            type2: './src/app.js'
        },
        output: {
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        "style-loader", // creates style nodes from JS strings
                        "css-loader", // translates CSS into CommonJS
                    ]
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: 'body',
                template: './src/body.html',
                filename: 'type2.html'
            }),
            new CleanWebpackPlugin()
        ]
    }
];
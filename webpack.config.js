let glob = require('glob');

module.exports = {
    mode: 'development',
    entry: {
        index: [...glob.sync('./src/*.js'), ...glob.sync('./src/*.ts')],
    },
    output: {
        // publicPath: './dist/',
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    }
};
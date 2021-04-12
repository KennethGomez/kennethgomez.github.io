const path = require('path');
const fs = require('fs');

const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const outputPath = path.resolve(__dirname, './dist');

if (fs.existsSync(outputPath)) {
    fs.rmdirSync(path.resolve(__dirname, './dist'), { recursive: true });
}

module.exports = (env, argv) => ({
    mode: 'development',
    devtool: 'source-map',
    context: path.resolve(__dirname, './src'),
    entry: {
        polyfill: './polyfill/polyfill.js',
        main: './index.ts',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()],
    },
    devServer: {
        contentBase: __dirname,
        compress: true,
        port: 8080,
        host: '0.0.0.0',
    },
    stats: {
        warnings: argv.mode === 'production',
    },
    plugins: [
        new ESLintPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'pages', 'index.html'),
            publicPath: argv.mode === 'production' ? 'dist' : 'auto',
            hash: true,
        }),
    ],
});

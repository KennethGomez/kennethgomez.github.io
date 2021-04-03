const path = require('path');

const ClosurePlugin = require('closure-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => ({
    mode: 'development',
    devtool: argv === 'production' ? 'source-map' : undefined,
    context: path.resolve(__dirname, './src'),
    entry: './index.ts',
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
        minimizer: argv.mode === 'production' ? [new ClosurePlugin({ mode: 'STANDARD' }, {
            rewritePolyfills: true,
            languageIn: 'ECMASCRIPT_NEXT',
            languageOut: 'ECMASCRIPT5_STRICT',
        })] : [],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        contentBase: __dirname,
        compress: true,
        port: 8080,
    },
    stats: {
        warnings: argv.mode === 'production',
    },
    plugins: [
        new ESLintPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'pages', 'index.html'),
            publicPath: argv.mode === 'production' ? 'dist' : 'auto',
        }),
    ],
});

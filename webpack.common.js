const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    entry: './src/script/script.js',
    plugins: [
        new FaviconsWebpackPlugin({
            logo: './src/favicon/sunny.png',
            favicons: {
                icons: {
                    android: false,
                    appleIcon: false,
                    appleStartup: false,
                    favicons: true,
                    windows: false,
                    yandex: false,    
                },       
            },
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ]
};
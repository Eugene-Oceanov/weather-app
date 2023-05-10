const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

    mode: "production",

    entry: {
        mainScript: path.resolve(__dirname, 'src/index.js'),
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        assetModuleFilename: "[name][ext]",
    },

    performance: {
        hints: false,
        maxAssetSize: 512000,
        maxEntrypointSize: 512000,
    },

    devServer: {
        port: 9000,
        compress: true,
        hot: true,
        static: {
            directory: path.join(__dirname, "dist"),
        }
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: "asset/resource",
            },
        ],
    },

    plugins: [
        new htmlWebpackPlugin({
            title: "Weather App",
            filename: "index.html",
            template: path.resolve(__dirname, "src/index.html")
        })
    ]
}
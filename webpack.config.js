const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { node } = require("webpack");

module.exports = {
    entry: {
        index: "./src/index.js",
    },
    target: "node",
    mode: "development",
    devtool: "inline-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            title: "My Restaurant",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
};
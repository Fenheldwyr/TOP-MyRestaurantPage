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
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                // type: "asset/resource",
                use: [
                    {
                        // loader: "url-loader",
                        // options: {
                        //     limit: 8192,
                        // },
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[ext]"
                        }
                    },
                ],
            },
        ],
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        //assetModuleFilename: "images/[name].[ext]",
        clean: true,
    },
};
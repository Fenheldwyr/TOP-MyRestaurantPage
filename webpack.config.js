const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { node } = require("webpack");

module.exports = {
    entry: {
        index: "./src/index.js",
    },
    target: "web",
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        static: "dist",

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.ejs",
            title: "Ignis' Good Eatin'",
            favicon: "./src/favicon/favicon.ico",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, "src"),
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                use: [
                    {
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
        clean: true,
    },
};
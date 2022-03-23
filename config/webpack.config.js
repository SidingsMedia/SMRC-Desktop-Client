const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const mainConfig = {
    target: "electron-main",
    entry: path.join(__dirname, "..", "app", "src", "main-process", "main.ts"),
    mode: process.env.NODE_ENV || "development",
    module: {
        rules: [
            {
                test: /\.(ts)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
        ],
    },
    resolve: {
        modules: [path.resolve(__dirname, "..", "app", "src"), "node_modules"],
        extensions: [".ts", ".js", ".json"],
    },
    output: {
        path: path.resolve(__dirname, "..", "out"),
        filename: "main.js",
    },
};
const renderConfig = {
    target: "web",
    entry: path.join(__dirname, "..", "app", "src", "render", "index.tsx"),
    mode: process.env.NODE_ENV || "development",
    resolve: {
        modules: [path.resolve(__dirname, "..", "app", "src"), "node_modules"],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "..", "out"),
        filename: "render.js",
    },
    devServer: {
        static: path.join(__dirname, "..", "app", "src", "render"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "..", "app", "static", "index.html"),
        }),
    ],
};
const preloadConfig = {
    target: "electron-preload",
    entry: path.join(__dirname, "..", "app", "src", "preload", "preload.ts"),
    mode: process.env.NODE_ENV || "development",
    resolve: {
        modules: [path.resolve(__dirname, "..", "app", "src"), "node_modules"],
        extensions: [".ts", ".js", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.(ts)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "..", "out"),
        filename: "preload.js",
    },
};

module.exports = [mainConfig, renderConfig, preloadConfig];

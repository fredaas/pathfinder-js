module.exports = {
    entry: {
        main: "./src/main.js",
    },
    output: {
        path: "./build",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    }
};

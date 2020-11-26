const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = {
    publicPath: "./",
    productionSourceMap: false,
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "stylus",
            patterns: [path.resolve(__dirname, "src/style/var.styl")]
        }
    },
    // 修改标签
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            args[0].title = "后台管理系统";
            return args;
        });
    },
    configureWebpack: {
        plugins: [
            // 打包gzip
            new CompressionWebpackPlugin({
                test: /\.(js|css|svg|woff|ttf|json|html)$/,
                threshold: 10240
            })
        ]
    },
    devServer: {
        proxy: {
            "/api": {
                target: "http://192.168.xxx.xxx:xxxx", // 测试环境
                ws: true,
                changeOrigin: true
            }
        }
    }
};

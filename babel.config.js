module.exports = {
    plugins: [
        "lodash",
        [
            "component",
            {
                libraryName: "element-plus",
                styleLibraryName: "theme-chalk"
            }
        ]
    ],
    presets: ["@vue/cli-plugin-babel/preset", ["@vue/babel-preset-jsx", { injectH: false }]]
};

module.exports = {
    plugins: [
        "lodash",
        [
            "component",
            {
                libraryName: "element-ui",
                styleLibraryName: "theme-chalk"
            }
        ]
    ],
    presets: ["@vue/cli-plugin-babel/preset", ["@vue/babel-preset-jsx", { injectH: false }]]
};

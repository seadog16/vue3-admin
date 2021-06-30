module.exports = {
    root: true,
    env: {
        "node": true,
        "commonjs": true,
        "browser": true,
        "es6": true
    },
    extends: ["plugin:vue/vue3-recommended", "prettier", "eslint:recommended"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
};

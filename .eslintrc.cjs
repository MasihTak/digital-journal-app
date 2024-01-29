/* eslint-env node */
module.exports = {
    root: true,
    'extends': [
        'plugin:vue/vue3-strongly-recommended',
        'eslint:recommended'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        "vue/first-attribute-linebreak": "off",
    }
}

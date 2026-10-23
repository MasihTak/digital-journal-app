import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'

export default [
    {ignores: ['dist/**']},
    js.configs.recommended,
    ...pluginVue.configs['flat/strongly-recommended'],
    {
        languageOptions: {
            globals: {...globals.browser, ...globals.node}
        },
        rules: {
            'vue/first-attribute-linebreak': 'off',
        }
    },
    {
        // Variables used only by the template look unused to this rule.
        files: ['**/*.vue'],
        rules: {'no-useless-assignment': 'off'}
    }
]

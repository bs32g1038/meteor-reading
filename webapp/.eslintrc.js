module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', '@vue/standard'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'generator-star-spacing': 'off',
        'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
        'no-undef': 'off',
        indent: ['error', 4],
        semi: [2, 'always'],
        'space-before-function-paren': 'off',
        quotes: [1, 'single'],
        'comma-dangle': 0
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
};

const { addWebpackAlias, override } = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        ['@ui']: path.resolve(__dirname, './src/ui'),
        ['@features']: path.resolve(__dirname, './src/features'),
        ['@core']: path.resolve(__dirname, './src/core'),
        ['@constants']: path.resolve(__dirname, './src/constants'),
        ['@pages']: path.resolve(__dirname, './src/pages'),
    }),
);

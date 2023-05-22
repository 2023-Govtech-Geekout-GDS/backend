module.exports = {
    parserOptions: {
        ecmaVersion: "latest", // Allows the use of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
    },
    extends: "eslint:recommended",
    env: {
        node: true, // Enable Node.js global variables
    },
    rules: {
        'no-console': 'off',
        'import/prefer-default-export': 'off',
    },
};
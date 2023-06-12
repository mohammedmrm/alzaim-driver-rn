module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	settings: {
		react: {
			createClass: 'createReactClass',
			pragma: 'React',
			fragment: 'Fragment',
			version: 'detect',
			flowVersion: '0.53',
		},
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'windows'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'react/prop-types': 'off',
		'no-mixed-spaces-and-tabs': 'off',
	},
	globals: {
		__DEV__: true,
		module: true,
		require: true,
		Alert: true,
		window: true,
	},
};

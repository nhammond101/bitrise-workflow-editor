module.exports = {
	extends: ["prettier"],
	parser: "@typescript-eslint/parser",
	root: true,
	env: {
		browser: true,
		node: true,
		jasmine: true
	},
	plugins: ["@typescript-eslint", "jasmine"],
	globals: {
		cy: false,
		Cypress: false,
		angular: false,
		_: false,
		inject: false
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended"
	],
	rules: {
		"max-len": ["error", { code: 120, tabWidth: 2 }],
		quotes: [2, "double"],
		"@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true }],
		"@typescript-eslint/no-explicit-any": ["warn", { ignoreRestArgs: true }],
		"@typescript-eslint/no-non-null-assertion": "off"
	}
};
module.exports = {
	root: true,
	extends: '@react-native-community',
	rules: {
		'prettier/prettier': 0,
		indent: [
			'error', 'tab',
			{
				'MemberExpression': 0,
				'SwitchCase': 1,
			},
		],
		curly: ['error', 'multi-line'],
		'max-len': [
			'warn',
			{
				'code': 88, //in webstorm it works incorrectly
				'comments': 92,
			}],
		'no-multiple-empty-lines': 0,
		'no-extra-semi': 'off',
		'jsx-quotes': ['warn', 'prefer-single'],
		'react-native/no-inline-styles': 0,
		'react-hooks/exhaustive-deps': 0, //1
		'no-mixed-spaces-and-tabs': 0,
	},
};

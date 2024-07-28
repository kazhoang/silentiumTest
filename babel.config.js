/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./src/'],
				extensions: ['.js', '.json', '.tsx'],
				alias: {
					'@': './src',
				},
			},
		],
		'inline-dotenv',
		'react-native-reanimated/plugin',
	],
};

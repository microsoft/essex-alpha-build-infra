/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/* eslint-disable @typescript-eslint/no-var-requires */
import { join } from 'path'
import { getEsmConfiguration } from '@essex/babel-config'
import { getNodeModulesPaths } from '@essex/build-util-hoister'
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

function getMdxBabelConfiguration() {
	const config = getEsmConfiguration('development')
	const plugins = [
		...(config.plugins || []),
		require.resolve('@babel/plugin-transform-react-jsx'),
	]
	return {
		...config,
		plugins,
	}
}

const nodeModulesPaths = getNodeModulesPaths()

module.exports = {
	stories: [
		join(process.cwd(), 'src/index.ts'),
		join(process.cwd(), '**/*.stories.(ts|tsx|js|jsx|mdx)'),
		join(process.cwd(), '**/*_stories.(ts|tsx|js|jsx|mdx)'),
	],
	addons: [
		require.resolve('@storybook/addon-actions/register'),
		require.resolve('@storybook/addon-links/register'),
		require.resolve('@storybook/addon-knobs/register'),
		require.resolve('@storybook/addon-a11y/register'),
		require.resolve('@storybook/addon-docs/register'),
	],
	webpackFinal: async (config: any) => {
		config.resolve.extensions.push('.ts', '.tsx')
		config.resolve.modules.push(...nodeModulesPaths)
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [
				{ loader: require.resolve('cache-loader') },
				{
					loader: require.resolve('babel-loader'),
					options: getEsmConfiguration('development'),
				},
				{
					loader: require.resolve('ts-loader'),
					options: {
						configFile: join(process.cwd(), 'tsconfig.json'),
						transpileOnly: true,
					},
				},
				{
					loader: require.resolve('react-docgen-typescript-loader'),
				},
			],
		})
		config.module.rules.push({
			test: /\.(stories|story)\.mdx$/,
			use: [
				{
					loader: require.resolve('babel-loader'),
					options: getMdxBabelConfiguration(),
				},
				{
					loader: require.resolve('@mdx-js/loader'),
					options: {
						compilers: [createCompiler({})],
					},
				},
			],
		})
		config.module.rules.push({
			test: /(\.|_)(stories|story)\.[tj]sx?$/,
			loader: require.resolve('@storybook/source-loader'),
			exclude: [/node_modules/],
			enforce: 'pre',
		})
		config.plugins.push(new ForkTsCheckerWebpackPlugin())
		return config
	},
}

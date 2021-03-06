/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @essex/adjacent-await */
import { gulpify, wrapPromiseTask } from '@essex/build-utils'
import { ESLint } from 'eslint'
import { getConfigFile, getIgnorePath } from './config'

export async function eslint(
	fix: boolean,
	strict: boolean,
	files: string[] = ['.'],
): Promise<void> {
	try {
		const configFile = getConfigFile(strict)
		const ignorePath = getIgnorePath()

		const linter = new ESLint({
			fix,
			overrideConfigFile: configFile,
			resolvePluginsRelativeTo: require
				.resolve('@essex/eslint-plugin')
				.replace('lib/index.js', ''),
			extensions: ['js', 'jsx', 'ts', 'tsx'],
			ignorePath,
		})

		const results = await linter.lintFiles(files)
		await ESLint.outputFixes(results)
		const formatter = await linter.loadFormatter('stylish')
		const resultText = formatter.format(results)
		console.log(resultText)

		const sum = (a: number, b: number) => a + b
		const errorCount = results.map(r => r.errorCount).reduce(sum, 0)
		const warningCount = results.map(r => r.warningCount).reduce(sum, 0)
		if (errorCount > 0) {
			return Promise.reject('eslint failed')
		}
		if (strict && warningCount > 0) {
			return Promise.reject('eslint failed')
		}
	} catch (err) {
		console.log('error running eslint', err)
		return Promise.reject(err)
	}
}

export const eslintGulp = gulpify(wrapPromiseTask('eslint', false, eslint))

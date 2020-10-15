/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Command } from 'commander'
import { configureTasks } from './tasks'
import { LintCommandOptions } from './types'
import { execGulpTask } from '@essex/build-utils'
import { success, fail } from '@essex/tasklogger'

export default function lint(program: Command): void {
	program
		.command('lint [...files]')
		.description('performs static analysis checks')
		.option('-f, --fix', 'correct fixable problems')
		.option('--docs', 'performs documentation linting steps')
		.option('--docs-only', 'skip code linting, only check documentation')
		.option('--staged', 'only do git-stage verifications')
		.option('--strict', 'strict linting, warnings will cause failure')
		.action((files: string[], options: LintCommandOptions = {}) => {
			return Promise.resolve()
				.then(() => configureTasks(options, files))
				.then(lint => execGulpTask(lint))
				.then(() => success('lint'))
				.catch(err => {
					console.log('error in lint', err)
					process.exitCode = 1
					fail('lint')
				})
		})
}

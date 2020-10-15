/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Command } from 'commander'
import { checkCommitMessage } from '@essex/build-step-commitlint'
import { success, fail } from '@essex/tasklogger'

export default function commitMsg(program: Command): void {
	program
		.command('commit-msg')
		.description('commit message verification (for husky hook)')
		.action(() => {
			return Promise.resolve()
				.then(() => checkCommitMessage())
				.then(() => success('commit-msg'))
				.catch(err => {
					console.log('error in commit-msg', err)
					process.exitCode = 1
					fail('commit-msg')
				})
		})
}

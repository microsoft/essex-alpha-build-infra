/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { performance } from 'perf_hooks'
import { clean as cleanTask } from '@essex/build-step-clean'
import { success, fail, printPerf } from '@essex/tasklogger'
import { Command } from 'commander'

export default function clean(program: Command): void {
	program
		.command('clean [files...]')
		.description('cleans up build artifact directories')
		.action((files: string[]) => {
			if (files.length === 0) {
				files = ['lib', 'dist']
			}
			return Promise.resolve()
				.then(() => cleanTask(files))
				.then(() => success(`clean ${printPerf(0, performance.now())}`))
				.catch(err => {
					console.log('error in clean', err)
					fail(`clean ${printPerf(0, performance.now())}`)
					process.exitCode = 1
				})
		})
}

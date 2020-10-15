/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Command } from 'commander'
import { prettyQuick } from '@essex/build-step-pretty-quick'
import { success, fail } from '@essex/tasklogger'

interface PrettifyCommandOptions {
	verbose?: boolean
	staged?: boolean
}

/**
 * Runs the prettier tool to format client source code
 * @param program The CLI program
 */
export default function prettify(program: Command): void {
	program
		.command('prettify')
		.option('-v, --verbose', 'verbose output')
		.option('--staged', 'run on staged files')
		.action(({ staged, verbose }: PrettifyCommandOptions) => {
			return prettyQuick({
				staged,
				verbose,
			})
				.then(() => success('prettify'))
				.catch(err => {
					console.log('error in prettify', err)
					process.exitCode = 1
					fail('s')
				})
		})
}

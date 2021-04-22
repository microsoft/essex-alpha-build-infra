/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import gulp from 'gulp'
import { LintCommandOptions } from './types'
import { docs as execDocs } from '@essex/build-step-docs'
import { eslint } from '@essex/build-step-eslint'
import { prettyQuick } from '@essex/build-step-pretty-quick'
import { resolveGulpTask, noopTask } from '@essex/build-utils'

export function configureTasks(
	{
		fix = false,
		staged = false,
		docs = false,
		strict = false,
		docsOnly = false,
	}: LintCommandOptions,
	files: string[] | undefined,
): gulp.TaskFunction {
	function checkCode(cb: (err?: Error) => void) {
		eslint(fix, strict, files || ['.']).then(...resolveGulpTask('eslint', cb))
	}

	function checkFormatting(cb: (err?: Error) => void) {
		const task = staged
			? prettyQuick({ staged: true })
			: prettyQuick({ check: !fix })
		task.then(...resolveGulpTask('pretty-quick', cb))
	}

	function checkDocumentation(cb: (err?: Error) => void) {
		execDocs().then(...resolveGulpTask('docs', cb))
	}

	if (docsOnly) {
		return gulp.series(checkDocumentation)
	} else {
		return gulp.parallel(
			checkCode,
			checkFormatting,
			docs ? checkDocumentation : noopTask,
		)
	}
}

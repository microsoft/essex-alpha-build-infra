/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { jestGulp } from '@essex/build-step-jest'
import gulp from 'gulp'
import { TestCommandOptions } from './types'

export function configureTasks(config: TestCommandOptions): gulp.TaskFunction {
	return jestGulp(config)
}

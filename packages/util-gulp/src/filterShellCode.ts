/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { JobResult } from '@essex/shellrunner'

/**
 * A function to be used in .then() chains to convert non-zero exit codes
 * from shellrunner into job failures
 */
export function filterShellCode({ code }: JobResult): void {
	if (code !== 0) {
		throw new Error('non-zero exit code')
	}
}

import { parseJsonConfigFileContent, readConfigFile, ScriptTarget, sys } from 'typescript'
import type { ParsedCommandLine } from 'typescript'
import { parse, resolve } from 'path'
import { existsSync } from 'fs'

export interface ParseTsConfigOptions {
	/**
	 * The TypeScript configuration file path.
	 *
	 * @default './tsconfig.json'
	 */
	filepath?: string
}

export interface GetTSConfigCompilerTargetOptions extends ParseTsConfigOptions {
	/**
	 * The already parsed TS config.
	 *
	 */
	parsedTsConfig?: ParsedCommandLine
}

/**
 * Parse TypeScript configuration file.
 *
 * @param options An object defining required parameters. See {@link ParseTsConfigOptions} for more info.
 *
 * @returns The parsed TypeScript configuration file.
 *
 * @throws {Error} if the resolved `filepath` does not exists.
 */
export const parseTsConfig = (options: ParseTsConfigOptions = {}): ParsedCommandLine => {
	const { filepath = resolve(process.cwd(), 'tsconfig.json') } = options

	if (!existsSync(filepath)) {
		throw new Error('No configuration file found.', {
			cause: { filepath },
		})
	}

	const basePath = parse(filepath).dir
	const configFile = readConfigFile(filepath, path => sys.readFile(path))

	return parseJsonConfigFileContent(configFile.config, sys, basePath)
}

/**
 * Get TypeScript compiler target from resolved configuration file.
 *
 * @param options An object defining required parameters. See {@link GetTSConfigCompilerTargetOptions} for more info.
 *
 * @returns The resolved TypeScript compiler target if any, `undefined` otherwise.
 */
export const getTSConfigCompilerTarget = (
	options: GetTSConfigCompilerTargetOptions = {},
): string | undefined => {
	try {
		const { parsedTsConfig } = options
		const parsed = parsedTsConfig || parseTsConfig(options)
		const target = parsed.options.target

		if (!target) return

		if (target === ScriptTarget.Latest) {
			return 'esnext'
		}

		return ScriptTarget[target]?.toLowerCase()
	} catch (error) {
		console.error(error)
	}
}

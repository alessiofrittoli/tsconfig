import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getTSConfigCompilerTarget, parseTsConfig } from '@/index'
import { mkdtempSync, rmSync, writeFileSync } from 'fs'
import { ScriptTarget } from 'typescript'
import { join } from 'path'
import { tmpdir } from 'os'

describe('TypeScript configuration utilities', () => {
	let tempDir: string, tsconfig1: string, tsconfig2: string

	beforeEach(() => {
		tempDir = mkdtempSync(join(tmpdir(), 'package-configs-'))
		tsconfig1 = join(tempDir, 'tsconfig.build.json')
		tsconfig2 = join(tempDir, 'tsconfig.json')

		writeFileSync(
			tsconfig1,
			JSON.stringify({
				compilerOptions: {
					target: 'ES2022',
				},
			}),
		)

		writeFileSync(
			tsconfig2,
			JSON.stringify({
				extends: ['./tsconfig.build.json'],
			}),
		)
	})

	afterEach(() => {
		rmSync(tempDir, { recursive: true, force: true })
	})

	describe('parseTsConfig', () => {
		it('parses a valid tsconfig file', () => {
			const parsed = parseTsConfig({ filepath: tsconfig2 })

			expect(parsed.options.target).toBe(ScriptTarget.ES2022)
		})

		it('throws when given tsconfig file does not exist', () => {
			const filepath = join(tmpdir(), 'package-configs-missing-tsconfig.json')

			try {
				parseTsConfig({ filepath })
			} catch (error) {
				expect(error).toBeInstanceOf(Error)

				const thrownError = error as Error & { cause?: { filepath?: string } }

				expect(thrownError.message).toBe('No configuration file found.')
				expect(thrownError.cause?.filepath).toBe(filepath)

				return
			}

			expect.unreachable('Expected parseTsConfig to throw for missing file.')
		})
	})

	describe('getTSConfigCompilerTarget', () => {
		it('returns the resolved compiler target', () => {
			// expectation 1
			expect(getTSConfigCompilerTarget({ filepath: tsconfig2 })).toBe('es2022')

			// expectation 2
			writeFileSync(
				tsconfig1,
				JSON.stringify({
					compilerOptions: {
						target: 'ESNext',
					},
				}),
			)

			expect(getTSConfigCompilerTarget({ filepath: tsconfig1 })).toBe('esnext')
		})

		it('returns `undefined` when no target is configured', () => {
			writeFileSync(
				tsconfig1,
				JSON.stringify({
					compilerOptions: {},
				}),
			)

			expect(getTSConfigCompilerTarget({ filepath: tsconfig1 })).toBeUndefined()
		})

		it('logs and returns `undefined` when the config file is missing', () => {
			const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)

			const filepath = join(tmpdir(), 'package-configs-missing-tsconfig.json')

			expect(getTSConfigCompilerTarget({ filepath })).toBeUndefined()

			expect(consoleErrorSpy).toHaveBeenCalledTimes(1)

			consoleErrorSpy.mockRestore()
		})

		it('uses a previously parsed tsconfig to avoid useless additional parsing', () => {
			// expectation 1
			expect(
				getTSConfigCompilerTarget({ parsedTsConfig: parseTsConfig({ filepath: tsconfig2 }) }),
			).toBe('es2022')
		})
	})
})

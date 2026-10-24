<h1 align="center">TSConfig ʦ</h1>
<h2 align="center">
  TSConfig utilities
</h2>
<p align="center">
  <a href="https://npmjs.org/package/@alessiofrittoli/tsconfig">
    <img src="https://img.shields.io/npm/v/@alessiofrittoli/tsconfig" alt="Latest version"/>
  </a>
  <a href="https://coveralls.io/github/alessiofrittoli/tsconfig">
    <img src="https://coveralls.io/repos/github/alessiofrittoli/tsconfig/badge.svg" alt="Test coverage"/>
  </a>
  <a href="https://socket.dev/npm/package/@alessiofrittoli/tsconfig/overview">
    <img src="https://socket.dev/api/badge/npm/package/@alessiofrittoli/tsconfig" alt="Socket Security score"/>
  </a>
  <a href="https://npmjs.org/package/@alessiofrittoli/tsconfig">
    <img src="https://img.shields.io/npm/dm/@alessiofrittoli/tsconfig.svg" alt="npm downloads"/>
  </a>
  <a href="https://bundlephobia.com/package/@alessiofrittoli/tsconfig">
    <img src="https://badgen.net/bundlephobia/dependency-count/@alessiofrittoli/tsconfig" alt="Dependencies"/>
  </a>
  <a href="https://libraries.io/npm/%40alessiofrittoli%2Ftsconfig">
    <img src="https://img.shields.io/librariesio/release/npm/@alessiofrittoli/tsconfig" alt="Dependencies status"/>
  </a>
</p>
<p align="center">
  <a href="https://bundlephobia.com/package/@alessiofrittoli/tsconfig">
    <img src="https://badgen.net/bundlephobia/min/@alessiofrittoli/tsconfig" alt="minified"/>
  </a>
  <a href="https://bundlephobia.com/package/@alessiofrittoli/tsconfig">
    <img src="https://badgen.net/bundlephobia/minzip/@alessiofrittoli/tsconfig" alt="minizipped"/>
  </a>
  <a href="https://bundlephobia.com/package/@alessiofrittoli/tsconfig">
    <img src="https://badgen.net/bundlephobia/tree-shaking/@alessiofrittoli/tsconfig" alt="Tree shakable"/>
  </a>
</p>
<p align="center">
  <a href="https://github.com/sponsors/alessiofrittoli">
    <img src="https://img.shields.io/static/v1?label=Fund%20this%20package&message=%E2%9D%A4&logo=GitHub&color=%23DB61A2" alt="Fund this package"/>
  </a>
  <a href="https://github.com/sponsors/alessiofrittoli">
    <img src="https://img.shields.io/github/sponsors/alessiofrittoli?label=Sponsor&logo=GitHub" alt="Currently sponsoring this project"/>
  </a>
</p>

[sponsor-badge]: https://img.shields.io/static/v1?label=Fund%20this%20package&message=%E2%9D%A4&logo=GitHub&color=%23DB61A2
[sponsor-url]: https://github.com/sponsors/alessiofrittoli

### Table of Contents

- [Getting started](#getting-started)
- [Development](#development)
  - [Local development](#local-development)
  - [Production build](#production-build)
  - [Unit tests](#unit-tests)
    - [Run tests with coverage](#run-tests-with-coverage)
  - [Contributing](#contributing)
  - [Security](#security)
- [API Reference](#api-reference)
- [Credits](#made-with-)

---

### Getting started

Run the following command to start using `@alessiofrittoli/tsconfig` in your projects:

```bash
npm i @alessiofrittoli/tsconfig
```

or using `pnpm`

```bash
pnpm i @alessiofrittoli/tsconfig
```

---

### Development

Run the following to start development

```shell
nvm use

pnpm i
```

#### Local development

Run the following

```shell
pnpm dev
```

This will generate unminified output code, sourcemaps and will enable source file watcher.

---

#### Production build

Run the following to create a local production build

```shell
pnpm build
```

This will generate minified output code without sourcemaps.

---

#### Unit tests

Run all the defined test suites by running the following:

```shell
# Run tests and watch file changes.
pnpm test:watch

# Run tests in a CI environment.
pnpm test:ci
```

---

##### Run tests with coverage

An HTTP server is then started to serve coverage files from `./coverage` folder.

⚠️ You may see a blank page the first time you run this command. Simply refresh the browser to see the updates.

```shell
pnpm test:coverage:serve
```

---

#### Contributing

Contributions are truly welcome!

Please refer to the [Contributing Doc](./CONTRIBUTING.md) for more information on how to start contributing to this project.

Help keep this project up to date with [GitHub Sponsor][sponsor-url].

[![GitHub Sponsor][sponsor-badge]][sponsor-url]

---

#### Security

If you believe you have found a security vulnerability, we encourage you to **_responsibly disclose this and NOT open a public issue_**. We will investigate all legitimate reports. Email `security@alessiofrittoli.it` to disclose any security vulnerabilities.

---

### API Reference

#### `parseTsConfig()`

Parse TypeScript configuration file.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter          | Type                   | Default             | Description                                        |
| ------------------ | ---------------------- | ------------------- | -------------------------------------------------- |
| `options`          | `ParseTsConfigOptions` | `{}`                | (Optional) An object defining required parameters. |
| `options.filepath` | `string`               | `"./tsconfig.json"` | (Optional) The TypeScript configuration file path. |

</details>

---

<details>

<summary style="cursor:pointer">Throws</summary>

Throws an `Error` if the resolved `filepath` does not exists.

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `ParsedCommandLine`

The parsed TypeScript configuration file.

</details>

---

<details>

<summary style="cursor:pointer">Examples</summary>

```ts
import { parseTsConfig } from '@alessiofrittoli/tsconfig'

const parsedTsConfig = parseTsConfig({ filepath: './tsconfig.build.json' })
```

</details>

---

#### `getTSConfigCompilerTarget()`

Get TypeScript compiler target from resolved configuration file.

<details>

<summary style="cursor:pointer">Parameters</summary>

| Parameter                | Type                   | Default             | Description                                        |
| ------------------------ | ---------------------- | ------------------- | -------------------------------------------------- |
| `options`                | `ParseTsConfigOptions` | `{}`                | (Optional) An object defining required parameters. |
| `options.filepath`       | `string`               | `"./tsconfig.json"` | (Optional) The TypeScript configuration file path. |
| `options.parsedTsConfig` | `ParsedCommandLine`    | -                   | (Optional) The already parsed TS config.           |

</details>

---

<details>

<summary style="cursor:pointer">Returns</summary>

Type: `string | undefined`

The resolved TypeScript compiler target if any, `undefined` otherwise.

</details>

---

<details>

<summary style="cursor:pointer">Examples</summary>

```ts
import { getTSConfigCompilerTarget } from '@alessiofrittoli/tsconfig'

const compilerTarget = getTSConfigCompilerTarget({
  filepath: './tsconfig.build.json',
})
```

</details>

---

### Made with ☕

<table style='display:flex;gap:20px;'>
  <tbody>
    <tr>
      <td>
        <img alt="avatar" src='https://avatars.githubusercontent.com/u/35973186' style='width:60px;border-radius:50%;object-fit:contain;'>
      </td>
      <td>
        <table style='display:flex;gap:2px;flex-direction:column;'>
          <tbody>
              <tr>
                <td>
                  <a href='https://github.com/alessiofrittoli' target='_blank' rel='noopener'>Alessio Frittoli</a>
                </td>
              </tr>
              <tr>
                <td>
                  <small>
                    <a href='https://alessiofrittoli.it' target='_blank' rel='noopener'>https://alessiofrittoli.it</a> |
                    <a href='mailto:info@alessiofrittoli.it' target='_blank' rel='noopener'>info@alessiofrittoli.it</a>
                  </small>
                </td>
              </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>

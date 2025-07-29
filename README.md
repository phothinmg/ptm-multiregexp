# Multi RegExp

![NPM Version][npm-version] [![JSR][jsr-bg]][jsr-package] [![codecov][coverage]][coverage-url] [![GitHub Actions Workflow Status][npm-publish]][npm-publish-wf] [![GitHub Actions Workflow Status][jsr-publish]][jsr-publish-wf] [![GitHub Actions WorkflowStatus][codeql]][codeql-url]

## About

Use multiple RegExp like you had only one ! Iterate on matches or find the first match.

> [!NOTE]
> This is extends from [multiregexp][multiregexp]

## Install and Use

### Install from npm

```bash
npm i ptm-multiregexp
```

```bash
pnpm i ptm-multiregexp
```

```bash
yarn add ptm-multiregexp
```

_Import_

```ts
import MultiRegExp from "ptm-multiregexp"; //esm
import MultiRegExp = require("ptm-multiregexp"); // typescript cjs
```

```js
const MultiRegExp = require("ptm-multiregexp"); // cjs
```

### Install from jsr

#### deno

```bash
deno add jsr:@ptm/multiregexp
```

_Import symbol_

```ts
import * as multiregexp from "@ptm/multiregexp";
```

_Import directly with a jsr specifier_

```ts
import * as multiregexp from "jsr:@ptm/multiregexp";
```

#### npm

```bash
npx jsr add @ptm/multiregexp
```

_Import symbol_

```ts
import * as multiregexp from "@ptm/multiregexp";
```

#### yarn

```bash
yarn add jsr:@ptm/multiregexp
```

Using Yarn 4.8 or older

```bash
yarn dlx jsr add @ptm/multiregexp
```

_Import symbol_

```ts
import * as multiregexp from "@ptm/multiregexp";
```

#### pnpm

```bash
pnpm i jsr:@ptm/multiregexp
```

Using pnpm 10.8 or older

```bash
pnpm dlx jsr add @ptm/multiregexp
```

_Import symbol_

```ts
import * as multiregexp from "@ptm/multiregexp";
```

## Example

```ts
const regexp = /(#{1,6})[ ]+(.*)/g;
const string = "## Hello World";

const multiregexp = new MultiRegExp([regexp]);
const result = multiregexp.getMatched(string);

/*
match: "## Hello World",
start: 0,
end: 14,
groupCount: 2,
group_1: "##",
group_2: "Hello World",
*/
```

## API

[API docs][api]

## LICENSE

[Apache-2.0][license]

<!-- Definition -->

[license]: LICENSE
[multiregexp]: https://github.com/christophehurpeau/multiregexp
[coverage]: https://codecov.io/github/phothinmg/ptm-multiregexp/graph/badge.svg?token=GP8s1Nsxw0
[coverage-url]: https://codecov.io/github/phothinmg/ptm-multiregexp
[npm-publish]: https://img.shields.io/github/actions/workflow/status/phothinmg/ptm-multiregexp/npm-publish.yml?style=flat&logo=npm&logoColor=%23CC3534&label=publish%20to%20npm
[npm-publish-wf]: https://github.com/phothinmg/ptm-multiregexp/blob/main/.github/workflows/npm-publish.yml
[api]: https://phothinmg.github.io/ptm-multiregexp/
[codeql]: https://img.shields.io/github/actions/workflow/status/phothinmg/ptm-multiregexp/codeql.yml?style=flat&logo=github&label=Codeql
[codeql-url]: https://github.com/phothinmg/ptm-multiregexp/blob/main/.github/workflows/codeql.yml
[npm-version]: https://img.shields.io/npm/v/ptm-multiregexp
[jsr-bg]: https://jsr.io/badges/@ptm/multiregexp
[jsr-package]: https://jsr.io/@ptm/multiregexp
[jsr-publish]: https://img.shields.io/github/actions/workflow/status/phothinmg/ptm-multiregexp/publish.yml?logo=jsr&label=publish%20to%20jsr
[jsr-publish-wf]: https://github.com/phothinmg/ptm-multiregexp/blob/main/.github/workflows/publish.yml

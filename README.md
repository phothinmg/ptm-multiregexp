# Multi RegExp

[![codecov][coverage]][coverage-url]

## About

This is extends from [multiregexp][multiregexp] . Use multiple RegExp like you had only one ! Iterate on matches or find the first match.

## Install and Use

### Node Js

```bash
npm i ptm-multiregexp
```

```bash
pnpm i ptm-multiregexp
```

```bash
yarn add ptm-multiregexp
```

#### Example

```ts
import MultiRegExp from "ptm-multiregexp";//esm
import MultiRegExp = require("ptm-multiregexp");//cjs

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



<!-- Definition -->

[multiregexp]: https://github.com/christophehurpeau/multiregexp
[coverage]: https://codecov.io/github/phothinmg/ptm-multiregexp/graph/badge.svg?token=GP8s1Nsxw0
[coverage-url]: https://codecov.io/github/phothinmg/ptm-multiregexp

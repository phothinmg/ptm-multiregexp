# multiregexp

[![coverage][coverage]][coverage-url]

## About

This is extends from [multiregexp][multiregexp] . Use multiple RegExp like you had only one ! Iterate on matches or find the first match.

## Install

```bash
npm i @lwe8/multiregexp
```

```bash
pnpm i @lwe8/multiregexp
```

```bash
yarn add @lwe8/multiregexp
```

## Quick example

```js
import MultiRegExp from "@lwe8/multiregexp"; // or var MultiRegExp = require('multiregexp');
const multiRegExp = new MultiRegExp([/hi/gi, /hello/gi]);

let firstMatch = multiRegExp.firstMatch("Hi ! Hello !");
console.log(firstMatch.toString());
// match= "Hi", start= 0, groupCount= 0

let firstMatch = multiRegExp.firstMatch("Oh hello ! Hi !");
console.log(firstMatch.toString());
// match= "hello", start= 3, groupCount= 0

for (let match of multiRegExp.allMatches("Oh hello ! Hi !")) {
  console.log(match.toString());
  // match= "hello", start= 3, groupCount= 0
  // match= "Hi", start= 11, groupCount= 0
}
```

<!-- Definition -->

[multiregexp]: https://github.com/christophehurpeau/multiregexp
[coverage]: https://img.shields.io/badge/coverage-96.97-brightgreen?style=flat
[coverage-url]: https://lwe8.github.io/multiregexp/lcoview/index.html

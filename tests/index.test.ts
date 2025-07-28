import path from "node:path";
import { describe, it, snapshot } from "node:test";
import MultiRegExp from "../src/index.js";

// snapshot dir path
snapshot.setResolveSnapshotPath((testPath) => {
  const _dir = path.dirname(testPath as string);
  const _baseName = path.basename(testPath as string);
  return path.join(_dir, "__snapshots__", `${_baseName}.snapshot`);
});

describe("Single RegExp", () => {
  const regexp = /hello/;
  const multiRegExp = new MultiRegExp([regexp]);
  const string = "hello world";
  const firstMatch = multiRegExp.firstMatch(string);
  const nullMatch = multiRegExp.firstMatch("");
  it("firstMatch", (t) => {
    t.assert.equal(firstMatch?.input, string);
    t.assert.equal(firstMatch?.match, "hello");
    t.assert.equal(firstMatch?.start, 0);
    t.assert.equal(firstMatch?.end, 5);
    t.assert.equal(firstMatch?.group(0), "hello");
    t.assert.equal(firstMatch?.[0], "hello");
    t.assert.equal(nullMatch, null);
    t.assert.snapshot({ regexp, string });
  });
  it("allMatches", (t) => {
    const _regexp = /hi/g;
    const _multiRegExp = new MultiRegExp([_regexp]);
    const _string = "hihi";
    const iterator = _multiRegExp.allMatches(_string);
    const _firstMatch = iterator.next();
    t.assert.equal(_firstMatch?.input, _string);
    t.assert.equal(_firstMatch?.match, "hi");
    t.assert.equal(_firstMatch?.start, 0);
    t.assert.equal(_firstMatch?.end, 2);
    t.assert.equal(_firstMatch?.group(0), "hi");
    t.assert.equal(_firstMatch?.[0], "hi");

    const secondMatch = iterator.next();

    t.assert.equal(secondMatch?.start, 2);
    t.assert.equal(secondMatch?.match, "hi");
    t.assert.equal(secondMatch?.end, 4);
    t.assert.equal(secondMatch?.group(0), "hi");
    t.assert.equal(iterator._index, 4);

    t.assert.equal(iterator.next(), null);
    t.assert.snapshot({ _regexp, _string });
  });
});

describe("Two RegExp", () => {
  const regExp1 = /(hi)/g;
  const regExp2 = /(he)llo/g;
  const multiRegExp = new MultiRegExp([regExp1, regExp2]);

  it("firstMatch", (t) => {
    for (let i = 0; i < 2; i++) {
      const firstMatch = multiRegExp.firstMatch("hihi");

      t.assert.equal(firstMatch?.groupCount, 1);
      t.assert.equal(firstMatch?.start, 0);
      t.assert.equal(firstMatch?.input, "hihi");
      t.assert.equal(firstMatch?.match, "hi");
      t.assert.equal(firstMatch?.end, 2);
      t.assert.equal(firstMatch?.length, 1);
      t.assert.equal(firstMatch?.group(0), "hi");
      t.assert.equal(firstMatch?.group(1), "hi");
      t.assert.snapshot({ regExp1, regExp2 });
    }
  });
  it("allMatches", (t) => {
    const iterator = multiRegExp.allMatches("hello hi");
    const firstMatch = iterator.next();

    t.assert.equal(firstMatch?.groupCount, 1);
    t.assert.equal(firstMatch?.start, 0);
    t.assert.equal(firstMatch?.input, "hello hi");
    t.assert.equal(firstMatch?.match, "hello");
    t.assert.equal(firstMatch?.end, 5);
    t.assert.equal(firstMatch?.group(1), "he");

    const secondMatch = iterator.next();

    t.assert.equal(secondMatch?.start, 6);
    t.assert.equal(secondMatch?.match, "hi");
    t.assert.equal(secondMatch?.end, 8);
    t.assert.equal(secondMatch?.group(1), "hi");
    t.assert.equal(iterator._index, 8);

    t.assert.equal(iterator.next(), null);
    t.assert.snapshot({ regExp1, regExp2 });
  });
});

describe("getMatched", () => {
  it("Get Matched", (t) => {
    const regexp = /(#{1,6})[ ]+(.*)/g;
    const string = "## Hello World";
    const pre = new MultiRegExp([regexp]);
    const result = pre.getMatched(string);
    const obj = [
      {
        match: "## Hello World",
        start: 0,
        end: 14,
        groupCount: 2,
        group_1: "##",
        group_2: "Hello World",
      },
    ];
    t.assert.deepEqual(result, obj);
    t.assert.snapshot({ regexp, string, result, obj });
  });
});

describe("findMatch", () => {
  it("should find a match with a single regular expression", (t) => {
    const regExp = /hello/;
    const multiRegExp = new MultiRegExp([regExp]);
    const string = "hello world";
    const match = multiRegExp.findMatch(string);
    t.assert.equal(match?.group(0), "hello");
    t.assert.snapshot({ regExp, string });
  });
  it("should find a match with multiple regular expressions", (t) => {
    const regExp = /hello/;
    const regExp2 = /world/;
    const multiRegExp = new MultiRegExp([regExp, regExp2]);
    const string = "hello world";
    const match = multiRegExp.findMatch(string);
    t.assert.equal(match?.group(0), "hello");
    t.assert.snapshot({ regExp, string });
  });
  it("should return null with multiple regular expressions where none match", (t) => {
    const regExp = /foo/;
    const regExp2 = /bar/;
    const multiRegExp = new MultiRegExp([regExp, regExp2]);
    const string = "hello world";
    const match = multiRegExp.findMatch(string);
    t.assert.equal(match, null);
    t.assert.snapshot({ regExp, string });
  });
  it("should find a match with a single regular expression", (t) => {
    const regExp = /hello/;
    const multiRegExp = new MultiRegExp([regExp]);
    const string = "";
    const match = multiRegExp.findMatch(string);
    t.assert.equal(match, null);
    t.assert.snapshot({ regExp, string });
  });
  it("should return null with a start index that is out of range", (t) => {
    const regExp = /hello/;
    const multiRegExp = new MultiRegExp([regExp]);
    const string = "hello world";
    const match = multiRegExp.findMatch(string, 100);
    t.assert.equal(match, null);
    t.assert.snapshot({ regExp, string });
  });
});

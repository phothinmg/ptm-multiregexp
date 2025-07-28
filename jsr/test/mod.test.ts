import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import MultiRegExp from "../mod.ts";

describe("Single RegExp", () => {
  it("firstMatch", () => {
    const regexp = /hello/;
    const multiRegExp = new MultiRegExp([regexp]);
    const string = "hello world";
    const firstMatch = multiRegExp.firstMatch(string);
    const nullMatch = multiRegExp.firstMatch("");
    expect(firstMatch?.input).toBe(string);
    expect(firstMatch?.match).toBe("hello");
    expect(firstMatch?.start).toBe(0);
    expect(firstMatch?.end).toBe(5);
    expect(firstMatch?.group(0)).toBe("hello");
    expect(firstMatch?.start).toBe(0);
    expect(nullMatch).toBe(null);
  });
  it("allMatches", () => {
    const regexp = /hi/g;
    const multiRegExp = new MultiRegExp([regexp]);
    const string = "hihi";
    const iterator = multiRegExp.allMatches(string);
    const firstMatch = iterator.next();
    expect(firstMatch?.input).toBe(string);
    expect(firstMatch?.match).toBe("hi");
    expect(firstMatch?.start).toBe(0);
    expect(firstMatch?.end).toBe(2);
    expect(firstMatch?.group(0)).toBe("hi");

    const secondMatch = iterator.next();

    expect(secondMatch?.match).toBe("hi");
    expect(secondMatch?.start).toBe(2);
    expect(secondMatch?.end).toBe(4);
    expect(secondMatch?.group(0)).toBe("hi");
    expect(iterator._index).toBe(4);

    expect(iterator.next()).toBe(null);
  });
});
describe("Two RegExp", () => {
  const regExp1 = /(hi)/g;
  const regExp2 = /(he)llo/g;
  const multiRegExp = new MultiRegExp([regExp1, regExp2]);

  it("firstMatch", () => {
    for (let i = 0; i < 2; i++) {
      const firstMatch = multiRegExp.firstMatch("hihi");

      expect(firstMatch?.start).toBe(0);
      expect(firstMatch?.end).toBe(2);
      expect(firstMatch?.groupCount).toBe(1);
      expect(firstMatch?.length).toBe(1);

      expect(firstMatch?.input).toBe("hihi");
      expect(firstMatch?.match).toBe("hi");
      expect(firstMatch?.group(0)).toBe("hi");
      expect(firstMatch?.group(0)).toBe("hi");
    }
  });

  it("allMatches", () => {
    const iterator = multiRegExp.allMatches("hello hi");
    const firstMatch = iterator.next();

    expect(firstMatch?.start).toBe(0);
    expect(firstMatch?.end).toBe(5);
    expect(firstMatch?.groupCount).toBe(1);
    expect(firstMatch?.input).toBe("hello hi");
    expect(firstMatch?.match).toBe("hello");
    expect(firstMatch?.group(1)).toBe("he");

    const secondMatch = iterator.next();

    expect(secondMatch?.match).toBe("hi");
    expect(secondMatch?.start).toBe(6);
    expect(secondMatch?.end).toBe(8);
    expect(secondMatch?.group(1)).toBe("hi");
    expect(iterator._index).toBe(8);

    expect(iterator.next()).toBe(null);
  });
});

describe("getMatched", () => {
  it("Get Matched", () => {
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

    expect(result).toStrictEqual(obj);
  });
});

describe("findMatch", () => {
  it("should find a match with a single regular expression", () => {
    const regExp = /hello/;
    const multiRegExp = new MultiRegExp([regExp]);
    const string = "hello world";
    const match = multiRegExp.findMatch(string);

    expect(match?.group(0)).toBe("hello");
  });
  it("should find a match with multiple regular expressions", () => {
    const regExp = /hello/;
    const regExp2 = /world/;
    const multiRegExp = new MultiRegExp([regExp, regExp2]);
    const string = "hello world";
    const match = multiRegExp.findMatch(string);

    expect(match?.group(0)).toBe("hello");
  });
  it("should return null with multiple regular expressions where none match", () => {
    const regExp = /foo/;
    const regExp2 = /bar/;
    const multiRegExp = new MultiRegExp([regExp, regExp2]);
    const string = "hello world";
    const match = multiRegExp.findMatch(string);

    expect(match).toBe(null);
  });
  it("should find a match with a single regular expression", () => {
    const regExp = /hello/;
    const multiRegExp = new MultiRegExp([regExp]);
    const string = "";
    const match = multiRegExp.findMatch(string);

    expect(match).toBe(null);
  });
  it("should return null with a start index that is out of range", () => {
    const regExp = /hello/;
    const multiRegExp = new MultiRegExp([regExp]);
    const string = "hello world";
    const match = multiRegExp.findMatch(string, 100);

    expect(match).toBe(null);
  });
});

/** !
 * Orginal File : https://github.com/christophehurpeau/multiregexp/blob/master/src/RegExpMatch.js
 * Author : Christophe Hurpeau <christophe@hurpeau.com> (http://christophe.hurpeau.com/)
 * @license MIT
 */
/**
 * Types for RegExp exce object
 */
interface ReExceObj {
  /**
   * The string of match
   */
  match: string;
  /**
   * Start of string of match
   */
  start: number;
  /**
   * End of string of match
   */
  end: number;
  /**
   * Number of captured group
   */
  groupCount?: number;
}
/**
 * Type for custom RegExp exce object
 */
export interface ReExce extends ReExceObj {
  [x: `group_${number}`]: string;
}
/**
 * Designed to provide a more convenient and readable interface for working with regular expression matches in TypeScript.
 */
export default class RegExpMatch {
  /**
   * Returns the number of captured groups in the match.
   */
  groupCount: number;

  /**
   * The string on which this match was computed.
   */
  input: string;

  /**
   * The index in the string where the match starts.
   */
  start: number;
  private _result: RegExpExecArray;

  /**
   * @param result The array of matches from the RegExp.exec() method.
   */
  constructor(result: RegExpExecArray) {
    this._result = result;
    this.start = this._result.index;
    this.input = this._result.input;
    this.groupCount = this._result.length - 1;
  }

  /**
   * The match of the pattern.
   */
  get match(): string {
    return this._result[0];
  }
  /**
   * The index of match
   */
  get index(): number {
    return this.start;
  }
  /**
   * The number of captured group
   */
  get length(): number {
    return this.groupCount;
  }

  /**
   * The index in the string after the last character of the match.
   */
  get end(): number {
    return this.start + this.match.length;
  }

  /**
   * Returns the string matched by the given group.
   *
   * If group is 0, returns the match of the pattern.
   */
  group(group: number): string {
    return this._result[group];
  }

  [Symbol.iterator](): { next(): { value: string; done: boolean } } {
    let i = 0;
    const r = this._result;
    return {
      next() {
        return { value: r[i], done: ++i > this.length };
      },
    };
  }
  /**
   * Returns a string representation of the match.
   *
   * The string representation will have the form:
   *
   *   match= "<match>", start= <start>, groupCount= <groupCount>
   *   [group1= "<group1>", ... groupN= "<groupN>"]
   *
   * Where:
   *
   *   <match> is the matched substring.
   *   <start> is the index of the start of the match.
   *   <groupCount> is the number of captured groups.
   *   <group_1> ... <group_N> are the captured groups.
   *
   * @return A string representation of the match.
   */
  toString(): string {
    let str = `match= ${this.match}, start= ${this.start}, groupCount= ${this.groupCount}`;

    if (this.groupCount) {
      for (let i = 1; i <= this.groupCount; i++) {
        str += ` group_${i}= ${this._result[i]}`;
      }
    }

    return str;
  }
  //Return object , that extended from orginal Class
  /**
   * Returns an object representing the match result.
   *
   * The returned object includes the matched string, the start and end
   * positions of the match, the number of captured groups, and a mapping
   * of each group's matched string.
   *
   * @returns {ReExce} An object containing the match details.
   */

  get resultObj(): ReExce {
    const gm: Record<string, string> = {};
    if (this.groupCount) {
      for (let i = 1; i <= this.groupCount; i++) {
        gm[`group_${i}`] = this._result[i];
      }
    }
    return {
      match: this.match,
      start: this.start,
      end: this.end,
      groupCount: this.groupCount,
      ...gm,
    };
  }
}

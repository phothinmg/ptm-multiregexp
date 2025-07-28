/**!
 * Orginal File : https://github.com/christophehurpeau/multiregexp/blob/master/src/RegExpMatch.js
 * Author : Christophe Hurpeau <christophe@hurpeau.com> (http://christophe.hurpeau.com/)
 * @license MIT
 */

interface ReExceObj {
	match: string;
	start: number;
	end: number;
	groupCount?: number;
}
export interface ReExce extends ReExceObj {
	[x: `group_${number}`]: string;
}
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

	constructor(result: RegExpExecArray) {
		Object.defineProperty(this, "groupCount", { value: result.length - 1 });
		Object.defineProperty(this, "start", { value: result.index });
		Object.defineProperty(this, "input", { value: result.input });

		for (let i = 0; i <= result.length; i++) {
			Object.defineProperty(this, String(i), { value: result[i] });
		}
	}

	/**
	 * The match of the pattern.
	 */
	get match(): string {
		return this[0];
	}

	get index(): number {
		return this.start;
	}

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
		return this[group];
	}

	[Symbol.iterator]() {
		let i = 0;
		return {
			next() {
				return { value: this[i], done: ++i > this.length };
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
	toString() {
		let str = `match= ${this.match}, start= ${this.start}, groupCount= ${this.groupCount}`;

		if (this.groupCount) {
			for (let i = 1; i <= this.groupCount; i++) {
				str += ` group_${i}= ${this[i]}`;
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
				gm[`group_${i}`] = this[i];
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

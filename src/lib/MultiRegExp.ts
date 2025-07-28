/**!
 * Orginal File : https://github.com/christophehurpeau/multiregexp/blob/master/src/MultiRegExp.js
 * Author : Christophe Hurpeau <christophe@hurpeau.com> (http://christophe.hurpeau.com/)
 * @license MIT
 */

import MultiRegExpIterable from "./MultiRegExpIterable.js";
import RegExpMatch from "./RegExpMatch.js";

export default class MultiRegExp {
	regExps: Array<RegExp>;

	constructor(iterable: Iterable<RegExp>) {
		this.regExps = [];
		if (iterable) {
			for (const regExp of iterable) {
				this.regExps.push(regExp);
			}
		}
	}

	/**
	 * Find the first match in the given string.
	 * @param string the string to search.
	 * @return the first match, or null if no match is found.
	 */
	firstMatch(string: string): RegExpMatch | null {
		return this.findMatch(string);
	}

	/**
	 * Find the first match in the given string starting at the given index.
	 * @param string the string to search.
	 * @param start the starting index.
	 * @return the first match, or null if no match is found.
	 */
	findMatch(string: string, start: number = 0): RegExpMatch | null {
		if (start >= string.length) {
			return null;
		}
		for (const regExp of this.regExps) {
			regExp.lastIndex = start;
		}

		const match = this.exec(string);

		if (match === null) {
			return null;
		}

		return new RegExpMatch(match as any);
	}

	/**
	 * Finds all matches in the given string, starting at the given index.
	 * @param string the string to search.
	 * @param start the starting index.
	 * @return an iterable of all matches, or an empty iterable if no match is found.
	 */
	allMatches(string: string, start: number = 0): MultiRegExpIterable {
		return new MultiRegExpIterable(this, string, start);
	}

	/**
	 * Find the first match in the given string.
	 * @param string the string to search.
	 * @return the first match, or null if no match is found.
	 */
	exec(string: string): RegExpMatch | null {
		let found: any, foundLastIndex: any;

		for (const regExp of this.regExps) {
			const match = regExp.exec(string);
			if (
				match !== null &&
				(found === undefined || match.index < found.index)
			) {
				found = match;
				foundLastIndex = regExp.lastIndex;
			}
		}

		if (found === undefined) {
			return null;
		}

		for (const regExp of this.regExps) {
			regExp.lastIndex = foundLastIndex;
		}

		return found;
	}

	/**
	 * Test if the given string matches any of the regular expressions.
	 *
	 * @param string the string to test.
	 * @return true if the string matches any of the regular expressions.
	 */
	test(string: string): boolean {
		for (const regExp of this.regExps) {
			if (regExp.test(string)) {
				return true;
			}
		}

		return false;
	}
}

/**!
 * Orginal File : https://github.com/christophehurpeau/multiregexp/blob/master/src/MultiRegExpIterable.js
 * Author : Christophe Hurpeau <christophe@hurpeau.com> (http://christophe.hurpeau.com/)
 * @license MIT
 */
import type MultiRegExp from "./MultiRegExp.js";
import type RegExpMatch from "./RegExpMatch.js";

export default class MultiRegExpIterable {
	_multiRegExp: MultiRegExp;
	_index: number;
	_current: RegExpMatch | null;
	private _string: string;

	constructor(multiRegExp: MultiRegExp, string: string, start: number = 0) {
		this._multiRegExp = multiRegExp;
		this._string = string;
		this._index = start;
	}

	/**
	 * Returns the current match of the iterable.
	 *
	 * @return The current match, or null if the iterable has reached its end.
	 */
	get current(): RegExpMatch | null {
		return this._current;
	}

	/**
	 * Advances the iterable to the next match and returns it.
	 *
	 * @return The next match of the iterable, or null if there are no more matches.
	 *         Updates the current match to the returned match and adjusts the
	 *         internal index to the end of the match or the start of the next
	 *         possible match.
	 */

	next(): RegExpMatch | null {
		const match = this._multiRegExp.findMatch(this._string, this._index);

		if (match !== null) {
			this._index = match.start === match.end ? match.start + 1 : match.end;
		} else {
			this._index = 0;
		}

		this._current = match;
		return match;
	}

	[Symbol.iterator]() {
		this._index = 0;
		return {
			next: () => {
				const match = this.next();
				return {
					value: match === null ? undefined : match,
					done: match === null,
				};
			},
		};
	}
}

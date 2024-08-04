import type { AddressToken, GlobalSymbolFileLine } from '../misc/token-types.js';
import { mediaTypes } from '../misc/media-types.js';
import type { MediaTypeValues } from '../misc/media-types.js';

const regexToFindArrayValue = /\[(\d+)\]/;

const tokennizeNumberValue = (part: string): AddressToken => {
	const arrayRange = regexToFindArrayValue.exec(part)?.[1];
	if (typeof arrayRange !== 'undefined') {
		return {
			arrayRange: parseInt(arrayRange),
			type: 'Address',
			value: parseInt(part),
		};
	}
	return {
		type: 'Address',
		value: parseInt(part),
	};
};

const tokenizeGlobalSymbolFileLine = ({ line }: { line: string }): GlobalSymbolFileLine[] => {
	const lineParts = line.split('\t');
	let lineOfEquation = 0;
	let lineOfValueMedia = 0;
	return lineParts.map((part, index): GlobalSymbolFileLine => {
		if (index === 0) {
			return {
				type: 'Symbol',
				value: part,
			};
		}

		if (part === 'EQU') {
			lineOfEquation = index;
			return {
				type: 'Equation',
				value: part,
			};
		}

		if (index === lineOfEquation + 1 && part === '') {
			lineOfValueMedia = index + 1;
			return {
				type: 'MediaType',
				value: 'UntypedSymbol',
			};
		}

		if (index === lineOfValueMedia && part !== '') {
			return {
				type: 'Value',
				value: part,
			};
		}

		// @ts-expect-error Only want to filter out the correct media types
		if (Object.values(mediaTypes).includes(part)) {
			return {
				type: 'MediaType',
				value: part as MediaTypeValues,
			};
		}

		if (!isNaN(parseInt(part))) return tokennizeNumberValue(part);

		if (part.startsWith(';')) {
			return {
				type: 'Comment',
				value: part,
			};
		}

		return {
			type: 'Unknown',
			value: part,
		};
	});
};

export { tokenizeGlobalSymbolFileLine };

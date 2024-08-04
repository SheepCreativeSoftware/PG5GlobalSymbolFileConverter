/* eslint-disable no-undefined */
import { shiftToAddressDefinition } from './shift-to-address-type.js';

describe('shiftToAddressDefinition()', () => {
	it('should return an object with the correct structure', () => {
		const mediaDefinitionCollection = {
			'Symbol': {
				address: 0,
				comment: 'Comment',
				mediaType: 'F',
			},
			'Symbol2': {
				address: 1,
				comment: 'Comment2',
				mediaType: 'R',
			},
		};

		// @ts-expect-error Testing purposes
		const result = shiftToAddressDefinition(mediaDefinitionCollection);
		expect(result).toEqual({
			'C': {},
			'COB': {},
			'DB': {},
			'DBX': {},
			'F': {
				'0': {
					arrayRange: undefined,
					comment: 'Comment',
					symbol: 'Symbol',
				},
			},
			'FB': {},
			'I': {},
			'K': {},
			'O': {},
			'PB': {},
			'R': {
				'1': {
					arrayRange: undefined,
					comment: 'Comment2',
					symbol: 'Symbol2',
				},
			},
			'SB': {},
			'ST': {},
			'T': {},
			'TEXT': {},
			'TR': {},
			'X': {},
			'XOB': {},
		});
	});

	it('should return an object with the correct structure without ValueDefinition included ("UntypedSymbol")', () => {
		const mediaDefinitionCollection = {
			'Symbol': {
				address: 0,
				comment: 'Comment',
				mediaType: 'F',
			},
			'Symbol2': {
				address: 1,
				comment: 'Comment2',
				mediaType: 'R',
			},
			'Symbol3': {
				comment: 'Comment3',
				mediaType: 'UntypedSymbol',
				value: 'Value',
			},
		};

		// @ts-expect-error Testing purposes
		const result = shiftToAddressDefinition(mediaDefinitionCollection);
		expect(result).toEqual({
			'C': {},
			'COB': {},
			'DB': {},
			'DBX': {},
			'F': {
				'0': {
					arrayRange: undefined,
					comment: 'Comment',
					symbol: 'Symbol',
				},
			},
			'FB': {},
			'I': {},
			'K': {},
			'O': {},
			'PB': {},
			'R': {
				'1': {
					arrayRange: undefined,
					comment: 'Comment2',
					symbol: 'Symbol2',
				},
			},
			'SB': {},
			'ST': {},
			'T': {},
			'TEXT': {},
			'TR': {},
			'X': {},
			'XOB': {},
		});
	});

	it('throw an error if a media definition collection is found', () => {
		const mediaDefinitionCollection = {
			'Symbol': {
				'nestedSymbol': {
					address: 0,
					comment: 'Comment',
					mediaType: 'F',
				},
			},
			'Symbol2': {
				address: 1,
				comment: 'Comment2',
				mediaType: 'R',
			},
		};
		// @ts-expect-error Testing purposes
		expect(() => shiftToAddressDefinition(mediaDefinitionCollection)).
			toThrow('Incompatible Media definition collection found in {"nestedSymbol":{"address":0,"comment":"Comment","mediaType":"F"}}');
	});
});

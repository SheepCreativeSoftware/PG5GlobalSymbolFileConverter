import type { MediaTypeValues } from './media-types.js';

type TokenType = 'Symbol' | 'Equation' | 'MediaType' | 'Address' | 'Comment' | 'Unknown';
interface SymbolToken {
	type: 'Symbol';
	value: string;
}

interface EquationToken {
	type: 'Equation';
	value: 'EQU';
}

interface MediaTypeToken {
	type: 'MediaType';
	value: MediaTypeValues;
}

interface ValueToken {
	type: 'Value';
	value: string;
}

interface AddressToken {
	type: 'Address';
	value: number;
	arrayRange?: number;
}

interface CommentToken {
	type: 'Comment';
	value: string;
}

interface UnknownToken {
	type: 'Unknown';
	value: string;
}

type GlobalSymbolFileLine = SymbolToken | EquationToken | MediaTypeToken | AddressToken | ValueToken | CommentToken | UnknownToken;

export type { TokenType, GlobalSymbolFileLine, SymbolToken, EquationToken, MediaTypeToken, AddressToken, CommentToken, UnknownToken };

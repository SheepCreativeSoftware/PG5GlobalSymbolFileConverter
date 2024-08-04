import type { GlobalSymbolFileLine } from './misc/token-types.js';
import type { MediaTypeValues } from './misc/media-types.js';
import { set } from 'lodash';

interface MediaDefinition {
	address: number;
	arrayRange?: number;
	comment: string;
	mediaType: Exclude<MediaTypeValues, 'UntypedSymbol'>;
}

interface ValueDefinition {
	comment: string;
	mediaType: Extract<MediaTypeValues, 'UntypedSymbol'>;
	value: string;
}

interface MediaDefinitionCollection {
	[key: string]: MediaDefinition | MediaDefinitionCollection | ValueDefinition;
}

const hasValueType = (tokens: GlobalSymbolFileLine[]): boolean => tokens.some((token) => token.type === 'Value');
const hasAddressType = (tokens: GlobalSymbolFileLine[]): boolean => tokens.some((token) => token.type === 'Address');

const getValueDefinition = (tokens: GlobalSymbolFileLine[]): ValueDefinition => {
	const mediaType = tokens.find((token) => token.type === 'MediaType')?.value;
	if (!mediaType) throw new Error(`Media type not found in ${JSON.stringify(tokens)}`);

	// This should never happen as it is checked in the tokenizer
	if (mediaType !== 'UntypedSymbol') throw new Error(`Media type is 'UntypedSymbol' in ${JSON.stringify(tokens)}`);

	return {
		comment: tokens.find((token) => token.type === 'Comment')?.value ?? '',
		mediaType,
		value: tokens.find((token) => token.type === 'Value')?.value ?? '',
	};
};

const getMediaDefinition = (tokens: GlobalSymbolFileLine[]): MediaDefinition => {
	const mediaType = tokens.find((token) => token.type === 'MediaType')?.value;
	if (!mediaType) throw new Error(`Media type not found in ${JSON.stringify(tokens)}`);

	// This should never happen as it is checked in the tokenizer
	if (mediaType === 'UntypedSymbol') throw new Error(`Media type is 'UntypedSymbol' in ${JSON.stringify(tokens)}`);

	return {
		address: tokens.find((token) => token.type === 'Address')?.value ?? 0,
		arrayRange: tokens.find((token) => token.type === 'Address')?.arrayRange,
		comment: tokens.find((token) => token.type === 'Comment')?.value ?? '',
		mediaType,
	};
};

const convertTokensToMediaDefinition = ({ tokens }: { tokens: GlobalSymbolFileLine[] }): MediaDefinitionCollection => {
	const symbolName = tokens.find((token) => token.type === 'Symbol')?.value;

	if (!symbolName) throw new Error(`Symbol name not found in ${JSON.stringify(tokens)}`);

	const mediaDefinitionCollection: MediaDefinitionCollection = {};

	if (hasValueType(tokens)) set(mediaDefinitionCollection, symbolName, getValueDefinition(tokens));
	if (hasAddressType(tokens)) set(mediaDefinitionCollection, symbolName, getMediaDefinition(tokens));

	return mediaDefinitionCollection;
};

const convertTokensToMediaDefinitionWithSingleLineSymbols = ({ tokens }: { tokens: GlobalSymbolFileLine[] }): MediaDefinitionCollection => {
	const symbolName = tokens.find((token) => token.type === 'Symbol')?.value;

	if (!symbolName) throw new Error(`Symbol name not found in ${JSON.stringify(tokens)}`);

	const mediaDefinitionCollection: MediaDefinitionCollection = {};

	if (hasValueType(tokens)) mediaDefinitionCollection[symbolName] = getValueDefinition(tokens);
	if (hasAddressType(tokens)) mediaDefinitionCollection[symbolName] = getMediaDefinition(tokens);

	return mediaDefinitionCollection;
};

export { convertTokensToMediaDefinition, convertTokensToMediaDefinitionWithSingleLineSymbols };
export type { MediaDefinition, ValueDefinition, MediaDefinitionCollection };

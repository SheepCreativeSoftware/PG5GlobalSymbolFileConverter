import type { MediaDefinition, MediaDefinitionCollection } from './convert-tokens-to-media.js';
import { mediaTypes, type MediaTypeValues } from './misc/media-types.js';

type AddressMediaType = Exclude<MediaTypeValues, 'UntypedSymbol'>;

type AddressDefinition = Record<string, {
	symbol: string;
	arrayRange?: number;
	comment: string;
}>;

type AddressDefinitionCollection = Record<AddressMediaType, AddressDefinition>;

const isAMediaDefinitionCollection = (mediaDefinition: MediaDefinitionCollection | MediaDefinition): mediaDefinition is MediaDefinitionCollection => {
	if (typeof mediaDefinition.arrayRange !== 'number' && typeof mediaDefinition.arrayRange !== 'undefined') return true;
	if (typeof mediaDefinition.comment !== 'string') return true;
	if (typeof mediaDefinition.mediaType !== 'string') return true;
	return false;
};

const getAddressDefinitionCollectionBase = (): AddressDefinitionCollection => {
	const values = Object.values(mediaTypes);
	const result = {} as AddressDefinitionCollection;
	for (const value of values) {
		if (value === 'UntypedSymbol') continue;
		result[value] = {};
	}

	return result;
};

const shiftToAddressDefinition = (mediaDefinitionCollection: MediaDefinitionCollection): AddressDefinitionCollection => {
	const result: AddressDefinitionCollection = getAddressDefinitionCollectionBase();

	for (const [symbol, mediaDefinition] of Object.entries(mediaDefinitionCollection)) {
		if (mediaDefinition.mediaType === 'UntypedSymbol') continue;

		// eslint-disable-next-line curly
		if (isAMediaDefinitionCollection(mediaDefinition)) {
			throw new Error(`Incompatible Media definition collection found in ${JSON.stringify(mediaDefinition)}`);
		}

		const address = String(mediaDefinition.address);
		const mediaType = mediaDefinition.mediaType;

		result[mediaType][address] = {
			arrayRange: mediaDefinition.arrayRange,
			comment: mediaDefinition.comment,
			symbol,
		};
	}

	return result;
};

export { shiftToAddressDefinition };

import { convertTokensToMediaDefinition, convertTokensToMediaDefinitionWithSingleLineSymbols } from './convert-tokens-to-media.js';
import type { MediaDefinitionCollection } from './convert-tokens-to-media.js';
import { merge } from 'lodash';
import { optimizeOfGlobalSymbolFileLine } from './file-line-lint/optimizer.js';
import { ReadLinesAsync } from 'readlines-iconv';
import { syntaxCheckOfGlobalSymbolFileLine } from './file-line-lint/syntax-checker.js';
import { tokenizeGlobalSymbolFileLine } from './file-line-lint/tokenizer.js';

const convertGlobalSymbolFileToMediaDefinition = async ({ filename, singleLineSymbols = false }: {
	filename: string,
	singleLineSymbols?: boolean,
}): Promise<MediaDefinitionCollection> => {
	const lineHandler = new ReadLinesAsync({ encoding: 'win1252' });
	await lineHandler.open(filename);

	const result: MediaDefinitionCollection = {};

	let hasAddedALine = false;
	for await (const line of lineHandler) {
		if (line.includes('$ATTR') || line.startsWith(';') || line === '') continue;

		const tokens = tokenizeGlobalSymbolFileLine({ line });
		syntaxCheckOfGlobalSymbolFileLine({ tokens });
		const optimizedTokens = optimizeOfGlobalSymbolFileLine({ tokens });

		if (singleLineSymbols) {
			const convertedLine = convertTokensToMediaDefinitionWithSingleLineSymbols({ tokens: optimizedTokens });
			merge(result, convertedLine);
			hasAddedALine = true;
		} else {
			const convertedLine = convertTokensToMediaDefinition({ tokens: optimizedTokens });
			merge(result, convertedLine);
			hasAddedALine = true;
		}
	}
	await lineHandler.close();

	if (!hasAddedALine) throw new Error(`File is empty: ${filename}`);

	return result;
};

export { convertGlobalSymbolFileToMediaDefinition };

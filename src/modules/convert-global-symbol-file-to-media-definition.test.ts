import { convertGlobalSymbolFileToMediaDefinition } from './convert-global-symbol-file-to-media-definition.js';
import path from 'node:path';

describe('convertGlobalSymbolFileToMediaDefinition', () => {
	it('convert global symbol file with nested symbols and match the snapshot', async () => {
		const result = await convertGlobalSymbolFileToMediaDefinition({ filename: path.resolve('./test/test-files/_Global.sy5') });
		expect(result).toMatchSnapshot();
	});

	it('convert global symbol file with single line symbols and match the snapshot', async () => {
		const result = await convertGlobalSymbolFileToMediaDefinition({
			filename: path.resolve('./test/test-files/_Global.sy5'), singleLineSymbols: true,
		});
		expect(result).toMatchSnapshot();
	});

	it('throw an error when the file does not exist', async () => {
		await expect(convertGlobalSymbolFileToMediaDefinition({
			filename: 'does-not-exist',
		})).rejects.toThrow(/ENOENT: no such file or directory, open */);
	});

	it('throw an error when the file is empty', async () => {
		await expect(convertGlobalSymbolFileToMediaDefinition({ filename: path.resolve('./test/test-files/_Empty.sy5') })).
			rejects.toThrow(`File is empty: ${path.resolve('./test/test-files/_Empty.sy5')}`);
	});

	it('throw an error when the file is invalid', async () => {
		await expect(convertGlobalSymbolFileToMediaDefinition({ filename: path.resolve('./test/test-files//_InvalidToken.sy5') })).
			rejects.toThrow('Unknown token type: B');
	});
});

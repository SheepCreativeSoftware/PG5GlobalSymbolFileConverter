import type { GlobalSymbolFileLine } from '../misc/token-types.js';

const syntaxCheckOfGlobalSymbolFileLine = ({ tokens }: { tokens: GlobalSymbolFileLine[] }): void | never => {
	for (const token of tokens) {
		switch (token.type) {
			case 'Unknown':
				throw new Error(`Unknown token type: ${token.value}`);
			default:
				break;
		}
	}
};

export { syntaxCheckOfGlobalSymbolFileLine };

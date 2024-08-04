import type { GlobalSymbolFileLine } from '../misc/token-types.js';

const optimizeOfGlobalSymbolFileLine = ({ tokens }: { tokens: GlobalSymbolFileLine[] }): GlobalSymbolFileLine[] => {
	return tokens.filter((token) => {
		if (token.type === 'Equation') return false;
		return true;
	});
};

export { optimizeOfGlobalSymbolFileLine };

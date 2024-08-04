const mediaTypes = {
	CONSTANT: 'K',
	COUNTER: 'C',
	CYCLIC_ORG_BLOCK: 'COB',
	DATA_BLOCK: 'DB',
	EXCEPTION_ORG_BLOCK: 'XOB',
	EXT_DATA_BLOCK: 'DBX',
	FLAG: 'F',
	FUNCTION_BLOCK: 'FB',
	INPUT: 'I',
	OUTPUT: 'O',
	PROGRAM_BLOCK: 'PB',
	REGISTER: 'R',
	SEQUENCIAL_BLOCK: 'SB',
	STEP: 'ST',
	TEXTLONG: 'TEXT',
	TEXTSMALL: 'X',
	TIMER: 'T',
	TRANSITION: 'TR',
	UNTYPED: 'UntypedSymbol',
} as const;

type MediaTypeValues = typeof mediaTypes[keyof typeof mediaTypes];

export { mediaTypes };
export type { MediaTypeValues };

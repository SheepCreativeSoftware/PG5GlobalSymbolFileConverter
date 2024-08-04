# PG5GlobalSymbolFileConverter
NPM module that converts PG5 Global Symbol files into JSON

## Install
To install this npm module, follow these steps:
	```bash
	npm install pg5-global-symbol-file-converter
	```

4. Once the installation is complete, you can import the module:

	To import this module using the `require` statement, add the following code to your JavaScript file:

```s
const converter = require('pg5-global-symbol-file-converter');
```

To import this module using the `import` statement (ES6 module syntax), add the following code to your JavaScript file:

```js
import converter from 'pg5-global-symbol-file-converter';
```

Make sure that you have the necessary environment and configuration set up to support ES6 modules.

## Usage
### Convert to Media Definition

Call the function `convertGlobalSymbolFileToMediaDefinition` and pass the PG5 Global Symbol file path as a parameter. This function will convert the file into a JSON representation of media definitions.

```js
const converter = require('pg5-global-symbol-file-converter');

const filePath = '/path/to/your/_Global.sy5';
const mediaDefinitions = converter.convertGlobalSymbolFileToMediaDefinition({filePath});
```

The function will return an object of media definitions. You can then use this data in your application as needed.
The `singleLineSymbols` option is used in the `convertGlobalSymbolFileToMediaDefinition` function to specify whether the media definitions should be generated as single-line symbols. 

When `singleLineSymbols` is set to `true`, each media definition will be represented as a single line of code. This can be useful when you want a compact representation of the media definitions.

When `singleLineSymbols` is set to `false` or not provided, each media definition will be represented as a separate object (nested), allowing for more detailed and structured representation of the media definitions.

To use the `singleLineSymbols` option, you can pass it as a second parameter to the `convertGlobalSymbolFileToMediaDefinition` function:

```js
const mediaDefinitions = converter.convertGlobalSymbolFileToMediaDefinition({filePath, singleLineSymbols: true});
```


### Convert to Address Definition
Call the function `shiftToAddressDefinition` and pass the PG5 Global Symbol file path and the media definition as parameters. This function will convert the media definition into an address definition.

```js
const converter = require('pg5-global-symbol-file-converter');

const filePath = '/path/to/your/_Global.sy5';
const mediaDefinitionCollection = converter.convertGlobalSymbolFileToMediaDefinition({filePath});

const addressDefinitionCollection = converter.shiftToAddressDefinition({mediaDefinitionCollection});
```

The function will return an array of address definitions. You can then use this data in your application as needed.
> [!NOTE]
> `ValueDefintions` like `UntypedSymbol` will be removed with this function.

Remember to replace "/path/to/your/_Global.sy5" with the actual path to your PG5 Global Symbol file.

## Output Format
The JS Object representation of the "mediaDefinitionCollection" is an object that contains media definitions. Each media definition is represented as a key-value pair, where the key is the name of the media definition and the value is an object that contains the properties of the media definition.

Here is an example of the JS Object representation of the "mediaDefinitionCollection":

Nested Example:
```js
{
	"A": {
		"Alarm": {
			"Alarmliste": {
				"MyName": {
				"address": 3049,
				"arrayRange": 2,
				"comment": "",
				"mediaType": "TEXT",
				},
				"Texts": {
				"address": 0,
				"arrayRange": 1000,
				"comment": "",
				"mediaType": "TEXT",
				},
			},
			"DDC_Alarmliste": {
				"comment": ";Alarmliste",
				"mediaType": "UntypedSymbol",
				"value": "1",
			},
		},
	}
}
```

Single Line Symbols Example:
```js
{
	"A.Alarm.Alarmliste.MyName": {
		address: 3049,
		arrayRange: 2,
		comment: "",
		mediaType: "TEXT",
	},
	"A.Alarm.Alarmliste.Texts": {
		address: 0,
		arrayRange: 1000,
		comment: "",
		mediaType: "TEXT",
	},
	"A.Alarm.DDC_Alarmliste": {
		comment: ";Alarmliste",
		mediaType: "UntypedSymbol",
		value: "1",
	},
  }
```

Address Definition Example:
```js
{
	"TEXT": {
		"0": {
			symbol: 'A.Alarm.Alarmliste.Texts',
			arrayRange: 1000,
			comment: "",
		}
		"3049": {
			symbol: 'A.Alarm.Alarmliste.MyName',
			arrayRange: 2,
			comment: "",
		}
	},
}
```


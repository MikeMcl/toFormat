#toFormat

Adds a `toFormat` instance method to [big.js](https://github.com/MikeMcl/big.js/) or [decimal.js](https://github.com/MikeMcl/decimal.js/).

## Install

Node.js

```bash
npm install toformat
```

Browser

```html
<script src='path/to/big.js'></script>
<script src='path/to/toFormat.js'></script>
```

## Use

Node.js

```js
var Big = require('toformat')(require('big'));
var x = new Big(9876.54321);
x.toFormat(2);    // '9,876.54'

Big.format.decimalSeparator = ',';
Big.format.groupSeparator: ' ';
x.toFormat(2);    // '9 876,54'
```

or

```js
var Decimal = require('toformat')(require('decimal'));
// etc.
```    

Browser

```js
toFormat(Big);
var x = new Big(9876.54321);
x.toFormat(2);    // '9,876.54'
```    

The initial value of the format object, i.e. `Big.format` or `Decimal.format`, is

```js
Big.format = {
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: '',
  fractionGroupSize : 0
};
```

## Test

```bash
npm test
```
  
## Licence

MIT Expat.

See *LICENCE.md*

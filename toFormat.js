/*
 * Adds a `toFormat` method to `Ctor.prototype` and a `format` object to `Ctor`, where `Ctor` is
 * a big number constructor such as `Decimal` (decimal.js) or `Big` (big.js).
 */
function toFormat(Ctor) {
  'use strict';

  /*
   * Returns a string representing the value of this big number in fixed-point notation to `dp`
   * decimal places using rounding mode `rm`, and formatted according to the following properties
   * of the constructor's `format` object property.
   *
   *  Ctor.format = {
   *    decimalSeparator: '.',
   *    groupSeparator: ',',
   *    groupSize: 3,
   *    secondaryGroupSize: 0,
   *    fractionGroupSeparator: '',     // '\xA0' non-breaking space
   *    fractionGroupSize : 0
   *  };
   *
   * [dp] {number} Decimal places. Integer.
   * [rm] {number} Decimal places. Integer, 0 to 8. (Ignored if using big.js.)
   *
   */
  Ctor.prototype.toFormat = function toFormat(dp, rm) {
    var x = this;
    if (!x.e && x.e !== 0) return x.toString();
    var k,
        format = x.constructor.format,
        groupSeparator = format.groupSeparator,
        g1 = +format.groupSize,
        g2 = +format.secondaryGroupSize,
        arr = x.toFixed(dp, rm).split('.'),
        intPart = arr[0],
        fracPart = arr[1],
        intDigits = x.s < 0 ? intPart.slice(1) : intPart,
        len = intDigits.length;

    if (g2) len -= (k = g1, g1 = g2, g2 = k);

    if (g1 > 0 && len > 0) {
        k = len % g1 || g1;
        intPart = intDigits.substr(0, k);
        for (; k < len; k += g1) intPart += groupSeparator + intDigits.substr(k, g1);
        if (g2 > 0) intPart += groupSeparator + intDigits.slice(k);
        if (x.s < 0) intPart = '-' + intPart;
    }

    return fracPart
      ? intPart + format.decimalSeparator + ((g2 = +format.fractionGroupSize)
        ? fracPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'),
          '$&' + format.fractionGroupSeparator)
        : fracPart)
      : intPart;
  };

  Ctor.format = {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: '',
    fractionGroupSize: 0
  };

  return Ctor;
}

if (typeof module !== 'undefined' && module.exports) module.exports = toFormat;

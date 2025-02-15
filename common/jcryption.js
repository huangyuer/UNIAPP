var biRadixBase = 2, biRadixBits = 16, bitsPerDigit = biRadixBits, biRadix = 65536, biHalfRadix = biRadix >>> 1, biRadixSquared = biRadix * biRadix, maxDigitVal = biRadix - 1, maxInteger = 9999999999999998, maxDigits, ZERO_ARRAY, bigZero, bigOne, dpl10 = 15, highBitMasks = Array(0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535), hexatrigesimalToChar = Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x",
    "y", "z"), hexToChar = Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"), lowBitMasks = Array(0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535);
function encryption(encryptObject,keyPair) {
    var charCounter = 0;
    var j, block;
    var encrypted = "";
    return encryptChar(charCounter,keyPair,encryptObject,encrypted);
}

function encryptChar(charCounter,keyPair,encryptObject,encrypted) {
    var block = new BigInt();
    var j = 0;
    for (var k = charCounter; k < charCounter+keyPair.chunkSize; ++j) {
        block.digits[j] = encryptObject[k++];
        block.digits[j] += encryptObject[k++] << 8;
    }
    var crypt = keyPair.barrett.powMod(block, keyPair.e);
    var text = keyPair.radix == 16 ? biToHex(crypt) : biToString(crypt, keyPair.radix);
    encrypted += text + " ";
    charCounter += keyPair.chunkSize;
    if (charCounter < encryptObject.length) {
        return encryptChar(charCounter,keyPair,encryptObject,encrypted);
    } else {
        var encryptedString = encrypted.substring(0, encrypted.length - 1);
        return encryptedString;
    }
}
function setMaxDigits(a) {
    maxDigits = a;
    ZERO_ARRAY = Array(maxDigits);
    for (a = 0; a < ZERO_ARRAY.length; a++)ZERO_ARRAY[a] = 0;
    bigZero = new BigInt;
    bigOne = new BigInt;
    bigOne.digits[0] = 1
}
function BigInt(a) {
    this.digits = typeof a == "boolean" && a == true ? null : ZERO_ARRAY.slice(0);
    this.isNeg = false
}
function biFromDecimal(a) {
    for (var b = a.charAt(0) == "-", c = b ? 1 : 0, d; c < a.length && a.charAt(c) == "0";)++c;
    if (c == a.length)d = new BigInt; else {
        var e = (a.length - c) % dpl10;
        if (e == 0)e = dpl10;
        d = biFromNumber(Number(a.substr(c, e)));
        for (c += e; c < a.length;) {
            d = biAdd(biMultiply(d, biFromNumber(1E15)), biFromNumber(Number(a.substr(c, dpl10))));
            c += dpl10
        }
        d.isNeg = b
    }
    return d
}
function biCopy(a) {
    var b = new BigInt(true);
    b.digits = a.digits.slice(0);
    b.isNeg = a.isNeg;
    return b
}
function biFromNumber(a) {
    var b = new BigInt;
    b.isNeg = a < 0;
    a = Math.abs(a);
    for (var c = 0; a > 0;) {
        b.digits[c++] = a & maxDigitVal;
        a >>= biRadixBits
    }
    return b
}
function reverseStr(a) {
    for (var b = "", c = a.length - 1; c > -1; --c)b += a.charAt(c);
    return b
}
function biToString(a, b) {
    var c = new BigInt;
    c.digits[0] = b;
    for (var d = biDivideModulo(a, c), e = hexatrigesimalToChar[d[1].digits[0]]; biCompare(d[0], bigZero) == 1;) {
        d = biDivideModulo(d[0], c);
        digit = d[1].digits[0];
        e += hexatrigesimalToChar[d[1].digits[0]]
    }
    return(a.isNeg ? "-" : "") + reverseStr(e)
}
function biToDecimal(a) {
    var b = new BigInt;
    b.digits[0] = 10;
    for (var c = biDivideModulo(a, b), d = String(c[1].digits[0]); biCompare(c[0], bigZero) == 1;) {
        c = biDivideModulo(c[0], b);
        d += String(c[1].digits[0])
    }
    return(a.isNeg ? "-" : "") + reverseStr(d)
}
function digitToHex(a) {
    var b = "";
    for (var i = 0; i < 4; ++i) {
        b += hexToChar[a & 15];
        a >>>= 4
    }
    return reverseStr(b)
}
function biToHex(a) {
    var b = "";
    biHighIndex(a);
    for (var c = biHighIndex(a); c > -1; --c)b += digitToHex(a.digits[c]);
    return b
}
function charToHex(a) {
    return a >= 48 && a <= 57 ? a - 48 : a >= 65 && a <= 90 ? 10 + a - 65 : a >= 97 && a <= 122 ? 10 + a - 97 : 0
}
function hexToDigit(a) {
    for (var b = 0, c = Math.min(a.length, 4), d = 0; d < c; ++d) {
        b <<= 4;
        b |= charToHex(a.charCodeAt(d))
    }
    return b
}
function biFromHex(a) {
    for (var b = new BigInt, c = a.length, d = 0; c > 0; c -= 4, ++d)b.digits[d] = hexToDigit(a.substr(Math.max(c - 4, 0), Math.min(c, 4)));
    return b
}
function biFromString(a, b) {
    var c = a.charAt(0) == "-", d = c ? 1 : 0, e = new BigInt, f = new BigInt;
    f.digits[0] = 1;
    for (var g = a.length - 1; g >= d; g--) {
        var h = a.charCodeAt(g);
        h = charToHex(h);
        h = biMultiplyDigit(f, h);
        e = biAdd(e, h);
        f = biMultiplyDigit(f, b)
    }
    e.isNeg = c;
    return e
}
function biDump(a) {
    return(a.isNeg ? "-" : "") + a.digits.join(" ")
}
function biAdd(a, b) {
    var c;
    if (a.isNeg != b.isNeg) {
        b.isNeg = !b.isNeg;
        c = biSubtract(a, b);
        b.isNeg = !b.isNeg
    } else {
        c = new BigInt;
        for (var d = 0, e = 0; e < a.digits.length; ++e) {
            d = a.digits[e] + b.digits[e] + d;
            c.digits[e] = d & 65535;
            d = Number(d >= biRadix)
        }
        c.isNeg = a.isNeg
    }
    return c
}
function biSubtract(a, b) {
    var c;
    if (a.isNeg != b.isNeg) {
        b.isNeg = !b.isNeg;
        c = biAdd(a, b);
        b.isNeg = !b.isNeg
    } else {
        c = new BigInt;
        var d;
        for (var e = d = 0; e < a.digits.length; ++e) {
            d = a.digits[e] - b.digits[e] + d;
            c.digits[e] = d & 65535;
            if (c.digits[e] < 0)c.digits[e] += biRadix;
            d = 0 - Number(d < 0)
        }
        if (d == -1) {
            for (e = d = 0; e < a.digits.length; ++e) {
                d = 0 - c.digits[e] + d;
                c.digits[e] = d & 65535;
                if (c.digits[e] < 0)c.digits[e] += biRadix;
                d = 0 - Number(d < 0)
            }
            c.isNeg = !a.isNeg
        } else c.isNeg = a.isNeg
    }
    return c
}
function biHighIndex(a) {
    for (var b = a.digits.length - 1; b > 0 && a.digits[b] == 0;)--b;
    return b
}
function biNumBits(a) {
    var b = biHighIndex(a);
    a = a.digits[b];
    b = (b + 1) * bitsPerDigit;
    var c;
    for (c = b; c > b - bitsPerDigit; --c) {
        if ((a & 32768) != 0)break;
        a <<= 1
    }
    return c
}
function biMultiply(a, b) {
    for (var c = new BigInt, d, e = biHighIndex(a), f = biHighIndex(b), g, h = 0; h <= f; ++h) {
        d = 0;
        g = h;
        for (var j = 0; j <= e; ++j, ++g) {
            d = c.digits[g] + a.digits[j] * b.digits[h] + d;
            c.digits[g] = d & maxDigitVal;
            d = d >>> biRadixBits
        }
        c.digits[h + e + 1] = d
    }
    c.isNeg = a.isNeg != b.isNeg;
    return c
}
function biMultiplyDigit(a, b) {
    var c, d;
    var result = new BigInt;
    c = biHighIndex(a);
    for (var e = d = 0; e <= c; ++e) {
        d = result.digits[e] + a.digits[e] * b + d;
        result.digits[e] = d & maxDigitVal;
        d = d >>> biRadixBits
    }
    result.digits[1 + c] = d;
    return result
}
function arrayCopy(a, b, c, d, e) {
    e = Math.min(b + e, a.length);
    b = b;
    for (d = d; b < e; ++b, ++d)c[d] = a[b]
}
function biShiftLeft(a, b) {
    var c = Math.floor(b / bitsPerDigit), d = new BigInt;
    arrayCopy(a.digits, 0, d.digits, c, d.digits.length - c);
    c = b % bitsPerDigit;
    for (var e = bitsPerDigit - c, f = d.digits.length - 1, g = f - 1; f > 0; --f, --g)d.digits[f] = d.digits[f] << c & maxDigitVal | (d.digits[g] & highBitMasks[c]) >>> e;
    d.digits[0] = d.digits[f] << c & maxDigitVal;
    d.isNeg = a.isNeg;
    return d
}
function biShiftRight(a, b) {
    var c = Math.floor(b / bitsPerDigit), d = new BigInt;
    arrayCopy(a.digits, c, d.digits, 0, a.digits.length - c);
    c = b % bitsPerDigit;
    for (var e = bitsPerDigit - c, f = 0, g = f + 1; f < d.digits.length - 1; ++f, ++g)d.digits[f] = d.digits[f] >>> c | (d.digits[g] & lowBitMasks[c]) << e;
    d.digits[d.digits.length - 1] >>>= c;
    d.isNeg = a.isNeg;
    return d
}
function biMultiplyByRadixPower(a, b) {
    var c = new BigInt;
    arrayCopy(a.digits, 0, c.digits, b, c.digits.length - b);
    return c
}
function biDivideByRadixPower(a, b) {
    var c = new BigInt;
    arrayCopy(a.digits, b, c.digits, 0, c.digits.length - b);
    return c
}
function biModuloByRadixPower(a, b) {
    var c = new BigInt;
    arrayCopy(a.digits, 0, c.digits, 0, b);
    return c
}
function biCompare(a, b) {
    if (a.isNeg != b.isNeg)return 1 - 2 * Number(a.isNeg);
    for (var c = a.digits.length - 1; c >= 0; --c)if (a.digits[c] != b.digits[c])return a.isNeg ? 1 - 2 * Number(a.digits[c] > b.digits[c]) : 1 - 2 * Number(a.digits[c] < b.digits[c]);
    return 0
}
function biDivideModulo(a, b) {
    var c = biNumBits(a), d = biNumBits(b), e = b.isNeg, f, g;
    if (c < d) {
        if (a.isNeg) {
            f = biCopy(bigOne);
            f.isNeg = !b.isNeg;
            a.isNeg = false;
            b.isNeg = false;
            g = biSubtract(b, a);
            a.isNeg = true;
            b.isNeg = e
        } else {
            f = new BigInt;
            g = biCopy(a)
        }
        return Array(f, g)
    }
    f = new BigInt;
    g = a;
    for (var h = Math.ceil(d / bitsPerDigit) - 1, l = 0; b.digits[h] < biHalfRadix;) {
        b = biShiftLeft(b, 1);
        ++l;
        ++d;
        h = Math.ceil(d / bitsPerDigit) - 1
    }
    g = biShiftLeft(g, l);
    c += l;
    c = Math.ceil(c / bitsPerDigit) - 1;
    for (d = biMultiplyByRadixPower(b, c - h); biCompare(g, d) != -1;) {
        ++f.digits[c -
            h];
        g = biSubtract(g, d)
    }
    for (c = c; c > h; --c) {
        d = c >= g.digits.length ? 0 : g.digits[c];
        var m = c - 1 >= g.digits.length ? 0 : g.digits[c - 1], o = c - 2 >= g.digits.length ? 0 : g.digits[c - 2], n = h >= b.digits.length ? 0 : b.digits[h], k = h - 1 >= b.digits.length ? 0 : b.digits[h - 1];
        f.digits[c - h - 1] = d == n ? maxDigitVal : Math.floor((d * biRadix + m) / n);
        for (var p = f.digits[c - h - 1] * (n * biRadix + k), q = d * biRadixSquared + (m * biRadix + o); p > q;) {
            --f.digits[c - h - 1];
            p = f.digits[c - h - 1] * (n * biRadix | k);
            q = d * biRadix * biRadix + (m * biRadix + o)
        }
        d = biMultiplyByRadixPower(b, c - h - 1);
        g = biSubtract(g,
            biMultiplyDigit(d, f.digits[c - h - 1]));
        if (g.isNeg) {
            g = biAdd(g, d);
            --f.digits[c - h - 1]
        }
    }
    g = biShiftRight(g, l);
    f.isNeg = a.isNeg != e;
    if (a.isNeg) {
        f = e ? biAdd(f, bigOne) : biSubtract(f, bigOne);
        b = biShiftRight(b, l);
        g = biSubtract(b, g)
    }
    if (g.digits[0] == 0 && biHighIndex(g) == 0)g.isNeg = false;
    return Array(f, g)
}
function biDivide(a, b) {
    return biDivideModulo(a, b)[0]
}
function biModulo(a, b) {
    return biDivideModulo(a, b)[1]
}
function biMultiplyMod(a, b, c) {
    return biModulo(biMultiply(a, b), c)
}
function biPow(a, b) {
    for (var c = bigOne, d = a; ;) {
        if ((b & 1) != 0)c = biMultiply(c, d);
        b >>= 1;
        if (b == 0)break;
        d = biMultiply(d, d)
    }
    return c
}
function biPowMod(a, b, c) {
    var d = bigOne;
    a = a;
    for (b = b; ;) {
        if ((b.digits[0] & 1) != 0)d = biMultiplyMod(d, a, c);
        b = biShiftRight(b, 1);
        if (b.digits[0] == 0 && biHighIndex(b) == 0)break;
        a = biMultiplyMod(a, a, c)
    }
    return d
}
function BarrettMu(a) {
    this.modulus = biCopy(a);
    this.k = biHighIndex(this.modulus) + 1;
    a = new BigInt;
    a.digits[2 * this.k] = 1;
    this.mu = biDivide(a, this.modulus);
    this.bkplus1 = new BigInt;
    this.bkplus1.digits[this.k + 1] = 1;
    this.modulo = BarrettMu_modulo;
    this.multiplyMod = BarrettMu_multiplyMod;
    this.powMod = BarrettMu_powMod
}
function BarrettMu_modulo(a) {
    var b = biDivideByRadixPower(a, this.k - 1);
    b = biMultiply(b, this.mu);
    b = biDivideByRadixPower(b, this.k + 1);
    a = biModuloByRadixPower(a, this.k + 1);
    b = biMultiply(b, this.modulus);
    b = biModuloByRadixPower(b, this.k + 1);
    a = biSubtract(a, b);
    if (a.isNeg)a = biAdd(a, this.bkplus1);
    for (b = biCompare(a, this.modulus) >= 0; b;) {
        a = biSubtract(a, this.modulus);
        b = biCompare(a, this.modulus) >= 0
    }
    return a
}
function BarrettMu_multiplyMod(a, b) {
    return this.modulo(biMultiply(a, b))
}
function BarrettMu_powMod(a, b) {
    var c = new BigInt;
    for (c.digits[0] = 1; ;) {
        if ((b.digits[0] & 1) != 0)c = this.multiplyMod(c, a);
        b = biShiftRight(b, 1);
        if (b.digits[0] == 0 && biHighIndex(b) == 0)break;
        a = this.multiplyMod(a, a)
    }
    return c
};

// 暴露的API
export function jCryptionKeyPair(e, f, g) {
    setMaxDigits(parseInt(g, 10));
    this.e = biFromHex(e);
    this.m = biFromHex(f);
    this.chunkSize = 2 * biHighIndex(this.m);
    this.radix = 16;
    this.barrett =
        new BarrettMu(this.m);
};
export function encrypt(string,keyPair) {
    var charSum = 0;
    for(var i = 0; i < string.length; i++){
        charSum += string.charCodeAt(i);
    }
    var tag = '0123456789abcdef';
    var hex = '';
    hex += tag.charAt((charSum & 0xF0) >> 4) + tag.charAt(charSum & 0x0F);

    var taggedString = hex + string;

    var encrypt = [];
    var j = 0;

    while (j < taggedString.length) {
        encrypt[j] = taggedString.charCodeAt(j);
        j++;
    }

    while (encrypt.length % keyPair.chunkSize !== 0) {
        encrypt[j++] = 0;
    }
    return encryption(encrypt,keyPair);
};

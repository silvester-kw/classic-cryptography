"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rc4EncryptModified = void 0;
function initializeSBoxModified(key) {
    var _a;
    var sBox = [];
    var keyLength = key.length;
    var s = Array.from(Array(256).keys());
    key = vigenereEncrypt(key, key);
    var j = 0;
    for (var i = 0; i < 256; i++) {
        var modifier = key.charCodeAt((Math.random() % key.length));
        j = (j + s[i] + key.charCodeAt(i % keyLength) + modifier) % 256;
        _a = [s[j], s[i]], s[i] = _a[0], s[j] = _a[1];
    }
    return s;
}
function vigenereEncrypt(message, key) {
    var encryptedMessage = '';
    for (var i = 0; i < message.length; i++) {
        var messageCharCode = message.charCodeAt(i);
        var keyCharCode = key.charCodeAt(i % key.length);
        var encryptedCharCode = (messageCharCode + keyCharCode) % 256;
        encryptedMessage += String.fromCharCode(encryptedCharCode);
    }
    return encryptedMessage;
}
function generateStreamModified(key, messageLength) {
    var _a;
    var sBox = initializeSBoxModified(key);
    var i = 0;
    var j = 0;
    var stream = [];
    for (var k = 0; k < messageLength; k++) {
        i = (i + 1) % 256;
        j = (j + sBox[i]) % 256;
        _a = [sBox[j], sBox[i]], sBox[i] = _a[0], sBox[j] = _a[1];
        var streamModifier = key.charCodeAt((Math.random() % key.length));
        var t = (sBox[i] + sBox[j] + streamModifier) % 256;
        var pseudoRandomByte = sBox[t];
        stream.push(pseudoRandomByte);
    }
    return stream;
}
function rc4EncryptModified(message, key) {
    var stream = generateStreamModified(key, message.length);
    var encryptedMessage = '';
    for (var i = 0; i < message.length; i++) {
        var encryptedByte = message.charCodeAt(i) ^ stream[i];
        encryptedMessage += String.fromCharCode(encryptedByte);
    }
    return encryptedMessage;
}
exports.rc4EncryptModified = rc4EncryptModified;
/* function rc4DecryptModified(encryptedMessage: string, key: string): string {
    const stream = generateStream(key, encryptedMessage.length);
    let decryptedMessage = '';

    for (let i = 0; i < encryptedMessage.length; i++) {
        const decryptedByte = encryptedMessage.charCodeAt(i) ^ stream[i];
        decryptedMessage += String.fromCharCode(decryptedByte);
    }

    return decryptedMessage;
} */
// Example usage:
var Amessage = "never gonna give you up";
var Akey = "never gonna let you down";
var Aencrypted = rc4EncryptModified(Amessage, Akey);
console.log("Encrypted:", Aencrypted);
var Adecrypted = rc4EncryptModified(Aencrypted, Akey);
console.log("Decrypted:", Adecrypted);

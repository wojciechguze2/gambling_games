const CryptoJS = require("crypto-js");

export function encodeRequestValue(unEncryptedValue) {
    return CryptoJS.AES.encrypt(
        unEncryptedValue,
        process.env.REACT_APP_PASSPHRASE_SECRET
    ).toString()
}

export function decodeRequestValue(initiallyEncryptedValue) {
    return CryptoJS.AES.decrypt(
        initiallyEncryptedValue,
        process.env.REACT_APP_PASSPHRASE_SECRET
    ).toString(CryptoJS.enc.Utf8)
}
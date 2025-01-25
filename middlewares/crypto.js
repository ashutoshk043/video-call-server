const CryptoJS = require("crypto-js");

/**
 * Decode (Decrypt) Middleware
 */
const decode = async (req, res, next) => {
  try {
    const { encData } = req.body;

    if (!encData) {
      return res.status(400).json({ message: "Encrypted data is missing" });
    }

    const bytes = CryptoJS.AES.decrypt(encData, process.env.CRYPTO_SECRET_KEY);

    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    req.body = decryptedData;

    next();
  } catch (error) {
    console.error("Decryption Error:", error.message);
    res.status(400).json({ message: "Invalid encrypted data" });
  }
};

/**
 * Encode (Encrypt) Middleware
 */
const encode = async (data) => {
  try {

    if (!data) {
      return res.status(400).json({ message: "Data to encrypt is missing" });
    }

    return ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.CRYPTO_SECRET_KEY).toString();
  } catch (error) {
    console.error("Encryption Error:", error.message);
  }
};

module.exports = { encode, decode };

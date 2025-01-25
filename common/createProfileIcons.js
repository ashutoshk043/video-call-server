const jdenticon = require("jdenticon");
const fs = require("fs");
const path = require("path");

/**
 * Generates a Jdenticon icon and saves it to a specified file.
 * @param {string} value - The value to generate the icon for (e.g., a username, email).
 * @param {number} size - The size of the icon in pixels.
 * @param {string} filePath - The file path where the icon will be saved.
 * @returns {string} - The absolute path of the generated icon.
 */
const generateIcon = (value, size, filePath) => {
  try {
    const iconPng = jdenticon.toPng(value, size);
    const absolutePath = path.resolve(filePath);
    fs.writeFileSync(absolutePath, iconPng);
    console.log(`Icon successfully generated at: ${absolutePath}`);
    return absolutePath;
  } catch (error) {
    console.error("Error generating Jdenticon icon:", error.message);
    throw error;
  }
};

module.exports = { generateIcon };

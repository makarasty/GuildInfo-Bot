const ModifierReplacer = require('./ModifierReplacer.js')

/**
 * @param {object[]} modArray
 * @param {string} pattern
 */
async function ModifierModString(modArray, pattern) {
	const combinedMods = Object.assign({}, ...modArray);

	return ModifierReplacer(pattern, combinedMods)
}

module.exports = ModifierModString
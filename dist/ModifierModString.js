const ModifierReplacer = require('./ModifierReplacer.js')

/**
 * @param {object[]} modArray
 * @param {string} pattern
 */
function ModifierModString(modArray, pattern) {
	return ModifierReplacer(pattern, Object.assign({}, ...modArray));
}

module.exports = ModifierModString
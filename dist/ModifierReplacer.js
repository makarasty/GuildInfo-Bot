const EscapeRegExp = require('./Utils/EscapeRegExp.js')

/**
 * @param {string} str
 * @param {Object<string, any>} object
 */
function ModifierReplacer(str, object) {
	const regexp = new RegExp(Object.keys(object).map(EscapeRegExp).join('|'), 'g');

	return str.replace(regexp, match => object[match]);
}

module.exports = ModifierReplacer
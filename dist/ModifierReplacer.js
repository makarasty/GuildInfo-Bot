const EscapeRegExp = require('./Utils/EscapeRegExp.js')

/**
 * @param {string} str
 * @param {Object<string, any>} object
 */
function ModifierReplacer(str, object) {
	const objectKeys = Object.keys(object)
	const escapedObjectKeys = objectKeys.map(EscapeRegExp)
	const joinedObjectString = escapedObjectKeys.join('|')

	const regexp = new RegExp(joinedObjectString, 'g')

	const outString = str.replace(regexp, (substring, p1, p2) => {
		return object[substring]
	})

	return outString
}

module.exports = ModifierReplacer
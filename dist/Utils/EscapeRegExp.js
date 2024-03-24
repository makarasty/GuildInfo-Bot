/**
 * @param {string} string 
 * @returns {string}
 */
function EscapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = EscapeRegExp
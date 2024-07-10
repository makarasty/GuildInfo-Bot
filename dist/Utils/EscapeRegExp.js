/**
 * @param {string} string
 */
function EscapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = EscapeRegExp
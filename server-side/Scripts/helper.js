function copy(object) {
	return JSON.parse(JSON.stringify(object));
}

module.exports = {
	copy
}
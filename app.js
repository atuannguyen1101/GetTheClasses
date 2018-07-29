const _serviceHelper = require('./Scripts/serviceHelper.js');

async function test() {
	var result = await _serviceHelper.readSpecific('/val1', 'val3', '456');
	console.log(result);
}

test();
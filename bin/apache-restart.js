#!/usr/bin/env node

var program = require('commander');
var restartApache = require('../index');
var pkg = require('../package.json');

program
	.version(process.env.npm_package_version || pkg.version)
	.option('-h --hard', 'no graceful restart', false)
	.option('-v --verbose', 'print activity-logs to console', false)
	.parse(process.argv);

var options = {
	graceful: !program.hard,
	verbose: program.verbose
};

(async () => {
	try {
		const result = await restartApache(options);
		if (options && options.verbose) {
			console.debug(result);
		}
	} catch(err) {
		console.error('Error: ' + err.message);
		process.exit(-1);
	}
})();

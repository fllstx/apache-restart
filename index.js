const restartHttpd = require('./src/httpd');
const restartApacheCtl = require('./src/apachectl');
const restartService = require('./src/service');
const restartSystemCtl = require('./src/systemctl');

var log = {
	log: () => {},
	debug: () => {},
	warn: () => {},
	error: () => {}
};

// TODO:
// /etc/init.d/apache2 restart
// xampp support

async function runUntilFirstResolves(asyncFunctions, options) {
	let results = [];
	let errors = [];
	for (f of asyncFunctions) {
		try {
			const result = await f(options);
			results.push(result);
			log.debug(result);
			return resolve(results);
		} catch(err) {
			log.error(err.message);
			errors.push(err);
			continue;
		}
	}
	throw new Error(`could not restart apache`);
}

async function restartApache(options = {}) {
	if (options.verbose) log = console;

	return await runUntilFirstResolves([
		restartApacheCtl,
		restartSystemCtl,
		restartService,
		restartHttpd
	], options);
}

module.exports = restartApache;
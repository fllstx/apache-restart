const exec = require('./async/exec');
const which = require('./async/which');

/**
 * httpd -k restart
 * httpd -k graceful
 */
async function restartHttpd(options) {
	let httpdPath = 'httpd';
	try {
		httpdPath = await which('httpd')
	} catch(err) {
		let errMsg = `"httpd" command not found` + (options.verbose ? `: ${err}` : '');
		throw new Error(errMsg);
	}
	
	try {
		const cmd = `${httpdPath} -k ${options.graceful ? 'graceful' : 'restart'}`;
		return await exec(cmd);
	} catch(err) {
		throw new Error(`"${cmd}" retuned error: ${stderr}`);
	}
}

module.exports = restartHttpd;
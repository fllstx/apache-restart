const exec = require('./async/exec');
const which = require('./async/which');

/**
 * apachectl -k graceful
 * apachectl -k restart
 */
async function restartApacheCtl(options) {
	let apachectlPath = 'apachectl';
	try {
		apachectlPath = await which('apachectl');
	} catch(err) {
		let errMsg = `"apachectl" command not found` + (options.verbose ? `: ${err}` : '');
		throw new Error(errMsg);
	}
	
	try {
		const cmd = `${apachectlPath} -k ${options.graceful ? 'graceful' : 'restart'}`;
		return await exec(cmd);
	} catch(err) {
		throw new Error(`"${cmd}" retuned error: ${stderr}`);
	}
}

module.exports = restartApacheCtl;
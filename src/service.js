const exec = require('./async/exec');
const which = require('./async/which');

const SERVICES = ['apache2', 'httpd', 'http'];

/**
 * service --status-all
 * service http restart
 * service httpd restart
 * service apache2 restart
 */
async function restartApacheCtl(options) {
	try {
		await which('service');
	} catch(err) {
		let errMsg = `"service" command not found` + (options.verbose ? `: ${err}` : '');
		throw new Error(errMsg);
	}
	
	let services = '';
	try {
		const cmd = `service --status-all`;
		services = await exec(cmd);
	} catch(err) {
		throw new Error(`"${cmd}" retuned error: ${stderr}`);
	}

	for (let service of SERVICES) {
		if (services.includes(` ${service}`)) {
			const cmd = `service ${service} restart`;
			try {
				return await exec(cmd);
			} catch(err) {
				throw new Error(`"${cmd}" retuned error: ${err}`);
			}
		}
	}
	throw new Error('service: no apache service found');
}

module.exports = restartApacheCtl;
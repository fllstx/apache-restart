const exec = require('./async/exec');
const which = require('./async/which');

const SERVICES = ['apache2', 'httpd'];

/**
 * systemctl restart apache2.service
 * systemctl restart apache2
 * systemctl restart httpd.service
 * systemctl restart httpd
 * systemctl reload httpd
 */
async function restartSystemctl(options) {
	try {
		await which('systemctl');
	} catch(err) {
		let errMsg = `"systemctl" command not found` + (options.verbose ? `: ${err}` : '');
		throw new Error(errMsg);
	}
	
	let services = '';
	try {
		const cmd = `systemctl list-units --state=running`;
		services = await exec(cmd);
	} catch(err) {
		throw new Error(`"${cmd}" retuned error: ${stderr}`);
	}

	for (let service of SERVICES) {
		if (services.includes(`${service}.service `) || services.includes(`${service} `)) {
			const cmd = `systemctl ${options.graceful ? 'reload' : 'restart'} ${service}`;
			try {
				return await exec(cmd);
			} catch(err) {
				throw new Error(`"${cmd}" retuned error: ${err}`);
			}
		}
	}
	throw new Error('systemctl: no apache service found');
}

module.exports = restartSystemctl;
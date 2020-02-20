const { exec } = require("child_process");

async function asycExec(command) {
	return new Promise(function(resolve, reject) {
			exec(command, (error, stdout, stderr) => {
					if (error) {
							return reject(error);
					}
					return resolve(stdout.trim());
			});
	});
}

module.exports = asycExec;
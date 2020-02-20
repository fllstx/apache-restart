const which = require('which');

async function asycWhich(command) {
	return new Promise(function(resolve, reject) {
			which(command, (error, cmdPath) => {
					if (error) {
						return reject(error);
					}
					return resolve(cmdPath.trim());
			});
	});
}

module.exports = asycWhich;
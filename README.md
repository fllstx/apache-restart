# apache-restart

Restart the local apache webserver daemon.

***This is a UNTESTED beta release! Please use with caution!***

***Feel free to open github issues and help with the implmentation!***

## Setup

```sh
npm install apache-restart
```

## Usage cli

```sh
apache-restart --hard --verbose
```

## Usage node

```js
const restartApache = require('apache-restart');

try {
	await restartApache();
} catch(err) {
	console.error('Error restarting apache:', err);
}
```


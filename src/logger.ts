"use strict";

export default {
	log(message, ...optionalParams) {
		const now = new Date();
		console.log(`${now.toISOString()} — ${message}`, ...optionalParams);
	},
	error(message, ...optionalParams) {
		const now = new Date();
		console.error(`${now.toISOString()} — ${message}`, ...optionalParams);
	},
};
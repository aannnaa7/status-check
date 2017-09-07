const client = require('../redis');

module.exports = (key) => {
	return new Promise((resolve, reject) => {
	    client().hget("subscribers",key, (error, subscribers) => {
	        if (error) {
	            reject(err);
	            return;
	        }
	        resolve(subscribers);
	    });
	});
}
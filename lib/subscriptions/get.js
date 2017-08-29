const client = require('../redis');

<<<<<<< HEAD
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
=======
module.exports = () => {
    return new Promise((resolve, reject) => {
        client().hmget()
    });
>>>>>>> bbe0a1951f3e3cab18f488aec40d5231fbe4279e
}
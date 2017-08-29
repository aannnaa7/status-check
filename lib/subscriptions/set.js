const client = require('../redis');

module.exports = (key, value) => {
    client().hset("subscribers",key, JSON.stringify(value));
};
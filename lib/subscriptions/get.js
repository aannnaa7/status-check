const client = require('../redis');

module.exports = () => {
    return new Promise((resolve, reject) => {
        client().hmget()
    });
}
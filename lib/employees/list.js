const client = require('../redis');

module.exports = () => {
    return new Promise((resolve, reject) => {
        client().get('employees', (error, employees) => {
            if (error) {
                reject(err);
                return;
            }
            resolve(employees);
        });
    });
};
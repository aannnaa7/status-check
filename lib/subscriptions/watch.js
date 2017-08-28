const client = require('../redis');
const employees = require('../employees');

module.exports = () => {
    setInterval(async () => {
        try {
            let list = await employees.fetch();
            client().set('employees', JSON.stringify(list));
            console.log('Refreshed the employees list');
        } catch(e) {
            console.log('Unable to refresh the employees list');
        }
    }, 10000);
};

const express = require('express');
const client = require('./lib/redis');
const page = require('./lib/page');
const employees = require('./lib/employees');
const subscriptions = require('./lib/subscriptions');

const app = express();

app.get('/', async (req, res, next) => {
    res.end(page());
});

app.get('/api/staff', async (req, res, next) => {
    try {
        res.end(await employees.list());
    } catch (e) {
        res.end('something went wrong: \n', JSON.stringify(e))
    }
});

app.get('/api/subscriptions/:subscription', () => {
    //
});

app.put('/api/subscriptions/:subscription', () => {
    //
});

app.post('/api/subscriptions', () => {
    //
});

app.use(express.static('public'));

async function start() {
    let list = await employees.fetch();
    client().set('employees', JSON.stringify(list));
}

start()
    .then(() => {
        app.listen(process.env.PORT || 8080, () => {
            console.log('Listening on port ' + (process.env.PORT || 8080));
            subscriptions.watch();
        });
    })
    .catch(e => {
        console.error('cannot start server: ', e);
    });

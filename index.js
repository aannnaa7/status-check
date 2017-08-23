const express = require('express'),
      redis = require('redis'),
      indexHtml = require('./lib/page'),
      fetchEmployees = require('./lib/fetcher');

const app = express();

const client = redis.createClient('6379', 'redis');

app.get('/', async (req, res, next) => {
    res.end(indexHtml());
});

app.get('/api/staff', async (req, res, next) => {
    try {
        client.get('employees', (err, employees) => {
            res.end(employees);
        });
    } catch (e) {
        res.end('something went wrong: \n', JSON.stringify(e))
    }
});

app.use(express.static('public'));

async function start() {
    let employees = await fetchEmployees();
    client.set('employees', JSON.stringify(employees));
}

start()
    .then(() => {
        app.listen(process.env.PORT || 8080, () => {
            console.log('Listening on port ' + (process.env.PORT || 8080));
        });
    })
    .catch(e => {
        console.error('cannot start server: ', e);
    });

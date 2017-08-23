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
        let employees = await fetchEmployees();
        res.end(JSON.stringify(employees));
    } catch (e) {
        res.end('something went wrong: \n', JSON.stringify(e))
    }
});

app.use(express.static('public'));

app.listen(process.env.PORT || 8080, () => {
    console.log('Listening on port ' + (process.env.PORT || 8080));
});

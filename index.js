var express = require('express'),
    http = require('http'),
    redis = require('redis'),
    staff = require('./lib/staff');

var app = express();

var client = redis.createClient('6379', 'redis');

app.get('/api/staff', (req, res, next) => {
  res.end(JSON.stringify(staff));
});

app.use(express.static('public'));

app.listen(process.env.PORT || 8080, () => {
  console.log('Listening on port ' + (process.env.PORT || 8080));
});

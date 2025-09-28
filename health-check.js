const http = require('http');

const options = {
  hostname: 'localhost',
  port: process.env.PORT || 5678,
  path: '/healthz',
  method: 'GET',
  timeout: 3000
};

const request = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', (err) => {
  console.error('HEALTH CHECK ERROR:', err);
  process.exit(1);
});

request.on('timeout', () => {
  console.error('HEALTH CHECK TIMEOUT');
  request.destroy();
  process.exit(1);
});

request.end();

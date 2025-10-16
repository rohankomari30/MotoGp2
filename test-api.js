const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/teams',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const teams = JSON.parse(data);
      console.log('Teams in database:');
      teams.forEach(team => {
        console.log(`${team.name}: ${team.logo}`);
      });
    } catch (e) {
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.end();

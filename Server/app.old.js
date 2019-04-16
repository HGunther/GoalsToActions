const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
  const {
    headers,
    method,
    url
  } = request;

  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {}).on('end', () => {

    response.on('error', (err) => {
      console.error(err);
    });

    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');

    response.write("Hello world!");
    response.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
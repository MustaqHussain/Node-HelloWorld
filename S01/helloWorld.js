var http = require('http');
// Create a server
http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
}).listen(1337, '127.0.0.1');

// 127.0.0.1 always the address of your local machine (same as localhost)
// 1337      port where this app is listening (can be any free port)
console.log('Server running at http://127.0.0.1:1337/');

var http = require('http');

http.createServer(function (req, res) {

  if (req.url === '/favicon.ico') {
    return res.end();
  }

  console.log('.');
  console.log('A. Enter node app - Single thread');

  console.log('B. Make DB call - Non blocking');
  // Simulate DB taking 8s
  setTimeout( () => {
      console.log('Z. New Event Back from DB - callback returned');

      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('BACK FROM DB');
  }, 8000);

  console.log('C. Doing some other processing on this thread');
  console.log('D. Bye leaving node app - Event loop ready to process other events ');
  console.log('.');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
var http = require('http');

http.createServer(function (req, res) {

  if (req.url === '/favicon.ico') {
    return res.end();
  }

  console.log('.');
  console.log('A. Enter node app - Single thread');

  console.log('B. Make DB call - blocking');

  // Simulate DB taking 8s
  var start = new Date().getTime(); 
  while (new Date().getTime() < start + 8000);

  console.log('C. Back from DB - unblocked');
  console.log('D. Doing some other processing on this thread');

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('BACK FROM DB');

  console.log('E. Bye leaving node app - Event loop ready to process other events ');


  console.log('.');

}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
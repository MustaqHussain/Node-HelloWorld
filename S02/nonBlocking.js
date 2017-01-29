var http = require('http');

http.createServer(function (req, res) {

  if (req.url === '/favicon.ico') {
    return res.end();
  }

  console.log('.');
  console.log('A. Enter node app - Single thread');

  console.log('B. Make DB call - Non blocking');
  
  // Simulate DB taking 8s
  setTimeout( function resultsFromDB () {
      console.log('Z. >>>> DB results returned (callback called) process results now');
      var user = 'Andy Admin';
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('DB Results');
      res.write('<H1>Hello ' + user + '</H1>');
      res.end();
  }, 8000);

  console.log('C. Line after DB call - not blocked');
  console.log('D. Bye leaving node app - Event loop ready to process other events ');
  console.log('.');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
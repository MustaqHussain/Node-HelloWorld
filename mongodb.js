var mongodb = require('mongodb').MongoClient;
var http = require('http');

var url = 'mongodb://localhost:27017/libraryApp';

http.createServer(function (req, res) {

    if (req.url === '/favicon.ico') {
       return res.end();
    }
    
    if (req.url === '/') {
        console.log('BEFORE mongodb.connect with Callback 1');
        mongodb.connect(url, function (err, db) {
            console.log('INSIDE mongodb.connect: Callback 1:');

            if ( err ) {
                console.log('Error connecting to mongoDB', err);        
                console.log('');        
                return;        
            }
            // Connected to DB
            var collection = db.collection('books');

            console.log('BEFORE collection.find with Callback 2:');
            collection.find({title: 'War and Peace'}).toArray(function (err, docs) {
                console.log('INSIDE collection.find: Callback 2: ');
                console.log(docs);
                db.close();
                // Response OK write to browser
                res.writeHead(200, { 'Content-Type': 'text/html' });    
                res.end('<H1>'+docs[0].title+'</H1>');
            });
            console.log('END collection.find: ');
            
        });
        console.log('END mongodb.connect');
    } else {
        mongodb.connect(url, function (err, db) {
            //var collection = db.collection('books');
            db.collection('books').find({genre: 'Fantasy'}).toArray(function (err, docs) {
                console.log(docs);
                db.close();
                res.writeHead(200, { 'Content-Type': 'text/html' });    
                res.end(docs[0].title);
            });
        });
    }

}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
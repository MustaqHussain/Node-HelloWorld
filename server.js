var express = require('express'); 
var app = express();

var mongodb = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/libraryApp';


app.get('/', (req, res) => {
	res.send('<h1>HOME page TODO</h1>') 
});

app.get('/login', (req, res) => { 
	res.send('<h1>Login page TODO</h1>') 
});


app.get('/allBooks', (req,res) => {
	mongodb.connect(url, (err, db) => {
		if ( err ) {
			console.log('Error connecting to mongoDB', err);
			return;
		}
		// Connected to DB
		var collection = db.collection('books');

		collection.find()
			.toArray((err, docs) => {
			console.log(docs);
			db.close();

			// Response OK write to browser
			res.writeHead(200, { 'Content-Type': 'text/html' });
			var resText = '';
			for (i=0; i <docs.length; i++) {
				resText = resText + '<h1>' + docs[i].title + '</h1>';
			}
			res.end(resText);
		});
	});

});

app.get('/allGenre/:genreName', (req,res) => {
	mongodb.connect(url, (err, db) => {
		if ( err ) {
			console.log('Error connecting to mongoDB', err);
			return;
		}
		// Connected to DB
		var collection = db.collection('books');

		collection.find({genre: {$regex:req.params.genreName}})
			.toArray((err, docs) => {
			console.log(docs);
			db.close();

			// Response OK write to browser
			res.writeHead(200, { 'Content-Type': 'text/html' });
			var html = '';
			for (i=0; i <docs.length; i++) {
				html = html + '<h1>' + docs[i].title + '</h1>';
			}
			res.end(html);
		});
	});
});

app.listen(3000, () => { 
	console.log('listening on 3000');
});

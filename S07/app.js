var  http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});

var express = require('express'); 
var app = express();

var mongodb = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/libraryApp';

// Where to find images and web pages
app.use(express.static('app'));
app.set('views', __dirname + '/app/views');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app/views/index.html');
});

app.get('/allBooks', (req,res) => {
	mongodb.connect(url, (err, db) => {
		if ( err ) {
			console.log("Error connecting to mongoDB", err);
			return;
		}
		// Connected to DB
		var collection = db.collection('books');

		collection.find()
			.toArray((err, docs) => {
			//console.log(docs);
			db.close();
			res.json(docs);
		});
	});
});

app.get('/book/:id', (req,res) => {
	mongodb.connect(url, (err, db) => {
		if ( err ) {
			console.log('Error connecting to mongoDB', err);
			return;
		}
		// Connected to DB
		var collection = db.collection('books');

		var id = req.params.id;
		collection.find({bookId: +id})  //note '+id'
			.toArray((err, docs) => {
			//console.log(docs);
			db.close();

			// login details & query to Goodreads
			var options = {
				host: 'www.goodreads.com',
				path: '/book/show/'+id+'?format=xml&key=mN1DyVoFS4cfbCMh5HmnpA'
			};

			// make a http request
			http.request(options, (response) => {
				// Continuosuly update str with data
				var str = '';
				response.on('data', (chunk) => {
					str += chunk;
				});

				response.on('end', () => {
					// Returned str in xml format, convert to JSON
					parser.parseString(str,	(err, jsonResult) => {
						// Add results to docs (from database)
						docs[0].description = jsonResult.GoodreadsResponse.book.description;
						docs[0].image_url = jsonResult.GoodreadsResponse.book.image_url;
						res.json(docs);
					});
				});
			}).end();
		});
	});
});

app.listen(3000, () => { 
	console.log('listening on 3000');
});
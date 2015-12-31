var express=require('express');
var session = require('express-session');
var app=express();
var mysql=require('mysql');
var bodyParser=require('body-parser');
var config = {
	user: 'root',
	password: 'root',
  server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
  database: 'travelcamp'
};
app.use(session({secret: 'superdupersecret', saveUninitialized: true, resave: true}));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname+"/static_files"));
app.set('views',__dirname + '/views/html');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var connection = mysql.createConnection(config);
var sessionVar;
var bookCount = 0;
connection.connect();
app.get('/', function(req, res) {
  //res.send('Hello Seattle\n');
  res.render('index.html');
});
app.post('/getCities', function(req,res){
	console.log(req.body);
  var textEntered = req.body.sentText;
	var query = connection.query('SELECT * from travel_cities where city_name like "%' + textEntered + '%"',function(err, rows, fields){
    if (err) {
      console.error(err);
    }
    var data=[];
    for(i=0;i<rows.length;i++)
    {
			var cityNames = {
				"city": rows[i].city_name
			};
			data.push(cityNames);
    }
    res.send(JSON.stringify(data));
	});
});
app.listen(3001);
console.log('Listening on port 3001...');

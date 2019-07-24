var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyparser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 7870);
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get('/', function(req, res)
{
	var param = [];
	 for(var key in req.query)
	 	param.push({'name': key, 'value': req.query[key]});

	 var context = {};
	 context.list = param;
	 context.type = "GET";

	 res.render("handler", context);

});

app.post('/', function(req, res)
{
	var param = [];
	 for(var key2 in req.body)
	 	param.push({'name': key2, 'value': req.body[key2]});

	 var context = {};
	 context.list = param;
	 context.type = "POST";

	 res.render('handler', context);
});

app.use(function(req, res)
{
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next)
{
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function()
{
	console.log("Express started on http://flip2.engr.oregonstate.edu:" + app.get('port') + '; press Ctrl-C to terminate.');
});

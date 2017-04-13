/*===========================DEPENDENCIES==================================*/
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var logger = require("morgan");
var mongoose = require("mongoose");
// Requiring the Note and News models
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

// Morgan and body-parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("app/public"));

/*=============================HANDLEBARS=======================================*/
//setup handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//require html routes
require('./routing/htmlRoutes.js')(app);


app.listen(PORT, function(){
  console.log('listening on http://localhost:' + PORT);
});

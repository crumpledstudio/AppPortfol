var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var path = require('path');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
const exphbs = require('express-handlebars');
const config = require('./config/secret');


var routesLanding = require('./routes/landing');
var routesIndex = require('./routes/index');
var routesLogin = require('./routes/login');
var routesRegister = require('./routes/register');
var routesDashboard = require('./routes/dashboard');
var routesTeste = require('./routes/tester');
var routesSample = require('./routes/sample.js');
var routesPages = require('./routes/pages.js');
var routesTempdash = require('./routes/tempdash.js');


/*
    // Novos Routes
*/
var routesSearch = require('./routes/pagesearch.js');
var routesMarket = require('./routes/pagemarket.js');
var routesNegoc = require('./routes/negoc.js');
var users = require('./routes/users');
var offers = require('./routes/offers');
var user = require('./routes/user');


var app = express();
var http = require('http').Server(app);
/*
    // ROUTES
*/
app.use('/', routesLanding);
app.use('/index', routesIndex);
app.use('/login', routesLogin);
app.use('/register', routesRegister);
app.use('/dashboard', routesDashboard);
app.use('/teste', routesTeste);
app.use('/sample', routesSample);
app.use('/pages', routesPages);
app.use('/temp', routesTempdash);

app.use('/search', routesSearch);
app.use('/market', routesMarket);
app.use('/negociacoes', routesNegoc);

app.use('/users', users);
app.use('/user', user);
app.use('/offers', offers);

//mongoose.connect('mongodb://localhost/templatedb');
//app.set('port', (process.env.PORT || 3000));



/*======= Engine =====*/
app.engine('handlebars', exphbs({
    extname: '.handlebars',    //.hbs
    defaultLayout: 'intro'
}));
//app.set('view engine', '.hbs');
app.set('view engine', 'handlebars');
/*==========*/

// Set public folder
//app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
/* 
app.use(express.static(path.join(__dirname, 'public')));
*/

// Middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*
    // ROUTES

app.use('/landing', routesLanding);
app.use('/', routesIndex);
app.use('/login', routesLogin);
app.use('/register', routesRegister);

*/

app.use(session({
    secret: 'mytestkey',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));


console.log("TESTE")


/*
app.get('/', function(req, res, next){
    res.render('home', {
        message: "Hello World",
        subheading: "Hello from express JS"
    });
});
*/

/*
app.listen(3000, function(){
    console.log('Listening on port 3000');
});
*/
http.listen(config.port, (err) => {
  if (err) console.log(err);
  console.log(`Running on port ${config.port}`);
});

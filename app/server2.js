var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var Handlebars = require("handlebars");
var breadcrumbs = require('express-seo-breadcrumbs');


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

// Init App
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'layout2' }));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    cookie: 'test'
}));

app.use(breadcrumbs.init());

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

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
app.use('/user', user)
app.use('/offers', offers);

// Set Port
app.set('port', (process.env.PORT || 3001));

http.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'));
});

io.on('connection', function(socket) {
    socket.on('disconnect', function() {});
});

io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
});


Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});


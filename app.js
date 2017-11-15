var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engine = require('ejs-locals');
var http = require('http');
var manifest = require('cache-manifest-generator');
var configure = require('./configure');
var app = express();

const ServerPort = '3001';

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
// app.use(logger('dev'));

app.set('jwt-secret', configure.secret);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/s2', require('./routes/s2'));
app.use('/api', require('./routes/api'));
app.use('/system', require('./routes/system'));

global.log = (message) => {
    console.dir(message, {
        colors: true
    });
}

global.String.prototype.toRequestID = function () {
    return this.replace("#", "-");
}

global.String.prototype.toDisplayID = function () {
    return this.replace("-", "#");
}

global.String.prototype.toShortID = function () {
    return this.replace(/(#|-).[0-9]+/i, "");
}

global.Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

global.String.prototype.format = function () {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

app.get('/cache.manifest', manifest([{
    file: 'public',
    url: '.',
    ignore: /.*test.js/
}, ]));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// /**
//  * Create HTTP server.
//  */

// var server = http.createServer(app);

// /**
//  * Listen on provided port, on all network interfaces.
//  */

// server.listen(ServerPort);
// server.on('error', onError);
// server.on('listening', onListening);

// /**
//  * Event listener for HTTP server "error" event.
//  */

// function onError(error) {
//     if (error.syscall !== 'listen') {
//         throw error;
//     }

//     var bind = typeof port === 'string' ?
//         'Pipe ' + port :
//         'Port ' + port;

//     // handle specific listen errors with friendly messages
//     switch (error.code) {
//         case 'EACCES':
//             console.error(bind + ' requires elevated privileges');
//             process.exit(1);
//             break;
//         case 'EADDRINUSE':
//             console.error(bind + ' is already in use');
//             process.exit(1);
//             break;
//         default:
//             throw error;
//     }
// }

// /**
//  * Event listener for HTTP server "listening" event.
//  */

// function onListening() {
//     var addr = server.address();
//     var bind = typeof addr === 'string' ?
//         'pipe ' + addr :
//         'port ' + addr.port;
//     console.log('Listening on ' + bind);
// }

app.locals.toShortID = function (id) {
    var regex = /(#|-).[0-9]+/i;
    return id.replace(regex, "");
}

app.locals.moment = require('moment');

app.locals.spex = require('zspex-module');
app.locals._ = require('underscore');

/*
app.locals.String.prototype.toRequestID = function () {
    return this.replace("#", "-");
}
app.locals.String.prototype.toDisplayID = function () {
    return this.replace("-", "#");
}
*/
module.exports = app;
var express = require('express');
var router = express.Router();
var OverwatchStatics = require('OverwatchStatics');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('users', {
        navigation: 'users'
    });
});

router.post('/', function (req, res, next) {
    res.render('users', {
        navigation: 'users'
    });
});


router.get('/data', function (req, res, next) {

    let start = parseInt(req.query.start);
    let end = parseInt(req.query.length);
    let draw = req.query.draw;
    let search = req.query.search.value;

    OverwatchStatics.statics.getStaticsRange(draw, start, end, search, function (err, results) {
        if (err) {
            console.dir(err, {
                colors: true
            });
            res.render('error', {
                error: err
            });
        } else {
            // console.dir(results, { colors: true });
            res.json(results);
        }
    });
});

router.get('/refreshById', function (req, res, next) {

    let user_id = req.query.id.toRequestID();

    if (user_id) {
        OverwatchStatics.statics.requestRefreshStatics(user_id, function (error, results) {
            // log(results);
            res.json(results);
        });
    }
});

router.get('/refresh', function (req, res, next) {
//    OverwatchStatics.statics.googleDocsRefresh(function (error, results) {
    OverwatchStatics.statics.databaseRefresh(function (error, results) {
        log(results);
        res.end(results);
    });
});

router.get('/history', function (req, res, next) {
    OverwatchStatics.statics.storeHistory(function (error, results) {
        //OverwatchStatics.databaseRefresh(function (error, results) {
        log(results);
        res.end(results);
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var OverwatchStatics = require('OverwatchStatics');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('poll', {
        navigation: 'poll'
    });
});

router.get('/poll_result', function (req, res, next) {
    OverwatchStatics.statics.SessionAllUserInfo(function (err, results) {
        res.render('poll/poll_result.ejs', {
            navigation: 'poll_result',
            data: results,
        });
    });
});

router.get('/data', function (req, res, next) {
    OverwatchStatics.statics.SessionAllUserInfo(function (err, results) {
        res.json(results);
    });
});

router.get('/commit', function (req, res, next) {
    log(req.query);
    let user_id = req.query.user_id.toRequestID();
    let poll_id = req.query.poll_id;
    OverwatchStatics.statics.updatePollQuery(user_id, poll_id, function (err, results) {
        if (err) res.json({
            result: 'failed'
        });
        res.json({
            result: 'success'
        });
    })

});
module.exports = router;
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('test.ejs', {
        step: 'index',
    });
});

module.exports = router;
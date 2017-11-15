var express = require('express');
var router = express.Router();

var OverwatchStatics = require('OverwatchStatics');
var async = require('async');

var spex = require('zspex-module');

var multer = require('multer');
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {

    res.render('s2/index_forkakao.ejs', {
        step: 'index',
    });

    // OverwatchStatics.scream.getCurrentDayGames()
    //     .then((data) => {
    //         res.render('team_league/index.ejs', {
    //             step: 'index',
    //             today_match: data,
    //         });
    //     });

});


// 세션과 상관없이 보여줘야하는 라우터들
router.get('/s2/signin', function (req, res, next) {
    res.render('s2/signin.ejs', {
        step: 'index',
    });
});

router.get('/s2/signup', function (req, res, next) {
    res.render('s2/signup.ejs', {
        step: 'index',
    });
});

router.get('/s2/soon', function (req, res, next) {
    res.render('s2/soon.ejs', {
        step: 'index',
    });
});

/*
router.get('/session', function (req, res, next) {

    let user_id = req.query.user_id.toRequestID();

    //사용자 아이디 확인
    if (!req.query.user_id || req.query.user_id === 'guest') {
        let response = {
            signup: true,
        }
        res.json(response);
        return;
    }
    OverwatchStatics.session.SessionUserInfo(user_id.toRequestID(), function (error, results) {
        if (error) {
            let response = {
                signup: true,
            }
            log(error);
            res.json(response);
            return;
        }
        let response = {
            signup: (results.pin) ? false : true,
            user_id: results.id.toDisplayID(),
            user_poll: results.poll,
            avatar: results.avatar,

        }
        res.json(response);
    });

});

router.get('/user_search', function (req, res, next) {
    let user_id = req.query.user_id.toRequestID();
    if (!user_id) {
        res.end();
        return;
    }
    console.log('[LOGIN SEARCH] : ' + user_id);
    spex.Member.getMember(user_id)
        .then(M => {
            let response = {
                signup: (M.account.security.password != '') ? false : true,
                user_id: M.id.toDisplayID(),
                avatar: M.account.player.icon,
            }
            res.json(response);
        }).catch(function (error) {
            let response = {
                signup: true,
            }

            spex.Member.parseOnline(user_id)
                .then(D => {
                    response.user_id = req.query.user_id;
                    response.avatar = D.profile.avatar;
                    res.json(response);

                }).catch()
        });

    // // peekaboo-31721
    // OverwatchStatics.session.SessionUserInfo(user_id)
    //     .then(function (info) {
    //         let response = {
    //             signup: (info.pin) ? false : true,
    //             user_id: info.id.toDisplayID(),
    //             avatar: info.avatar,
    //         }
    //         res.json(response);
    //     }).catch(function (err) {
    //         let response = {
    //             signup: true,
    //         }
    //         log(error);
    //         res.json(response);
    //         return;
    //     });
});

router.get('/myinfo', function (req, res, next) {
    let user_id = req.query.user_id;
    if (!user_id) {
        res.end();
        return;
    }
    OverwatchStatics.session.SessionUserInfo(user_id.toRequestID())
        .then(function (info) {
            res.render('myinfo.ejs', {
                step: 'myinfo',
                user: info,
            });
        });
});

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './tmp/upload');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});

var upload = multer({
    storage: storage
}).single('file');

router.post('/myinfo', multer({
    storage: storage
}).single('file'), function (req, res) {

    let user_id = req.body.original_user_id.toRequestID();
    let change_user_id = req.body.change_user_id.toRequestID();
    let hero = req.body.hero;

    let fname = req.body.file;
    //    log(req.file);
    if (req.file) {
        OverwatchStatics.session.SessionUserInfo(user_id)
            .then(function (u) {
                let team_id = u.team;
                let f = req.file.path;

                //            log(__dirname);

                let logo_path = path.join(__dirname, '../public/img/league/' + team_id + '.jpg');

                fs.unlink(logo_path, function (err) {
                    if (err) throw err;

                    fs.exists(f, function (exists) {
                        if (exists) {
                            fs.rename(f, logo_path, function (error) {
                                if (error) throw error;

                            });
                        }
                    });

                });

            });
    }

    OverwatchStatics.session.updateUserInfo(user_id, change_user_id, hero)
        .then(function (result) {
            return res.redirect('/myinfo?user_id=' + user_id);
        });

});

router.post('/myinfo', function (req, res, next) {
    // log(req.body);
    let user_id = req.body.original_user_id.toRequestID();
    let change_user_id = req.body.change_user_id.toRequestID();
    let hero = req.body.hero;

    OverwatchStatics.session.updateUserInfo(user_id, change_user_id, hero)
        .then(function (result) {
            return res.redirect('/myinfo?user_id=' + user_id);
        });
});

router.post('/login', function (req, res, next) {

    let user_id = req.body.user.toRequestID();
    let pin = req.body.password1;
    let pin_valid = req.body.password2;
    let save = (req.body.save == 'true');
    let signup = req.body.signup == 'true' ? true : false;

    if (signup) {
        console.log('가입 [' + user_id + ']');

        var failed = function (message) {
            let response = {
                accept: false,
                message: message
            }
            res.json(response);
        }

        if (pin_valid == '' && pin != pin_valid) {
            failed();
            return;
        }

        var M = spex.Member.createMember(user_id);
        spex.Member.parseOnline(M.id.toRequestID())
            .then(D => {
                M.account.security.password = pin;
                M.account.player.icon = D.profile.avatar;
                M.competitive.score = (D.profile.rank !== undefined && !isNaN(D.profile.rank)) ? D.profile.rank : 0;
                M.competitive.tier = D.profile.season !== undefined ? D.profile.season.rank : 0;
                M.competitive.tier_name = D.profile.ranking !== undefined ? D.profile.ranking : "";

                spex.Member.saveMember(M)
                    .then(SR => {

                        let response = {
                            accept: true,
                            info: {
                                id: SR.id,
                                icon: SR.account.player.icon,
                                level: 0
                            },
                            save: false,
                        }
                        res.json(response);
                    });

            }).catch(failed);

        // async.series([
        //         function (callback) {
        //             if (pin_valid != '' && pin == pin_valid) {

        //                 OverwatchStatics.session.SessionSignUp(user_id, pin)
        //                     .then(function (info) {
        //                         // log(info)
        //                         callback(null, info);
        //                     });

        //             } else
        //                 callback(null, results);
        //         }
        //     ],
        //     function (error, results) {
        //         log(results);
        //         let userInfo = results[0];
        //         if (userInfo.pin != pin) {
        //             let response = {
        //                 accept: false,
        //             }
        //             res.json(response);
        //             return;
        //         }
        //         log(userInfo);

        //         let response = {
        //             accept: true,
        //             user_id: userInfo.id.toDisplayID(),
        //             user_role: userInfo.role,
        //             user_team: userInfo.team,
        //             user_rank: userInfo.rank,
        //             user_avatar: userInfo.avatar,
        //             user_poll: userInfo.poll,
        //             save: save,
        //         }
        //         res.json(response);
        //     });
    } else {
        console.log('[ LOGIN ]' + user_id);
        spex.Member.getMember(user_id)
            .then(M => {
                if (M.account.security.password != pin) {
                    let response = {
                        accept: false,
                    }
                    res.json(response);
                    return;
                }

                let response = {
                    accept: true,
                    info: {
                        id: M.id.toDisplayID(),
                        icon: M.account.player.icon,
                        level: 0,
                    },
                    save: M.account.security.savepassword,
                }
                res.json(response);

            }).catch(function (err) {
                if (error) {
                    callback({
                        status: 0,
                        message: "user not found"
                    }, null);
                }
            });

        // OverwatchStatics.session.SessionUserInfo(user_id.toRequestID())
        //     .then(function (info) {
        //         if (info.pin != pin) {
        //             let response = {
        //                 accept: false,
        //             }
        //             res.json(response);
        //             return;
        //         }
        //         let response = {
        //             accept: true,
        //             user_id: info.id.toDisplayID(),
        //             user_role: info.role,
        //             user_team: info.team,
        //             user_rank: info.rank,
        //             user_avatar: info.avatar,
        //             user_poll: info.poll,
        //             save: save,
        //         }
        //         res.json(response);
        //     }).catch(function (err) {
        //         if (error) {
        //             callback({
        //                 status: 0,
        //                 message: "user not found"
        //             }, null);
        //         }
        //     })
    }
});
*/
module.exports = router;
var express = require('express');
var router = express.Router();
var OverwatchStatics = require('OverwatchStatics');
var spex = require('zspex-module');
var jsonQuery = require('json-query');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var _ = require('underscore');

var auth = require('./auth');
router.use('/', auth.authMiddleware);

router.get('/test', function (req, res, next) {
    console.dir(req.session);
    // spex.Member.getMember('ANA-12840')
    //     .then(M => {
    //         if (M.verify('1111')) {
    //             var security = req.app.get('jwt-secret');

    //             jwt.sign({
    //                 _id: M._id,
    //                 battletag: M.id,
    //             }, security, {
    //                 expiresIn: '7d',
    //                 issuer: 'spex.me',
    //                 subject: 'userInfo'
    //             }, (err, token) => {
    //                 if (err) console.log(err);
    //                 console.log(token);
    //                 res.cookie('token', token);
    //             })
    //         }
    //     })
    res.render('s2/games/manual.ejs', {
        step: 'index',
        session: req.session
    });

});

router.get('/', function (req, res, next) {
    let promises = [
        spex.Team.getAll(),
        spex.Member.getTeamMembersCount(),
        spex.Game.getAll()
    ];

    Promise.all(promises)
        .then((values) => {
            let T = values[0],
                G = spex.Summary.getRecentGame(),
                S = spex.Summary.getRank(),
                Games = values[2],
                response = {
                    teams: T,
                };

            G.game_info.red_team.info = jsonQuery('[*][teamid={0}]'.format(G.game_info.red_team.id), {
                data: T
            }).value;
            G.game_info.blue_team.info = jsonQuery('[*][teamid={0}]'.format(G.game_info.blue_team.id), {
                data: T
            }).value;

            G.dateString = moment(G.date).format('YYYY/MM/DD HH:MM:SS');

            response.recentGame = G;

            response.teams.forEach(function (el) {
                el.info.members = jsonQuery('[*][_id={0}]'.format(el.teamid), {
                    data: values[1]
                }).value.total;

                el.info.score = jsonQuery('[*][id={0}]'.format(el.teamid), {
                    data: S
                }).value;

            });

            response.teams.sort(function (a, b) {
                return a.info.score.rank - b.info.score.rank;
            });

            Games.forEach(function (elmt, index) {
                gdate = moment(elmt.date);

                elmt.game_info.red_team.info = jsonQuery('[*][teamid={0}]'.format(elmt.game_info.red_team.id), {
                    data: T
                }).value;
                elmt.game_info.blue_team.info = jsonQuery('[*][teamid={0}]'.format(elmt.game_info.blue_team.id), {
                    data: T
                }).value;

                elmt.dateString = moment(elmt.date).format('YYYY/MM/DD HH:MM:SS');
            });

            response.games = Games;


            res.render('s2/sample.ejs', {
                step: 'index',
                pdata: response,
                session: req.session
            });
        });

});


router.post('/teaminfo/:teamid', function (req, res, next) {

    if (req.params.teamid === undefined || isNaN(req.params.teamid)) {
        console.log('err');
        return;
    }
    let teamid = req.params.teamid;
    let id = req.body.id.toRequestID();
    let season = req.body.season;
    spex.Member.getMember(id)
        .then(M => {

            // fcm message send to teamleader
            var request = require('request');
            request.post({
                    url: 'http://spex.me/system/fcm/teamjoin',
                    form: {
                        id: M.id,
                        team_id: teamid,
                    }
                },
                function (err, httpResponse, body) {
                    if (err) {
                        console.error('failed {0}'.format(err));
                    }
                    console.log('sended fcm entry register message');
                }
            );

            M.league.s02.team = teamid;
            M.league.s02.accepted = false;
            spex.Member.saveMember(M)
                .then(SR => {
                    // console.dir(SR);
                    res.redirect('/s2/teaminfo/' + teamid);
                });
        });

});

router.get('/teamlist', function (req, res, next) {

    let promises = [
        spex.Team.getAll(),
        spex.Member.getTeamMembersCount(),
    ];

    Promise.all(promises)
        .then((values) => {
            let T = values[0],
                S = spex.Summary.getRank(),
                response = {
                    teams: T,
                };


            response.teams.forEach(function (el) {
                el.info.members = jsonQuery('[*][_id={0}]'.format(el.teamid), {
                    data: values[1]
                }).value.total;

                el.info.score = jsonQuery('[*][id={0}]'.format(el.teamid), {
                    data: S
                }).value;

            });

            response.teams.sort(function (a, b) {
                return a.info.score.rank - b.info.score.rank;
            });

            res.render('s2/team/team_listview.ejs', {
                step: 'index',
                info: response,
                session: req.session
            });

        });

});

router.get('/teaminfo/:teamid', function (req, res, next) {

    if (req.params.teamid === undefined || isNaN(req.params.teamid)) {
        // console.log('err');
        return;
    }

    let teamid = req.params.teamid;

    let promises = [
        // OverwatchStatics.scream.getLeagueTeamMemberView(teamid),
        spex.Member.getTeamMembers(teamid),
        spex.Team.get(teamid),
    ];

    Promise.all(promises)
        .then((values) => {

            let summary = {
                avg_score: 0,
                avg_max_score: 0,
                tier: {
                    GrandMaster: 0,
                    Master: 0,
                    Diamond: 0,
                    Platinum: 0,
                    Gold: 0,
                    Silver: 0,
                    Bronze: 0,
                }
            }
            // 팀 요약정보
            let summary_cnt = 0;
            values[0].forEach(function (element) {
                if (element.competitive.tier_name != '') {
                    summary.avg_score += element.competitive.score;
                    summary.tier[element.competitive.tier_name]++;
                    summary_cnt++;
                }
                summary.avg_max_score += isNaN(element.competitive.max_score) ? 0 : element.competitive.max_score;
            });
            summary.avg_score = Math.round(summary.avg_score / summary_cnt);
            summary.avg_max_score = Math.round(summary.avg_max_score / values[0].length);

            let response = {
                members: values[0],
                team: {
                    info: values[1],
                    summary: summary
                },

            }
            res.render('s2/team/teaminfo.ejs', {
                step: 'index',
                info: response,
                session: req.session
            });
        })
        .catch(console.error);
});


router.get('/stream', function (req, res, next) {
    let promises = [
        spex.Team.getAll(),
        spex.Game.getStreamAll()
    ];
    Promise.all(promises)
        .then((values) => {
            let T = values[0],
                G = values[1],
                response = [];

            G.forEach(function (elmt, index) {
                elmt.game_info.red_team.info = jsonQuery('[*][teamid={0}]'.format(elmt.game_info.red_team.id), {
                    data: T
                }).value;
                elmt.game_info.blue_team.info = jsonQuery('[*][teamid={0}]'.format(elmt.game_info.blue_team.id), {
                    data: T
                }).value;

                elmt.dateString = moment(elmt.date).format('YYYY/MM/DD HH:MM:SS');
            });

            res.render('s2/games/competitive.ejs', {
                step: 'index',
                info: G,
                team_info: T,
                session: req.session
            });
        })
        .catch(console.error);

});

router.get('/search/:query', function (req, res, next) {

    let {
        query
    } = req.params;

    res.render('s2/search/search.ejs', {
        step: 'index',
        session: req.session
    });
});

router.get('/games', function (req, res, next) {

    let week = req.query.week;
    // let 

    let promises = [
        spex.Team.getAll(),
        spex.Game.getNotExpiredAll()
        // spex.Game.getNotExpiredAll('2017-09-11', '2017-09-30', 13)
    ];
    Promise.all(promises)
        .then((values) => {
            let T = values[0],
                G = values[1],
                response = [];
            G.forEach(function (elmt, index) {
                gdate = moment(elmt.date);
                // console.log('{0}  - {1}'.format(gdate.format('YY.MM.DD'), gdate.format('ww')))

                elmt.game_info.red_team.info = jsonQuery('[*][teamid={0}]'.format(elmt.game_info.red_team.id), {
                    data: T
                }).value;
                elmt.game_info.blue_team.info = jsonQuery('[*][teamid={0}]'.format(elmt.game_info.blue_team.id), {
                    data: T
                }).value;

                elmt.dateString = moment(elmt.date).format('YYYY/MM/DD HH:MM:SS');
            });

            res.render('s2/games/games.ejs', {
                step: 'index',
                info: G,
                team_info: T,
                session: req.session
            });
        })
        .catch(console.error);

});


router.post('/games', function (req, res, next) {

    let date = req.body.date;
    let time = req.body.time;

    if ((/^\s*$/).test(date) || (/^\s*$/).test(time)) {
        res.json({
            success: false,
            message: '날짜/시간이 올바르지 않습니다.',
            session: req.session
        });
    }


    // var momentDate = moment('{0} {1}:00'.format(date, time), 'YYYY/MM/DD HH:mm:ss');
    // let dtime = momentDate.toDate();
    let dtime = new Date('{0} {1}'.format(date, time));
    console.log(dtime);


    spex.Game.create()
        .then(function (D) {
            D.date = dtime;
            D.expired = false;
            D.game_info.red_team.teamid = 1;
            D.game_info.blue_team.teamid = 2;
            spex.Game.save(D)
                .then(G => {
                    res.render('s2/games/games.ejs', {
                        step: 'index',
                        result: {
                            success: true,
                            info: G
                        },
                        session: req.session

                    });
                })
                .catch(E => {
                    res.render('s2/games/games.ejs', {
                        step: 'index',
                        result: {
                            success: false,
                            message: E,
                        },
                        session: req.session
                    });

                });
        })
        .catch(E => {
            res.render('s2/games/games.ejs', {
                step: 'index',
                result: {
                    success: false,
                    message: E,
                    session: req.session
                }
            });
        });
});


router.get('/game/:id', function (req, res, next) {
    let id = req.params.id;
    let promises = [
        spex.Team.getAll(),
        spex.Game.get(id)
    ];
    Promise.all(promises)
        .then((values) => {
            let T = values[0],
                G = values[1].toJSON(),
                response = [];

            G.game_info.red_team.info = jsonQuery('[*][teamid={0}]'.format(G.game_info.red_team.id), {
                data: T
            }).value;

            G.game_info.blue_team.info = jsonQuery('[*][teamid={0}]'.format(G.game_info.blue_team.id), {
                data: T
            }).value;

            G.dateString = moment(G.date).format('YYYY/MM/DD HH:MM:SS');

            let r_entry = [],
                b_entry = [];

            G.game_info.red_team.entry.forEach((el, i) => {
                r_entry.push(el.member);
            });
            G.game_info.blue_team.entry.forEach((el, i) => {
                b_entry.push(el.member);
            });

            let inner_promises = [
                spex.Member.getMembers(r_entry),
                spex.Member.getMembers(b_entry)
            ];

            Promise.all(inner_promises)
                .then((vs) => {
                    var RMS = vs[0],
                        BMS = vs[1];

                    G.game_info.red_team.entry.forEach((el, i) => {
                        el.detail = jsonQuery('[*][id={0}]'.format(el.member), {
                            data: RMS
                        }).value;
                    });

                    G.game_info.blue_team.entry.forEach((el, i) => {
                        el.detail = jsonQuery('[*][id={0}]'.format(el.member), {
                            data: BMS
                        }).value;
                    });

                    res.render('s2/games/game.ejs', {
                        step: 'index',
                        info: G,
                        session: req.session
                    });
                })
                .catch(console.error);

        })
        .catch(console.error);
});

router.get('/game/preview/:id', function (req, res, next) {
    let id = req.params.id;
    let promises = [
        spex.Team.getAll(),
        spex.Game.get(id)
    ];
    Promise.all(promises)
        .then((values) => {
            let T = values[0],
                G = values[1].toJSON(),
                response = [];

            G.game_info.red_team.info = jsonQuery('[*][teamid={0}]'.format(G.game_info.red_team.id), {
                data: T
            }).value;

            G.game_info.blue_team.info = jsonQuery('[*][teamid={0}]'.format(G.game_info.blue_team.id), {
                data: T
            }).value;

            G.dateString = moment(G.date).format('YYYY/MM/DD HH:MM:SS');

            let r_entry = [],
                b_entry = [];

            G.game_info.red_team.entry.forEach((el, i) => {
                r_entry.push(el.member);
            });
            G.game_info.blue_team.entry.forEach((el, i) => {
                b_entry.push(el.member);
            });

            let inner_promises = [
                spex.Member.getMembers(r_entry),
                spex.Member.getMembers(b_entry),
                spex.Summary.getHistory(G.game_info.blue_team.id),
                spex.Summary.getHistory(G.game_info.red_team.id),
                spex.Summary.getRankByID(G.game_info.blue_team.id),
                spex.Summary.getRankByID(G.game_info.red_team.id),
            ];

            Promise.all(inner_promises)
                .then((vs) => {
                    var RMS = vs[0],
                        BMS = vs[1];

                    G.game_info.red_team.summary = {
                        score: 0,
                        max_score: 0,
                        tier: {
                            0: 0,
                            1: 0,
                            2: 0,
                            3: 0,
                            4: 0,
                            5: 0,
                            6: 0,
                            7: 0,
                        }
                    }
                    var count = 0;
                    G.game_info.red_team.entry.forEach((el, i) => {
                        el.detail = jsonQuery('[*][id={0}]'.format(el.member), {
                            data: RMS
                        }).value;
                        if (el.accept) {
                            G.game_info.red_team.summary.score += el.detail.competitive.score;
                            G.game_info.red_team.summary.max_score += el.detail.competitive.max_score;
                            G.game_info.red_team.summary.tier[el.detail.competitive.tier]++;
                            count++;
                        }
                    });
                    G.game_info.red_team.summary.score = (count > 0) ? G.game_info.red_team.summary.score / count : 0;
                    G.game_info.red_team.summary.max_score = (count > 0) ? Math.round(G.game_info.red_team.summary.max_score / count) : 0;


                    G.game_info.blue_team.summary = {
                        score: 0,
                        max_score: 0,
                        tier: {
                            0: 0,
                            1: 0,
                            2: 0,
                            3: 0,
                            4: 0,
                            5: 0,
                            6: 0,
                            7: 0,
                        }
                    }
                    count = 0;
                    G.game_info.blue_team.entry.forEach((el, i) => {
                        el.detail = jsonQuery('[*][id={0}]'.format(el.member), {
                            data: BMS
                        }).value;
                        if (el.accept) {
                            G.game_info.blue_team.summary.score += el.detail.competitive.score;
                            G.game_info.blue_team.summary.max_score += el.detail.competitive.max_score;
                            G.game_info.blue_team.summary.tier[el.detail.competitive.tier]++;
                            count++;
                        }
                    });
                    G.game_info.blue_team.summary.score = (count > 0) ? G.game_info.blue_team.summary.score / count : 0;
                    G.game_info.blue_team.summary.max_score = (count > 0) ? Math.round(G.game_info.blue_team.summary.max_score / count) : 0;

                    G.game_info.blue_team.history = vs[2];
                    G.game_info.red_team.history = vs[3];
                    G.game_info.blue_team.rank = vs[4];
                    G.game_info.red_team.rank = vs[5];

                    res.render('s2/games/preview.ejs', {
                        step: 'index',
                        info: G,
                        session: req.session
                    });
                })
                .catch(console.error);

        })
        .catch(console.error);
});

router.get('/game/preview/:id/entry/:team', function (req, res, next) {

    let id = req.params.id;
    let team = req.params.team;

    let promises = [
        spex.Team.getAll(),
        spex.Game.get(id)
    ];
    Promise.all(promises)
        .then((values) => {
            let T = values[0],
                G = values[1].toJSON(),
                response = [];

            G.game_info.entry_team = G.game_info.red_team.id == team ? G.game_info.red_team : G.game_info.blue_team;

            G.game_info.entry_team.info = jsonQuery('[*][teamid={0}]'.format(G.game_info.entry_team.id), {
                data: T
            }).value;


            G.dateString = moment(G.date).format('YYYY/MM/DD HH:MM:SS');

            let entry = [];

            G.game_info.entry_team.entry.forEach((el, i) => {
                entry.push(el.member);
            });

            spex.Member.getMembers(entry)
                .then((MS) => {

                    G.game_info.entry_team.summary = {
                        score: 0,
                        max_score: 0,
                        tier: {
                            0: 0,
                            1: 0,
                            2: 0,
                            3: 0,
                            4: 0,
                            5: 0,
                            6: 0,
                            7: 0,
                        }
                    }
                    var count = 0;
                    G.game_info.entry_team.entry.forEach((el, i) => {
                        el.detail = jsonQuery('[*][id={0}]'.format(el.member), {
                            data: MS
                        }).value;
                        if (el.accept) {
                            G.game_info.entry_team.summary.score += el.detail.competitive.score;
                            G.game_info.entry_team.summary.max_score += el.detail.competitive.max_score;
                            G.game_info.entry_team.summary.tier[el.detail.competitive.tier]++;
                            count++;
                        }
                    });
                    G.game_info.entry_team.summary.score = (count > 0) ? G.game_info.entry_team.summary.score / count : 0;
                    G.game_info.entry_team.summary.max_score = (count > 0) ? G.game_info.entry_team.summary.max_score / count : 0;

                    res.render('s2/games/entry.ejs', {
                        step: 'index',
                        info: G,
                        session: req.session
                    });
                })
                .catch(console.error);

        })
        .catch(console.error);
});

router.get('/manual', function (req, res, next) {
    res.render('s2/games/manual.ejs', {
        step: 'index',
        session: req.session
    });
});


router.get('/game/round', function (req, res, next) {
    res.render('s2/games/round.ejs', {
        step: 'index',
        session: req.session
    });
});

router.get('/game/round/write/:id', function (req, res, next) {
    let gid = req.params.id;

    spex.Game.get(gid)
        .then(G => {
            res.render('s2/games/round/round_write.ejs', {
                step: 'index',
                info: G.toJSON(),
                modify: {
                    isModify: false,
                },
                session: req.session

            });

        })
        .then(console.error);
});

router.get('/game/round/write/:id/:rid', function (req, res, next) {

    let gid = req.params.id;
    spex.Game.get(gid)
        .then(G => {
            res.render('s2/games/round/round_write.ejs', {
                step: 'index',
                info: G.toJSON(),
                modify: {
                    isModify: true,
                    round_id: req.params.rid,
                },
                session: req.session
            });

        })
        .then(console.error);
});

router.get('/simulation', function (req, res, next) {

    spex.Team.getAll()
        .then(T => {
            res.render('s2/games/simulation.ejs', {
                step: 'index',
                team_info: T,
                session: req.session
            });
        })
        .catch(console.error);
});

router.get('/setting/:id', function (req, res, next) {
    let user_id = req.params.id;

    let promises = [
        spex.Member.getMember(user_id),
        spex.Team.getAll(),
    ];
    Promise.all(promises)
        .then((values) => {
            let M = values[0].toJSON(),
                T = values[1];

            M.league.s02.teaminfo = jsonQuery('[*][teamid={0}]'.format(M.league.s02.team), {
                data: T
            }).value;

            res.render('s2/user/user_home.ejs', {
                step: 'myinfo',
                user: M,
                session: req.session
            });

        })
        .catch(console.error);
});

router.post('/setting/:id', function (req, res, next) {

    let category = req.body.setting_category === undefined ? null : req.body.setting_category;
    let user_id = req.params.id;

    try {

        switch (category) {

            case "profile":
                let change_user_id = req.body.profile_change_user_id.toRequestID();

                spex.Member.getMember(user_id)
                    .then(M => {
                        M.account.player.mostplay = req.body.profile_most_hero;
                        M.account.player.position.defense = req.body.profile_position_defense === undefined ? false : true;
                        M.account.player.position.offense = req.body.profile_position_offense === undefined ? false : true;
                        M.account.player.position.support = req.body.profile_position_support === undefined ? false : true;

                        M.competitive.max_score = !isNaN(req.body.score) ? req.body.score : 0;

                        spex.Member.saveMember(M)
                            .then(SR => {
                                return res.redirect('/s2/setting/' + user_id + "?tab=" + category);
                            }).catch(console.error);
                    }).catch(console.error);

                break;
            case "security":
                let old_password = req.body.old_password;
                let new_password = req.body.new_password;
                let confirm_password = req.body.confirm_password;

                let auto_login = req.body.savePassword === undefined ? false : true;

                spex.Member.getMember(user_id)
                    .then(M => {
                        if (old_password !== M.account.security.password) {
                            res.json({
                                sucess: false,
                                message: "error password",
                            });
                            return;
                        }

                        M.account.security.password = new_password;
                        M.account.security.savepassword = auto_login;

                        spex.Member.saveMember(M)
                            .then(SR => {
                                return res.redirect('/s2/setting/' + user_id + "?tab=" + category);
                            }).catch(console.error);
                    }).catch(console.error);

                break;
            case "notify":
                break;

            default:
                break;

        }


    } catch (E) {
        console.log(E);
        return res.redirect('/s2/user?user_id=' + user_id);
    }

});



module.exports = router;
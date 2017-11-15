var express = require('express');
var router = express.Router();
var spex = require('zspex-module');
var ov = require('OverwatchStatics');
var jsonQuery = require('json-query');
var moment = require('moment');
var _ = require('underscore');
var TIERS = require('./ranks');

// var admin = require('firebase-admin');
// admin.initializeApp({
//     credential: admin.credential.cert(require('../spex-31350-firebase-adminsdk.json')),
//     databaseURL: 'https://spex-31350.firebaseio.com'
// });

router.get('/member/update/:id', function (req, res, next) {
    console.log(req.params.id);
    let member_id = req.params.id.toRequestID();

    var request = require('request-promise');

    let promises = [
        request({
            method: 'POST',
            uri: 'https://overlog.gg/search/players',
            formData: {
                page: 0,
                playerName: req.params.id.toDisplayID(),
                region: 'kr'
            }
        }),
        spex.Member.parseOnline(member_id)
    ];

    Promise.all(promises)
        .then((values) => {
            var D = values[1],
                OL = JSON.parse(values[0]);

            spex.Member.getMember(member_id)
                .then(function (M) {
                    M.account.player.icon = D.profile.avatar;
                    M.competitive.score = (D.profile.rank !== undefined && !isNaN(D.profile.rank)) ? D.profile.rank : 0;
                    M.competitive.max_score = Math.max(isNaN(M.competitive.max_score) ? 0 : M.competitive.max_score, M.competitive.score);
                    M.competitive.tier = D.profile.season !== undefined ? D.profile.season.rank : 0;
                    M.competitive.tier_name = D.profile.ranking !== undefined ? D.profile.ranking : "";

                    M.account.player.overlog_link = OL.list[0].link !== undefined ? 'https://overlog.gg/{0}'.format(OL.list[0].link) : '#';

                    spex.Member.saveMember(M)
                        .then(SR => {
                            res.json(SR);
                        });
                })
                .catch(console.error);

        })
        .catch(console.error);



    //     ,
    //     function (err, httpResponse, body) {
    //         if (err) {
    //             console.error('failed {0}'.format(err));
    //         }
    //         console.dir(body);

    //     }
    // );


    spex.Member.parseOnline(member_id)
        .then(function (D) {
            spex.Member.getMember(member_id)
                .then(function (M) {
                    M.account.player.icon = D.profile.avatar;
                    M.competitive.score = (D.profile.rank !== undefined && !isNaN(D.profile.rank)) ? D.profile.rank : 0;
                    M.competitive.max_score = Math.max(isNaN(M.competitive.max_score) ? 0 : M.competitive.max_score, M.competitive.score);
                    M.competitive.tier = D.profile.season !== undefined ? D.profile.season.rank : 0;
                    M.competitive.tier_name = D.profile.ranking !== undefined ? D.profile.ranking : "";

                    spex.Member.saveMember(M)
                        .then(SR => {
                            res.json(SR);
                        });
                })
                .catch(console.error);
        })
        .catch(console.error);

});

router.get('/info/team/:id', function (req, res, next) {
    let id = req.params.id;
    if (id == 0) {
        spex.Team.getAll()
            .then(function (info) {
                res.json({
                    success: true,
                    info: info
                });
            })
            .catch(E => {
                res.json({
                    success: false,
                    info: E
                });
                console.error(E);
            });

    } else {
        spex.Team.get(id)
            .then(function (info) {
                res.json({
                    success: true,
                    info: info
                });
            })
            .catch(E => {
                res.json({
                    success: false,
                    info: E
                });
                console.error(E);
            });
    }
});

router.get('/games', function (req, res, next) {
    console.dir(req.query);
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
                response = {
                    data: []
                };

            _.each(G, function (elmt, index) {
                gdate = moment(elmt.date);
                // console.log('{0}  - {1}'.format(gdate.format('YY.MM.DD'), gdate.format('ww')))

                elmt.game_info.red_team.info = jsonQuery('[*][teamid={0}]'.format(elmt.game_info.red_team.id), {
                    data: T
                }).value;

                elmt.game_info.red_team.score = elmt.game_info.round_info.filter((t) => {
                    var ct = t.teams.filter((inner_t) => {
                        return inner_t.id == elmt.game_info.red_team.id && inner_t.won;
                    })
                    return ct.length > 0;
                }).length;

                elmt.game_info.blue_team.info = jsonQuery('[*][teamid={0}]'.format(elmt.game_info.blue_team.id), {
                    data: T
                }).value;

                elmt.game_info.blue_team.score = elmt.game_info.round_info.filter((t) => {
                    var ct = t.teams.filter((inner_t) => {
                        return inner_t.id == elmt.game_info.blue_team.id && inner_t.won;
                    })
                    return ct.length > 0;
                }).length;

                elmt.dateString = moment(elmt.date).format('YYYY/MM/DD HH:MM:SS');

                elmt.won_team_name = elmt.game_info.red_team.score > elmt.game_info.blue_team.score ? elmt.game_info.red_team.info.info.name : elmt.game_info.blue_team.info.info.name;

                response.data.push({
                    game: elmt
                });

            }, this);

            res.json(response);
        })
        .catch(console.error);
});

router.get('/info/game/:id', function (req, res, next) {
    let id = req.params.id;
    spex.Game.get(id)
        .then(function (info) {
            res.json({
                success: true,
                info: info
            });
        })
        .catch(E => {
            res.json({
                success: false,
                info: E
            });
            console.error(E);
        });

});

router.post('/update/team/', function (req, res, next) {
    let {
        teamid,
        comment
    } = req.body;

    spex.Team.get(teamid)
        .then(T => {
            T.info.comment = comment;
            T.save()
                .then(SR => {
                    res.json({
                        success: true,
                        info: T
                    });
                })
        })
        .catch(E => {
            res.json({
                success: false,
                info: E
            });
            console.error(E);
        });
});

router.get('/info/team/:id/member', function (req, res, next) {
    let id = req.params.id;
    spex.Member.getTeamMembers(id)
        .then(function (info) {
            res.json({
                success: true,
                info: JSON.parse(JSON.stringify(info))
            });
        })
        .catch(E => {
            res.json({
                success: false,
                info: E
            });
            console.error(E);
        });
});


router.get('/info/myteam/recentgame/:id', function (req, res, next) {
    let id = req.params.id;

    spex.Member.getMember(id)
        .then(M => {
            if (M.league.s02.team === undefined || M.league.s02.team === 0) {
                res.json({
                    success: false,
                    info: E
                });
            }

            let promises = [
                spex.Game.getRecentGame(null, M.league.s02.team),
                spex.Team.getAll(),
            ];
            Promise.all(promises)
                .then((values) => {
                    let G = values[0].toJSON(),
                        T = values[1];

                    G.game_info.red_team.info = jsonQuery('[*][teamid={0}]'.format(G.game_info.red_team.id), {
                        data: T
                    }).value;
                    G.game_info.blue_team.info = jsonQuery('[*][teamid={0}]'.format(G.game_info.blue_team.id), {
                        data: T
                    }).value;

                    G.dateString = moment(G.date).format('YYYY/MM/DD HH:MM:SS');

                    res.json({
                        success: true,
                        info: G,
                        member: M.toJSON(),
                    });
                })
                .catch(E => {
                    res.json({
                        success: false,
                        info: E
                    });
                });
        })
        .catch(E => {
            res.json({
                success: false,
                info: E
            });
        });

});

router.get('/info/myteam/member/:id', function (req, res, next) {
    let id = req.params.id;

    spex.Member.getMember(id)
        .then(M => {
            spex.Member.getTeamMembers(M.league.s02.team)
                .then(TM => {
                    res.json({
                        success: true,
                        info: TM
                    });
                })
                .catch(E => {
                    res.json({
                        success: false,
                        info: E
                    });
                });
        })
        .catch(E => {
            res.json({
                success: false,
                info: E
            });
        });

});

router.get('/info/league/score', function (req, res, next) {
    spex.Member.getMembersScoreAverage()
        .then(D => {
            makeResponse(res, true, D);
        }).catch(E => {
            makeResponse(res, false, E);
        })
});

router.post('/entry/:gid/team/:tid', function (req, res, next) {
    let gid = req.params.gid;
    let tid = req.params.tid;

    let entry = req.body.entry !== undefined ? req.body.entry : [];
    if (!Array.isArray(entry)) {
        entry = [entry];
    }
    // console.dir(entry);
    spex.Game.get(gid)
        .then(G => {
            if (G.game_info.red_team.id == tid) {
                G.game_info.red_team.entry.forEach((el, i) => {
                    el.accept = false;
                });
                entry.forEach((m, index) => {
                    G.game_info.red_team.entry.forEach((el, i) => {
                        if (el.member == m) {
                            el.accept = true;
                        }
                    });
                });
                G.markModified('game_info.red_team.entry');
            }

            if (G.game_info.blue_team.id == tid) {
                G.game_info.blue_team.entry.forEach((el, i) => {
                    el.accept = false;
                });
                entry.forEach((m, index) => {
                    G.game_info.blue_team.entry.forEach((el, i) => {
                        if (el.member == m) {
                            el.accept = true;
                        }
                    });
                });
                G.markModified('game_info.blue_team.entry');
            }


            spex.Game.save(G)
                .then(SR => {
                    makeResponse(res, true, SR);
                })
                .catch(E => {
                    makeResponse(res, false, E);
                });


        })
        .catch(E => {
            makeResponse(res, false, E);
        });

});

router.post('/entry/:gid', function (req, res, next) {
    let gid = req.params.gid;
    let id = req.body.id;
    let promises = [
        spex.Member.getMember(id),
        spex.Game.get(gid)
    ];
    Promise.all(promises)
        .then((values) => {
            var M = values[0].toJSON(),
                G = values[1];

            var myteam = null;

            if (G.game_info.blue_team.id == M.league.s02.team)
                myteam = G.game_info.blue_team;
            if (G.game_info.red_team.id == M.league.s02.team)
                myteam = G.game_info.red_team;

            if (myteam === null) {
                makeResponse(res, false, '팀이 올바르지 않습니다.');
                return;
            }

            if (!(myteam.entry.filter(e => {
                    return e.member == M.id
                }).length > 0)) {

                myteam.entry.push({
                    member: M.id,
                    accept: false,
                });

                // fcm message send to teamleader
                var request = require('request');
                request.post({
                        url: 'http://spex.me/system/fcm/entry',
                        form: {
                            id: M.id,
                            gid: gid,
                            team_id: myteam.id,
                        }
                    },
                    function (err, httpResponse, body) {
                        if (err) {
                            console.error('failed {0}'.format(err));
                        }
                        console.log('sended fcm entry register message');
                    }
                );
            }

            spex.Game.save(G)
                .then(SR => {
                    makeResponse(res, true, SR.toJSON());
                })
                .catch(E => {
                    makeResponse(res, false, E);
                });

        }).catch(E => {
            makeResponse(res, false, E);
        });
});

router.get('/team/:id', function (req, res, next) {

    let id = req.params.id;

    spex.Member.getTeamMembers(id)
        .then(function (D) {
            res.json(D);
        })
        .catch(console.error);
});

router.get('/member/:id', function (req, res, next) {
    console.log('/member/' + req.params.id + '/');
    let member_id = req.params.id.toRequestID();

    spex.Member.getMember(req.params.id)
        .then(function (member) {
            res.json({
                success: true,
                info: member
            });
        })
        .catch(E => {
            res.json({
                success: false,
                info: E
            });
            console.error(E);
        });
});

router.get('/auto/update', function (req, res, next) {

    spex.Summary.init();

    var fs = require('fs');
    fs.unlink('./failed.txt', function (err) {
        if (err) console.log(err);
    });

    spex.Member.getMembers(/.*/)
        .then(M => {
            var async = require('async');
            var ilookup = [];

            M.forEach(function (element, index) {
                // if (element.league.s02.team == 13)
                // if (element.league.s02.accepted)
                ilookup.push(element.id);
            });

            async.eachSeries(ilookup,
                function (id, next) {

                    var request = require('request-promise');

                    let promises = [
                        request({
                            method: 'POST',
                            uri: 'https://overlog.gg/search/players',
                            formData: {
                                page: 0,
                                playerName: id.toDisplayID(),
                                region: 'kr'
                            }
                        }),
                        spex.Member.parseOnline(id)
                    ];

                    Promise.all(promises)
                        .then((values) => {
                            var D = values[1],
                                OL = JSON.parse(values[0]);

                            spex.Member.getMember(id)
                                .then(function (M) {
                                    M.account.player.icon = D.profile.avatar;
                                    M.account.security.account_type = (M.account.security.account_type) ? M.account.security.account_type : 1;
                                    M.competitive.score = (D.profile.rank !== undefined && !isNaN(D.profile.rank)) ? D.profile.rank : 0;
                                    M.competitive.max_score = Math.max(isNaN(M.competitive.max_score) ? 0 : M.competitive.max_score, M.competitive.score);
                                    M.competitive.tier = D.profile.season !== undefined ? D.profile.season.rank : 0;
                                    M.competitive.tier_name = D.profile.ranking !== undefined ? D.profile.ranking : "";

                                    M.account.player.overlog_link = OL.list[0].link !== undefined ? 'https://overlog.gg/{0}'.format(OL.list[0].link) : '#';

                                    var md5 = require('md5');
                                    M.account.security.md5_password = md5(M.account.security.password);

                                    spex.Member.saveMember(M)
                                        .then(SR => {
                                            console.log('[AutoU] : ' + SR.id);
                                            next(null);
                                        });
                                })
                                .catch(console.error)
                        }).catch(function (error) {
                            console.error(error);

                            fs.appendFile('./failed.txt', id + '\n' + error + '\n', function (error) {
                                if (error) console.log('file write failed');
                            });

                            next(null);
                        });

                },
                function (err) {
                    if (err) {
                        console.log(err);
                    }
                    res.json({
                        status: "sucess",
                        processing: ilookup.length,
                        message: "auto update completed"
                    });
                });

        });

    return;


});

router.get('/search/:id', function (req, res, next) {
    console.log(req.params.id);

    let member_id = req.params.id.toRequestID();

    spex.Member.parseOnline(member_id)
        .then(D => {
            res.json({
                success: true,
                info: D,
            });
        })
        .catch(error => {
            console.error(error);
            res.json({
                success: false,
                info: error,
            });
        });
});


router.post('/fcm/register', function (req, res, next) {
    let token = req.body.token;
    let id = req.body.id;

    console.log('FCM : {0}/{1}'.format(id, token));

    spex.FCM.get(token)
        .then(fcm => {
            console.log('FCM1 : {0}', fcm);
            if (fcm === null || fcm === undefined) {
                spex.FCM.create(token)
                    .then(newToken => {
                        newToken.id = id;
                        console.log('FCM2 : {0}', newToken);
                        newToken.save()
                            .then(SR => {
                                makeResponse(res, true, SR);
                            })
                            .catch(E => {
                                makeResponse(res, false, E);
                            });
                    }).catch(E => {
                        makeResponse(res, false, E);
                    });
            } else {
                fcm.id = id;
                console.log('FCM1 : {0}', fcm);
                fcm.save()
                    .then(SR => {
                        makeResponse(res, true, SR);
                    })
                    .catch(E => {
                        makeResponse(res, false, E);
                    });
            }
        }).catch(E => {
            makeResponse(res, false, E);
        });
});

router.get('/reset/:id', function (req, res, next) {
    console.log(req.params.id);

    let member_id = req.params.id.toRequestID();
    let requestID = req.query.requestID.toRequestID();

    spex.Member.getMember(requestID).then(L => {
        var tID;
        if (L.account.security.account_type == 2) {
            tID = L.league.s02.team;
        }
        spex.Member.getMember(member_id)
            .then(M => {

                if (!_.isUndefined(tID)) {
                    if (M.league.s02.team != tID) {
                        res.json({
                            success: false,
                            message: '해당팀원이 아닙니다.'
                        })
                        return;
                    }
                }

                M.account.security.password = "0000"
                spex.Member.saveMember(M)
                    .then(SR => {
                        res.json({
                            success: true,
                            message: '0000으로 초기화하였습니다.'
                        })
                    })
                    .catch(E => {
                        res.json({
                            success: false,
                            message: '초기화에 실패하였습니다.'
                        })
                    })
            }).catch(E => {
                res.json({
                    success: false,
                    message: '초기화에 실패하였습니다.'
                })
            })

    }).catch(E => {
        res.json({
            success: false,
            message: '초기화에 실패하였습니다.'
        })
    })

});


router.post('/modify/member/:id', function (req, res, next) {
    let id = req.params.id;

    spex.Member.getMember(id)
        .then(M => {
            if (req.body.score !== undefined) {
                M.competitive.max_score = req.body.score;
            }
            spex.Member.saveMember(M)
                .then(SR => {
                    res.json({
                        success: true,
                        info: SR
                    });
                })
                .catch(E => {
                    res.json({
                        success: false,
                        message: E
                    });
                });
        })
        .catch(E => {
            res.json({
                success: false,
                message: E
            });
        });
});


router.post('/modify/game/:id/finish', function (req, res, next) {

    let id = req.params.id;

    spex.Game.get(id)
        .then(function (D) {
            D.done = true;
            D.expired = false;

            spex.Game.save(D)
                .then(function (SR) {
                    spex.Summary.init();

                    //send to notification
                    makeResponse(res, true, SR);
                })
                .catch(E => {
                    makeResponse(res, false, E);
                });
        })
        .catch(E => {
            makeResponse(res, false, E);
        });
});

router.post('/modify/game/:id', function (req, res, next) {
    let id = req.params.id;
    let dtime;

    if (req.body.date !== undefined && req.body.time !== undefined) {

        if ((/^\s*$/).test(req.body.date) || (/^\s*$/).test(req.body.time)) {
            res.json({
                success: false,
                message: '날짜/시간이 올바르지 않습니다.'
            });
        }
        dtime = new Date('{0} {1}'.format(req.body.date, req.body.time));
    }

    spex.Game.get(id)
        .then(function (D) {

            if (dtime !== undefined) {
                D.date = dtime;
            }

            if (req.body.red_team !== undefined) {
                D.game_info.red_team.id = req.body.red_team;
            }

            if (req.body.blue_team !== undefined) {
                D.game_info.blue_team.id = req.body.blue_team;
            }

            if (req.body.media !== undefined) {

                D.media = req.body.media;
            }

            spex.Game.save(D)
                .then(function (SR) {
                    makeResponse(res, true, SR);
                })
                .catch(E => {
                    makeResponse(res, false, E);
                });
        })
        .catch(E => {
            makeResponse(res, false, E);
        });

});

router.post('/modify/game/:id/round/:rid', function (req, res, next) {
    let gid = req.params.id;
    let rid = req.params.rid - 1;

    let red_entry = (!Array.isArray(req.body.entries[0])) ? [req.body.entries[0]] : req.body.entries[0];
    let blue_entry = (!Array.isArray(req.body.entries[1])) ? [req.body.entries[1]] : req.body.entries[1];
    let map = req.body.map;
    let winner = req.body.winner;
    let potg = req.body.potg !== undefined ? '' : req.body.potg;


    spex.Game.get(gid)
        .then(function (G) {
            G.game_info.round_info[rid].battle_ground = map;
            G.game_info.round_info[rid].teams = [{
                    id: G.game_info.red_team.id,
                    won: G.game_info.red_team.id == winner ? true : false,
                    entry: red_entry
                },
                {
                    id: G.game_info.blue_team.id,
                    won: G.game_info.blue_team.id == winner ? true : false,
                    entry: blue_entry
                }
            ]
            G.game_info.round_info[rid].potg = potg;
            G.markModified('game_info.round_info');

            spex.Game.save(G)
                .then(SR => {
                    makeResponse(res, true, SR);
                }).catch((E) => {
                    makeResponse(res, false, E);
                })
        }).catch((E) => {
            makeResponse(res, false, E);
        })

});

router.post('/modify/game/:id/create/round', function (req, res, next) {
    let gid = req.params.id;

    let red_entry = (!Array.isArray(req.body.entries[0])) ? [req.body.entries[0]] : req.body.entries[0];
    let blue_entry = (!Array.isArray(req.body.entries[1])) ? [req.body.entries[1]] : req.body.entries[1];
    let map = req.body.map;
    let winner = req.body.winner;
    let potg = req.body.potg !== undefined ? '' : req.body.potg;

    spex.Game.get(gid)
        .then(function (G) {
            G.game_info.round_info.push({
                battle_ground: map,
                teams: [{
                        id: G.game_info.red_team.id,
                        won: G.game_info.red_team.id == winner ? true : false,
                        entry: red_entry
                    },
                    {
                        id: G.game_info.blue_team.id,
                        won: G.game_info.blue_team.id == winner ? true : false,
                        entry: blue_entry
                    }
                ],
                potg: potg
            });

            spex.Game.save(G)
                .then(SR => {
                    makeResponse(res, true, SR);
                }).catch((E) => {
                    makeResponse(res, false, E);
                })
        }).catch((E) => {
            makeResponse(res, false, E);
        })

});

router.post('/expire/game/:id', function (req, res, next) {
    let id = req.params.id;
    console.log(id);

    spex.Game.get(id)
        .then(function (G) {

            G.expired = true;

            spex.Game.save(G)
                .then(SR => {
                    makeResponse(res, true, SR);
                }).catch((E) => {
                    makeResponse(res, false, E);
                })

        }).catch((E) => {
            makeResponse(res, false, E);
        })

});

router.post('/create/game', function (req, res, next) {

    let date = req.body.date;
    let time = req.body.time;
    let red_team = req.body.red_team;
    let blue_team = req.body.blue_team;

    if ((/^\s*$/).test(date) || (/^\s*$/).test(time)) {
        res.json({
            success: false,
            message: '날짜/시간이 올바르지 않습니다.'
        });
    }

    // var momentDate = moment('{0} {1}:00'.format(date, time), 'YYYY/MM/DD HH:mm:ss');
    // let dtime = momentDate.toDate();
    let dtime = new Date('{0} {1}'.format(date, time));

    spex.Game.create()
        .then(function (D) {
            D.date = dtime;
            D.expired = false;
            D.game_info.red_team.id = red_team;
            D.game_info.blue_team.id = blue_team;
            spex.Game.save(D)
                .then(G => {
                    res.json({
                        success: true,
                        info: G
                    });
                })
                .catch(E => {
                    res.json({
                        success: false,
                        message: E
                    });

                });
        })
        .catch(E => {
            res.json({
                success: false,
                message: E
            });
        });
});



router.post('/game/round/modify/:id', function (req, res, next) {});

router.get('/migration', function (req, res, next) {

    // migrations
    ov.session.SessionAllUserInfo(function (err, results) {
        var async = require('async');
        var ilookup = [];
        results.forEach(function (element, index) {
            // if (index < 1)
            ilookup.push(element.id);
        });

        async.each(ilookup,
            function (id, next) {

                spex.Member.getMember(id)
                    .then(instance => {
                        var q = instance.id;
                        ov.session.SessionUserInfo(instance.id)
                            .then(ovMemberInfo => {
                                migration(ovMemberInfo, instance, next);
                            })
                            .catch(console.error);
                    })
                    .catch(err => {
                        var newMember = spex.Member.createMember(err.id);
                        spex.Member.saveMember(newMember)
                            .then(sr => {
                                spex.Member.getMember(sr.id)
                                    .then(instance => {
                                        ov.session.SessionUserInfo(instance.id)
                                            .then(ovMemberInfo => {
                                                migration(ovMemberInfo, instance, next);
                                            })
                                            .catch(console.error);
                                    })
                                    .catch(console.error);
                            })
                            .catch(console.error);
                    });
            },
            function (err) {
                if (err) {
                    console.log(err);
                }
                res.json({
                    status: "sucess",
                    processing: ilookup.length,
                    message: "migration completed"
                });
            });
    });

});

router.post('/signup', function (req, res, next) {
    let id = req.body.user.toRequestID();
    let password = req.body.password;
    let savepassword = req.body.save;
    let info = JSON.parse(req.body.info);

    spex.Member.getMember(id)
        .then(M => {
            res.json({
                success: false,
                message: '이미 가입된 회원입니다.'
            });
        })
        .catch(function () {
            var c = spex.Member.createMember(id);
            c.account.player.icon = info.profile.avatar;
            c.account.security.password = password;
            var md5 = require('md5');
            c.account.security.md5_password = md5(password);
            c.account.security.savepassword = savepassword;
            c.account.security.account_type = 1; //general account

            c.competitive.score = (info.profile.rank !== undefined && !isNaN(info.profile.rank)) ? info.profile.rank : 0;
            c.competitive.max_score = c.competitive.score;
            c.competitive.tier = info.profile.season !== undefined ? info.profile.season.rank : 0;
            c.competitive.tier_name = info.profile.ranking !== undefined ? info.profile.ranking : "";
            c.competitive.level = parseInt(info.profile.tier + '' + info.profile.level);
            c.competitive.level = isNaN(c.competitive.level) ? 0 : c.competitive.level;

            spex.Member.saveMember(c)
                .then(SR => {
                    res.json({
                        success: true,
                        info: SR,
                    })
                }).catch(E => {
                    res.json({
                        success: false,
                        message: E
                    });
                })
        });
});

router.post('/auth/token_signin', require('./auth').autoSignin);

router.post('/auth/resignin', require('./auth').resignin);

router.post('/auth/signin', require('./auth').signin);


router.post('/signin', function (req, res, next) {

    let id = req.body.user.toRequestID();
    let password = req.body.password;
    let save_password = req.body.save === "true";

    // let {username, password } = req.body;
    // console.log(user.verify('1111'));


    spex.Member.getMember(id)
        .then(M => {

            if (password == M.account.security.password) {
                M.account.security.savepassword = save_password;

                spex.Member.saveMember(M)
                    .then(SR => {
                        res.json({
                            accept: true,
                            save: save_password,
                            info: {
                                id: id,
                                icon: M.account.player.icon,
                                level: M.account.security.account_type,
                            }
                        })
                    })
                    .catch(E => {
                        res.json({
                            accept: false,
                            message: '로그인실패',
                        });
                    });
            } else {
                res.json({
                    accept: false,
                    message: '패스워드를 확인해 주세요.',
                });
            }
        })
        .catch(err => {
            console.error(err);
            res.json({
                accept: false,
                message: '아이디({0})를 찾을수 없습니다. 대소문자/배틀태그를 확인해주세요'.format(req.body.user),
            });
        });

});

router.post('/login', function (req, res, next) {
    let id = req.body.user.toRequestID();
    let password = req.body.password1;
    let conform_password = req.body.password2;
    let save_password = req.body.save === "true";

    console.dir(req.body);

    if (password === undefined) {
        res.json({
            accept: false,
            message: '패스워드를 확인해 주세요',
        });
        return;
    }

    spex.Member.getMember(id)
        .then(M => {
            // console.log(M);
            if (password == M.account.security.password) {
                res.json({
                    accept: true,
                    save: save_password,
                    info: {
                        id: id,
                        icon: M.account.player.icon,
                        level: 0,
                    }

                })
            }
        })
        .catch(err => {
            console.error(err);
            res.json({
                accept: false,
                message: err,
            });
        });
});


router.get('/leader/accept/:id', function (req, res, next) {
    let id = req.params.id;
    spex.Member.getMember(id)
        .then(M => {
            M.league.s02.accepted = true;
            spex.Member.saveMember(M)
                .then(SR => {
                    res.json({
                        success: true,
                        info: SR,
                    });
                })
                .catch(error => {
                    console.error(error);
                    res.json({
                        success: false,
                        info: error,
                    });
                });
        })
        .catch(error => {
            console.error(error);
            res.json({
                success: false,
                info: error,
            });
        });
});

router.post('/search/league/:query', function (req, res, next) {

    let {
        query
    } = req.params;

    let {
        start,
        length,
        draw
    } = req.body;

    let response = {
        "draw": draw,
        "recordsTotal": 0,
        "recordsFiltered": 0,
        data: []
    }

    spex.Member.search(query)
        .then(M => {
            let user = {
                playerName: '',
                portrait: '',
                level: 0,
                rankIcon: '',
                competitive_rank: 0,
                teamLogo: '',
                teamName: '무소속',
                link: ''
            };

            if (!_.isArray(M)) {
                _.expired(M, M);
            }
            response.recordsTotal = response.recordsFiltered = M.length;

            _(M).each(u => {
                let e = {};
                _.defaults(e, user);
                let t = spex.Team.get_sync(u.league.s02.team);
                console.log(TIERS[Math.floor(u.competitive.max_score / 500)].id);
                e.playerName = u.id.toShortID();
                e.portrait = u.account.player.icon;
                e.rankIcon = '/img/icons/rank-{0}.png'.format(TIERS[Math.floor(u.competitive.max_score / 500)].id);
                e.competitive_rank = u.competitive.max_score;
                if (!_.isNull(t)) {
                    e.teamName = t.info.name;
                    e.teamLogo = t.info.logo;
                }
                e.link = u.account.player.overlog_link;

                response.data.push({
                    info: e
                });
            })



            res.json(response);
        })
        .catch(error => {
            console.error(error);
            res.json({
                success: false,
                info: error,
            });
        });
})

router.post('/search/overlog/:query', function (req, res, next) {

    let {
        query
    } = req.params;

    let {
        start,
        length,
        draw
    } = req.body;

    start = parseInt(start);
    length = parseInt(length);

    // console.dir(req.body);

    let overlogPageCount = 25;
    var request = require('request-promise');

    let queryPage = Math.floor(start / overlogPageCount) > 0 ? Math.floor(start / overlogPageCount) + 1 : Math.floor(start / overlogPageCount);

    // console.log(Math.floor((start + length) / overlogPageCount))

    let promises = [
        request({
            method: 'POST',
            uri: 'https://overlog.gg/search/players',
            formData: {
                page: queryPage,
                playerName: query,
                region: 'kr'
            }
        })
    ];

    let response = {
        overlogResultInfo: {
            total: 0,
            page: 0,
            nextPage: 0,
        },
        "draw": draw,
        "recordsTotal": 0,
        "recordsFiltered": 0,
        data: []
    }
    Promise.all(promises)
        .then((values) => {
            var OverlogSearchResult = JSON.parse(values[0]);
            response.overlogResultInfo.total = OverlogSearchResult.total;
            response.recordsFiltered = response.recordsTotal = OverlogSearchResult.total;
            response.overlogResultInfo.page = parseInt(OverlogSearchResult.page);
            response.overlogResultInfo.nextPage = OverlogSearchResult.nextPage;

            _(OverlogSearchResult.list).each((result, index) => {
                let offset = overlogPageCount * (response.overlogResultInfo.page - 1) + index;
                if (offset >= start && offset < start + length) {
                    response.data.push({
                        info: result
                    });
                }
            })
            res.json(response);

        });
});

router.get('/team/CRUD/C', function (req, res, next) {
    // spex.Team.create(1, 1, '팀란포').save();
    // spex.Team.create(1, 2, '비트개구리').save();
    // spex.Team.create(1, 3, '우리는한조').save();
    // spex.Team.create(1, 4, '선빵필승').save();
    // spex.Team.create(1, 5, '쀼삐쀼삐').save();
    // spex.Team.create(1, 6, '루나틱효도').save();


    // spex.Team.create(2, 7, '훈훈').save();
    // spex.Team.create(2, 8, '선빵필승').save();
    // spex.Team.create(2, 9, '선남선녀').save();
    // spex.Team.create(2, 10, '그라찌에').save();
    // spex.Team.create(2, 11, '치킨').save();
    // spex.Team.create(2, 12, '아기상어').save();

    // let I = spex.Team.create(2, 13, '응구려');
    // spex.Team.save(I)
    //     .then(function (t) {
    //         res.json(t);
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.json({
    //             status: false,
    //             message: "INSERT FAILED"
    //         });
    //     });
});

var makeResponse = function (res, success, payload) {
    res.json({
        success: success,
        info: payload,
    });
}

var migration = function (inp, memberModel, cb) {
    memberModel.account.security.password = inp.pin;
    memberModel.account.security.savepassword = inp.auto_login;
    memberModel.account.player.icon = inp.avatar;
    memberModel.account.player.mostplay = inp.hero;
    memberModel.account.player.position.offense = (inp.position_offense) ? true : false;
    memberModel.account.player.position.defense = (inp.position_defense) ? true : false;
    memberModel.account.player.position.support = (inp.position_support) ? true : false;

    // memberModel.competitive.score = inp.rank;

    memberModel.league.s01.team = inp.team;
    memberModel.league.s01.accepted = inp.team != null ? true : false;
    memberModel.league.s01.point = 0;

    spex.Member.saveMember(memberModel)
        .then(sr => {
            console.log('saved :' + sr.id);
            cb(null);
        })
        .catch(console.error);
}

module.exports = router;
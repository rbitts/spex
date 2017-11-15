var express = require('express');
var router = express.Router();
var spex = require('zspex-module');
var moment = require('moment');
var admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(require('../spex-31350-firebase-adminsdk.json')),
    databaseURL: 'https://spex-31350.firebaseio.com'
});

router.get('/fcm/send', function (req, res, next) {
    let todaysMatch = spex.Summary.getRecentGame();

    let today = moment().format('YYYYMMDD');
    let gDate = moment(todaysMatch.date).format('YYYYMMDD');

    if (today != gDate || gDate === undefined) {
        makeResponse(res, false, '경기가없습니다.');
        return;
    }

    let red = spex.Team.get_sync(todaysMatch.game_info.red_team.id).info.name;
    let blue = spex.Team.get_sync(todaysMatch.game_info.blue_team.id).info.name;

    if ((!red) || (!blue)) {
        makeResponse(res, false, '경기가없습니다.');
        return;
    }

    let payload = {
        notification: {
            sound: "default",
            title: 'SPEX 경기시작알림 {0}vs{1}'.format(red, blue),
            body: '유튜브중계채널'
        },
        data: {
            broadcast: '{0}'.format('https://gaming.youtube.com/c/SAMPEX/live')
        }
    };

    // Set the message as high priority and have it expire after 24 hours.
    var options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    debugMessage(payload).then(Response => {
            makeResponse(res, true, Response);
        })
        .catch(E => {
            makeResponse(res, false, E);
        });
});


router.post('/fcm/send', function (req, res, next) {

    let title = req.body.title;
    let content = req.body.content;

    let registrationToken = 'eH2AffE-iR4:APA91bE6mdGhOgH4whv4J3mubqtDqs1AgQqLHMvHFiAiump2tFljQMS29V8vcx3uEN3Qq887tAKLk0Y1TaRsojn_xunTIS81wdXTStfDsSTogkULg7pil5BS753r8cFAUhPnfaAiyjXZ';
    // let registrationToken = 'f3SvPC2Rdds:APA91bHnlaR24Vim-FfdJB1OiiIwf1z7b5S9etQ_hnjS6RnhcCUJKriXxUXwelLs61Tjsvp8DExTuzuv5f5Fj1U_FO4VBaZdfivmH8-D3pxEUEwNJaNhZDHrwLO2Miy4hG-oa1_QUeJw';

    let payload = {
        notification: {
            sound: "default",
            title: title,
            body: content
        }
    };

    // Set the message as high priority and have it expire after 24 hours.
    var options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    admin.messaging().sendToDevice(registrationToken, payload, options)
        .then(function (response) {
            makeResponse(res, true, response);
        })
        .catch(function (error) {
            makeResponse(res, false, error);
        });

    // cJDLwNTjwtU:APA91bFuRLgKnzLXZKiFoaTYPpCcpY7Yj_jKtihGJC2YhxFpZ5ZVQVFM4ItWZl-cIf2ZO-ckrldOIqG7vYmXYRoL2xoorJ9NlW4bAnNYdJ9mopdtswWjliyQck-odWF9j4fu9c_mXpJX
});

/*
 * 오늘의 경기시작 - 저녁 9:55 시에 호출
 */
router.get('/fcm/match', function (req, res, next) {
    let todaysMatch = spex.Summary.getRecentGame();

    let today = moment().format('YYYYMMDD');
    let gDate = moment(todaysMatch.date).format('YYYYMMDD');

    if (today != gDate || gDate === undefined) {
        makeResponse(res, false, '경기가없습니다.');
        return;
    }

    let red = spex.Team.get_sync(todaysMatch.game_info.red_team.id).info.name;
    let blue = spex.Team.get_sync(todaysMatch.game_info.blue_team.id).info.name;

    if ((!red) || (!blue)) {
        makeResponse(res, false, '경기가없습니다.');
        return;
    }

    let payload = {
        notification: {
            sound: "default",
            title: 'SPEX 경기시작알림 {0}vs{1}'.format(red, blue),
            body: '유튜브중계채널'
        },
        data: {
            broadcast: '{0}'.format('https://www.youtube.com/channel/UC3BbT7KLo7hTcyFLcsvjrNw')
        }
    };

    // Set the message as high priority and have it expire after 24 hours.
    var options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    sendNotification(payload)
        .then(function (response) {
            makeResponse(res, true, response);
        })
        .catch(function (error) {
            makeResponse(res, false, error);
        });
});

/*
 * 오늘의 경기시작 일정 공지 - 오전 10:00 시에 호출
 */
router.get('/fcm/today', function (req, res, next) {
    let todaysMatch = spex.Summary.getRecentGame();

    let today = moment().format('YYYYMMDD');
    let gDate = moment(todaysMatch.date).format('YYYYMMDD');

    if (today != gDate || gDate === undefined) {
        makeResponse(res, false, '경기가없습니다.');
        return;
    }

    let red = spex.Team.get_sync(todaysMatch.game_info.red_team.id).info.name;
    let blue = spex.Team.get_sync(todaysMatch.game_info.blue_team.id).info.name;

    if ((!red) || (!blue)) {
        makeResponse(res, false, '경기가없습니다.');
        return;
    }

    let payload = {
        notification: {
            sound: "default",
            title: 'SPEX 오늘의 경기',
            body: '{0}vs{1} - {2}'.format(red, blue,
                moment(todaysMatch.date).format('MM월DD일 HH:mm'))
        },
        data: {
            url: 'http://spex.me/s2/game/preview/{0}'.format(todaysMatch.game_id)
        }
    };

    // Set the message as high priority and have it expire after 24 hours.
    var options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    sendNotification(payload)
        .then(function (response) {
            makeResponse(res, true, response);
        })
        .catch(function (error) {
            makeResponse(res, false, error);
        });
});

/*
 * 오늘 경기 엔트리 확정 종료 당일 오후 5:00
 */
router.get('/fcm/expire/today', function (req, res, next) {
    let todaysMatch = spex.Summary.getRecentGame();

    let today = moment().format('YYYYMMDD');
    let gDate = moment(todaysMatch.date).format('YYYYMMDD');

    if (today != gDate || gDate === undefined) {
        makeResponse(res, false, '경기가없습니다.');
        return;
    }

    let gid = todaysMatch.game_id;
    spex.Game.get(gid)
        .then(function (G) {

            let red = spex.Team.get_sync(todaysMatch.game_info.red_team.id);
            let blue = spex.Team.get_sync(todaysMatch.game_info.blue_team.id);

            G.expired = true;
            //for debugging 
            let payload = {
                notification: {
                    sound: "default",
                    title: '엔트리 확정 종료',
                    body: '{0}경기 {1}vs{2} 엔트리 확정 종료 되었습니다.'.format(
                        moment(todaysMatch.date).format('YYYY.MM.DD'),
                        red.info.name,
                        blue.info.name
                    )
                },
                data: {
                    url: 'http://spex.me/s2/game/preview/{0}'.format(todaysMatch.game_id)
                }
            };
            let promises = [];
            promises.push(spex.Game.save(G));
            promises.push(sendMessage(red.info.leader, payload));
            promises.push(sendMessage(blue.info.leader, payload));

            spex.Member.getByLevel(3)
                .then(members => {
                    if (members !== undefined) {
                        members.forEach((m, i) => {
                            promises.push(sendMessage(m.id, payload));
                        })
                    }
                })

            Promise.all(promises)
                .then(values => {
                    let SR = values[0];
                    makeResponse(res, true, SR);
                }).catch((E) => {
                    makeResponse(res, false, E);
                });

        }).catch((E) => {
            makeResponse(res, false, E);
        })
});

/*
 * 팀원 엔트리 등록시 팀장한테 노티 전송
 */
router.post('/fcm/entry', function (req, res, next) {
    let register_id = req.body.id,
        team_id = req.body.team_id,
        game_id = req.body.gid;

    spex.Team.get(team_id)
        .then(T => {
            let leader = T.info.leader;
            //for debugging 
            debugMessage({
                notification: {
                    sound: "default",
                    title: '{0}님의 엔트리 등록'.format(register_id.toShortID()),
                    body: '경기 당일 오후 5시까지 엔트리 지정을 완료 해 주세요.'
                },
                data: {
                    url: 'http://spex.me/s2/game/preview/{0}'.format(game_id)
                }
            });

            let payload = {
                notification: {
                    sound: "default",
                    title: '{0}님의 엔트리 등록'.format(register_id.toShortID()),
                    body: '경기 당일 오후 5시까지 엔트리 지정을 완료 해 주세요.'
                },
                data: {
                    url: 'http://spex.me/s2/game/preview/{0}'.format(game_id)
                }
            };

            sendMessage(leader, payload)
                .then(function (response) {
                    makeResponse(res, true, response);
                })
                .catch(function (error) {
                    makeResponse(res, false, error);
                });

        }).catch(E => {
            makeResponse(res, false, E);
        })

});


/*
 * 팀원 가입시 팀장한테 전송
 */
router.post('/fcm/teamjoin', function (req, res, next) {
    let register_id = req.body.id,
        team_id = req.body.team_id;

    spex.Team.get(team_id)
        .then(T => {
            let leader = T.info.leader;
            //for debugging 
            debugMessage({
                notification: {
                    sound: "default",
                    title: '{0}님이 가입요청했습니다.'.format(register_id.toShortID()),
                    body: '가입확인 후 승인버튼을 눌러주세요.'
                },
                data: {
                    url: 'http://spex.me/s2/teaminfo/{0}'.format(team_id)
                }
            });

            let payload = {
                notification: {
                    sound: "default",
                    title: '{0}님이 가입요청했습니다.'.format(register_id.toShortID()),
                    body: '가입확인 후 승인버튼을 눌러주세요.'
                },
                data: {
                    url: 'http://spex.me/s2/teaminfo/{0}'.format(team_id)
                }
            };

            sendMessage(leader, payload)
                .then(function (response) {
                    makeResponse(res, true, response);
                })
                .catch(function (error) {
                    makeResponse(res, false, error);
                });

        }).catch(E => {
            makeResponse(res, false, E);
        })

});

var sendNotification = function (payload) {
    return new Promise((resolve, reject) => {
        let topic = 'message';
        let options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };

        admin.messaging().sendToTopic(topic, payload, options)
            .then(resolve)
            .catch(reject);
    });
}

var sendMessage = function (id, payload) {
    return new Promise((resolve, reject) => {
        spex.FCM.getAllById(id)
            .then(fcm => {
                if (fcm !== null && fcm !== undefined) {

                    if (Array.isArray(fcm)) {

                        let promises = [];

                        fcm.forEach((f, i) => {
                            let registrationToken = f.token;

                            // Set the message as high priority and have it expire after 24 hours.
                            var options = {
                                priority: "high",
                                timeToLive: 60 * 60 * 24
                            };

                            promises.push(admin.messaging().sendToDevice(registrationToken, payload, options));
                            console.log('MSG to [{0}] - {1}'.format(f.id, f.token));
                        })

                        Promise.all(promises)
                            .then(values => {
                                resolve(values);
                            }).catch(reject);

                    } else {
                        let registrationToken = fcm.token;

                        // Set the message as high priority and have it expire after 24 hours.
                        var options = {
                            priority: "high",
                            timeToLive: 60 * 60 * 24
                        };

                        admin.messaging().sendToDevice(registrationToken, payload, options)
                            .then(function (response) {
                                console.log('MSG to [{0}] - {1}'.format(fcm.id, response));
                                resolve(response);
                            })
                            .catch(reject);
                    }
                }
            }).catch(resolve(null));
    });
}


var debugMessage = function (payload) {
    //for debugging 
    return new Promise((resolve, reject) => {
        spex.FCM.getAllById('부모-31350')
            .then(fcm => {
                if (fcm !== null && fcm !== undefined) {

                    if (Array.isArray(fcm)) {

                        let promises = [];

                        fcm.forEach((f, i) => {
                            let registrationToken = f.token;

                            // Set the message as high priority and have it expire after 24 hours.
                            var options = {
                                priority: "high",
                                timeToLive: 60 * 60 * 24
                            };

                            promises.push(admin.messaging().sendToDevice(registrationToken, payload, options));
                        })

                        Promise.all(promises)
                            .then(resolve).catch(reject);

                    } else {
                        let registrationToken = fcm.token;

                        // Set the message as high priority and have it expire after 24 hours.
                        var options = {
                            priority: "high",
                            timeToLive: 60 * 60 * 24
                        };

                        admin.messaging().sendToDevice(registrationToken, payload, options)
                            .then(function (response) {
                                resolve(response);
                            })
                            .catch(reject);
                    }
                }
            })
    });
    // end for debugging 

}


var makeResponse = function (res, success, payload) {
    res.json({
        success: success,
        info: payload,
    });
}

router.post('/fcm/register', function (req, res, next) {
    let token = req.body.token;
    let id = req.body.id;

    console.log('FCM : {0}/{1}'.format(id, token));

    spex.FCM.get(token)
        .then(fcm => {
            if (fcm === null || fcm === undefined) {
                spex.FCM.create(token)
                    .then(newToken => {
                        newToken.id = id;
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


module.exports = router;
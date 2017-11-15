var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var spex = require('zspex-module');
var _ = require('underscore');
var TIERS = require('./ranks');

router.authMiddleware = (req, res, next) => {
    // console.dir(req.headers);
    let token = req.headers['x-access-token'] || req.query.token || req.cookies['token'];
    if (!token) {
        // 토큰기반자동로그인
        res.render('session_verify.ejs', {});
        // console.log('no have token');
    } else {
        var security = req.app.get('jwt-secret');

        jwt.verify(token, security, (err, decoded) => {
            if (err) {
                if (_.isEqual(err.name, 'TokenExpiredError')) {
                    console.log('token expired : {0}'.format(token));
                    res.redirect('/s2/signin');
                    return;
                }
            }
            // session이 있지만 만료되었을 때 원터치 로그인
            let {
                battletag,
                exp
            } = decoded;

            spex.Member.getMember(battletag)
                .then(M => {
                    var MemberInfo = M.toJSON(),
                        teamInfo = spex.Team.get_sync(MemberInfo.league.s02.team);

                    teamInfo = _.isNull(teamInfo) ? {
                        teamid: 0,
                        season: 2,
                        info: {
                            name: '',
                            logo: '',
                            leader: '',
                            comment: '',
                            leagueSummary: {
                                win: 0,
                                lose: 0
                            }
                        }

                    } : teamInfo;

                    MemberInfo.competitive = _.isNull(MemberInfo.competitive) || _.isUndefined(MemberInfo.competitive) ? {
                        score: 0,
                        max_score: 0,
                    } : MemberInfo.competitive;
                    // console.dir(ranks.TIERS);
                    // console.dir(MemberInfo.competitive);
                    // console.dir(TIERS[Math.floor(MemberInfo.competitive.max_score / 500)]);
                    var sessionJson = {
                        battleTag: MemberInfo.id.toDisplayID(),
                        player: MemberInfo.account.player,
                        competitiveInfo: {
                            tier: TIERS[Math.floor(MemberInfo.competitive.max_score / 500)],
                            score: MemberInfo.competitive.score,
                            max_score: MemberInfo.competitive.max_score,
                        },
                        leagueInfo: {
                            teamID: MemberInfo.league.s02.team,
                            teamName: teamInfo.info.name,
                            teamLogo: teamInfo.info.logo,
                            accepted: MemberInfo.league.s02.accepted,
                        }
                    }
                    req.session = sessionJson;
                    next();
                }).catch(E => {
                    console.log(E)
                    // next()
                });
            // req.session = decoded;
        })
    }
}

// 토큰 기반 자동로그인
router.autoSignin = function (req, res, next) {
    let {
        token
    } = req.body;

    // console.log(token);

    if (_.isUndefined(token) || _.isEmpty(token)) {

        res.json({
            success: false,
            info: 'invalid token',
            redirect: '/s2/signin'
        })
        return;
    }

    var security = req.app.get('jwt-secret');

    jwt.verify(token, security, (err, decoded) => {
        // session이 있지만 만료되었을 때 원터치 로그인

        if (err) console.log(err);
        let {
            battletag,
            exp
        } = decoded;
        // console.log(battletag);
        res.cookie('token', token);
        res.json({
            success: true,
            info: decoded,
            redirect: req.headers['referer']
        })
    })
}

router.resignin = function (req, res, next) {
    let {
        user,
    } = req.body;
    let battletag = user.toRequestID();

    var jwt = require('jsonwebtoken');
    var secret = req.app.get('jwt-secret');

    spex.Member.getMember(battletag)
        .then(M => {
            let signin_token;

            jwt.sign({
                _id: M._id,
                battletag: M.id,
            }, secret, {
                expiresIn: '7d',
                issuer: 'spex.me',
                subject: 'userInfo'
            }, (err, token) => {
                if (err) console.log(err);
                signin_token = token;
                res.cookie('token', token);
                console.log(token);

                res.json({
                    accept: true,
                    save: M.account.security.savepassword,
                    info: {
                        id: M.id,
                        icon: M.account.player.icon,
                        level: M.account.security.account_type,
                        token: signin_token,
                    }
                })

            })


        }).catch(err => {
            console.error(err);
            res.json({
                accept: false,
                message: '아이디({0})를 찾을수 없습니다. 대소문자/배틀태그를 확인해주세요'.format(req.body.user),
            });
        });
}

router.signin = function (req, res, next) {
    let {
        user,
        password,
        save
    } = req.body;
    let battletag = user.toRequestID();
    save = Boolean(save);

    // console.log(_.isEqual(save, true));

    spex.Member.getMember(battletag)
        .then(M => {
            if (M.verify(password)) {
                var jwt = require('jsonwebtoken');
                var secret = req.app.get('jwt-secret');

                let signin_token;

                jwt.sign({
                    _id: M._id,
                    battletag: M.id,
                }, secret, {
                    expiresIn: '7d',
                    issuer: 'spex.me',
                    subject: 'userInfo'
                }, (err, token) => {
                    if (err) console.log(err);
                    signin_token = token;
                    res.cookie('token', token);
                    console.log(token);
                })

                M.account.security.savepassword = save;

                spex.Member.saveMember(M)
                    .then(SR => {
                        res.json({
                            accept: true,
                            save: save,
                            info: {
                                id: M.id,
                                icon: M.account.player.icon,
                                level: M.account.security.account_type,
                                token: signin_token,
                            }
                        })
                    })
                    .catch(E => {
                        console.log(E);
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
        }).catch(err => {
            console.error(err);
            res.json({
                accept: false,
                message: '아이디({0})를 찾을수 없습니다. 대소문자/배틀태그를 확인해주세요'.format(req.body.user),
            });
        });
}

module.exports = router;
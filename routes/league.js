var express = require('express');
var router = express.Router();
var OverwatchStatics = require('OverwatchStatics');

const ACTION_JOIN = 1;
const ACTION_ACCEPT = 2;

router.get('/scream', function (req, res, next) {
    OverwatchStatics.scream.getGameInfo()
        .then((data) => {
            res.render('team_league/scream.ejs', {
                navigation: 'team_league',
                game_info: data,
            });
        });
});

router.get('/detail', function (req, res, next) {
    let gid = req.query.gid;

    OverwatchStatics.scream.getRoundInfo(gid)
        .then((data) => {
            res.render('team_league/detail.ejs', {
                navigation: 'team_league',
                game_info: {
                    game_id: gid
                },
                round_info: data,
            });
        });
});

router.get('/gameinfo', function (req, res, next) {
    let week = req.query.week;
    OverwatchStatics.scream.getGamesInfo()
        .then((values) => {

            let response = [];
            values.forEach(function (v, i) {
                if (v.week == week) {
                    response.push(v);
                }
            });
            // log(response);
            res.json(response);
        });
});


router.get('/dashboard', function (req, res, next) {

    let promises = [
        OverwatchStatics.scream.getLeagueScore(),
        //OverwatchStatics.scream.getCurrentWeekGames(),
        OverwatchStatics.scream.getGameScore(),
        OverwatchStatics.scream.getGamesInfo(),
    ];

    Promise.all(promises)
        .then((values) => {
            var video = '';
            let games = values[2];
            games.forEach(function (v, i) {
                if (v.game_link.length > 1) {
                    video = v.game_link;
                }
            });
            let response = {
                league_point: values[0],
                // this_week_games: values[1],
                team_score: values[1],
                // games_info: values[3],
                video: video,
            }
            res.render('team_league/dashboard.ejs', {
                navigation: 'team_league',
                dashboard_info: response,
            });
        });

});



router.get('/team', function (req, res, next) {
    OverwatchStatics.statics.getTeamListInfo(function (error, results) {
        res.render('team_league/team.ejs', {
            navigation: 'team_league',
            teaminfo: results
        });
    });
});

router.get('/userteam', function (req, res, next) {
    let userid = req.query.user_id;
    OverwatchStatics.session.SessionUserInfo(userid)
        .then((results) => {
            let response = {
                user_id: results.id,
                hasTeam: results.team !== 0
            }
            res.json(response);
        });
});


router.get('/search_activity', function (req, res, next) {
    let userid = req.query.user_id;
    let teamid = req.query.team_id;
    OverwatchStatics.statics.getTeamJoinRequest(teamid, function (error, results) {
        let response = {
            hasRequest: results.length > 0,
            activity: results,
        }
        res.json(response);
    });
});

router.get('/join_request', function (req, res, next) {

    let teamid = req.query.team_id;

    OverwatchStatics.statics.getTeamJoinRequest(teamid, function (error, results) {
        res.render('team_league/join_request.ejs', {
            navigation: 'team_league',
            team_request: results,
        });
    });
});

router.get('/join_accept', function (req, res, next) {
    let userid = req.query.user_id;
    let teamid = req.query.team_id;

    OverwatchStatics.statics.acceptJoinTeam(userid, teamid, function (error, results) {
        return res.redirect('/league/teaminfo?teamid=' + teamid);

        //                    res.render('team_league/join_request.ejs', {
        //           navigation: 'team_league',
        //           team_request: results,
        //       });
    });
});



router.get('/teaminfo', function (req, res, next) {
    let teamid = req.query.teamid;

    OverwatchStatics.statics.getTeamDetailInfo(teamid, function (error, results) {
        let response = {
            team_info: "",
            team_member_info: [],
            team_activity: [],
        }
        response.team_info = results.team_info;
        // response.team_activity = results.team_activity;
        results.team_member_info.forEach(function (element) {
            let user_info = {
                user_info_id: element.id.toDisplayID(),
                user_info_rank: element.rank,
                user_info_avatar: element.avatar,
                user_info_profile: JSON.parse(element.profile),
                user_info_competitive_global: JSON.parse(element.competitive_global),
                user_info_competitive: JSON.parse(element.competitive),
                user_info_quickplay_global: JSON.parse(element.quickplay_global),
                user_info_quickplay: JSON.parse(element.quickplay),
                user_info_hasCompetitive: false,
            }

            if (user_info.user_info_profile.rank > 0)
                user_info.user_info_hasCompetitive = true;
            response.team_member_info.push(user_info);

        }, this);

        results.team_activity.forEach(function (element) {
            response.team_activity.push({
                action: element.action,
                action_from: element.action_from.toDisplayID(),
                action_to: element.action_to,
                user_avatar: element.avatar,
                timestamp: new Date(element.timestamp).toString("hh:mm:ss"),
            });
        }, this);

        res.render('team_league/teaminfo.ejs', {
            navigation: 'team_league',
            teaminfo: response
        });
    });
});

Date.prototype.hhmmss = function () {
    // var yyyy = this.getFullYear();
    // var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
    // var dd = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
    var hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
    var min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
    var ss = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
    return "".concat(hh).concat("+").concat(min).concat("+").concat(ss).concat(" am");
};

router.get('/join', function (req, res, next) {
    log(req.query);
    let userid = req.query.user_id.toRequestID();
    OverwatchStatics.statics.requestTeamJoin(userid, req.query.request_to, req.query.action, function (error, results) {
        if (error) res.json(error);
        res.json({
            success: true
        });
    });

});

router.get('/create_game', function (req, res, next) {
    let gid = req.query.gid;

    let promises = [
        OverwatchStatics.scream.getLeagueTeamInfo(),
        OverwatchStatics.scream.getGameInfoById(gid)
    ];

    Promise.all(promises).then(function (values) {
        res.render('team_league/game_write.ejs', {
            navigation: 'team_league',
            gid: gid,
            team_info: values[0],
            game_info: values[1],
        });
    });

});

router.post('/game_insert', function (req, res, next) {
    let gid = req.body.gid;
    let game_date = req.body.game_date;
    let game_time = req.body.game_time;
    let blue_team = req.body.blue_team_id;
    let red_team = req.body.red_team_id;
    let won_team = req.body.won_team_id;
    let game_link = req.body.game_link;
    let potg_link = req.body.potg_link;
    if (gid === 'undefined' || gid === undefined) {
        OverwatchStatics.scream.insertGame(game_date, game_time, blue_team, red_team)
            .then((result) => {
                return res.redirect('/league/scream');
            });
    } else {
        OverwatchStatics.scream.modifyGame(gid, game_date, game_time, blue_team, red_team, won_team, game_link, potg_link)
            .then((result) => {
                return res.redirect('/league/scream');
            });
        console.log('modify');
    }
});

router.get('/round_insert', function (req, res, next) {
    let gid = req.query.gid;
    let rid = req.query.rid;
    OverwatchStatics.scream.getGameInfoById(gid)
        .then(function (results) {
            var promises = [
                OverwatchStatics.session.getTeamMembers(results.blue_team_id),
                OverwatchStatics.session.getTeamMembers(results.red_team_id),
                OverwatchStatics.scream.getRoundInfo(gid),

            ];
            Promise.all(promises).then(function (values) {
                res.render('team_league/round_write.ejs', {
                    navigation: 'team_league',
                    gid: gid,
                    rid: rid,
                    game_info: results,
                    blue_team_member: values[0],
                    red_team_member: values[1],
                    round_info: values[2],
                });
            });
        });

    // OverwatchStatics.scream.getGameInfos().then(function (e) {
    //         log(e);
    //     },
    //     function (err) {});

    // res.render('team_league/round_write.ejs', {
    //     navigation: 'team_league',
    //     gid: gid,
    //     rid: rid,
    // });
});
router.post('/round_insert', function (req, res, next) {
    let gid = req.body.gid;
    let rid = req.body.rid;
    let battle_ground = req.body.battle_ground;
    let won_team_id = req.body.won_team_id;
    let potg_player_id = req.body.potg_player_id;
    let potg_link = req.body.potg_link;

    let blue_player_1 = req.body.blue_player_1;
    let blue_player_2 = req.body.blue_player_2;
    let blue_player_3 = req.body.blue_player_3;
    let blue_player_4 = req.body.blue_player_4;
    let blue_player_5 = req.body.blue_player_5;
    let blue_player_6 = req.body.blue_player_6;

    let red_player_1 = req.body.red_player_1;
    let red_player_2 = req.body.red_player_2;
    let red_player_3 = req.body.red_player_3;
    let red_player_4 = req.body.red_player_4;
    let red_player_5 = req.body.red_player_5;
    let red_player_6 = req.body.red_player_6;

    OverwatchStatics.scream.LeagueModifyRound(gid, rid, battle_ground, won_team_id, potg_player_id, potg_link, blue_player_1, blue_player_2, blue_player_3, blue_player_4, blue_player_5, blue_player_6, red_player_1, red_player_2, red_player_3, red_player_4, red_player_5, red_player_6)
        .then(() => {
            return res.redirect('/league/detail?gid=' + gid);
        });
});
module.exports = router;
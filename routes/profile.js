var express = require('express');
var router = express.Router();
var OverwatchStatics = require('OverwatchStatics');

router.get('/', function (req, res, next) {
    res.render('profile', {
        step: 'profile',
        profile_id: req.query.id,
    });
});

router.get('/hero', function (req, res, next) {
    let id = req.query.id.toRequestID();
    let compatitive = req.query.compatitive;
    let hero_name = req.query.hero;
    OverwatchStatics.statics.getViewStatics(req.query.id.toRequestID(), function (error, results) {
        let response = {
            user_info_current_rank: results.seq,
            user_id: req.query.id.toDisplayID(),
            user_info_profile: {
                id: results.nick,
                role: results.role,
                team: results.team,
                profile: results.profile
            },
            user_info_hero_data: compatitive ? results.competitive.data[hero_name] : results.quickplay.data[hero_name],
            user_info_timestamp: results.timestamp,
        };
        res.render('user_statics/profile_hero.ejs', {
            step: 'profile',
            profile_id: req.query.id,
            profile_hero_data: response,
        });
    });
});


router.get('/request', function (req, res, next) {

    let id = req.query.id.toRequestID();

    OverwatchStatics.statics.getViewStaticsWithHistory(req.query.id.toRequestID(), function (error, results) {
        if (error || Object.keys(results).length === 0) {
            res.render('error', {
                error: error
            });
            return;
        }
        // log(results.profile);
        let response = {
            data: []
        };

        for (let i = 0; i < results.length; i++) {
            let history = {
                user_info_current_rank: results[i].seq,
                user_id: req.query.id.toDisplayID(),
                user_info_profile: {
                    id: results[i].nick,
                    role: results[i].role,
                    team: results[i].team,
                    profile: results[i].profile
                },
                user_info_has_competitive: results[i].hasCompetitive,
                user_info_quickplay: {
                    portrait: results[i].quickplay_portrait,
                    global: results[i].quickplay_global,
                    data: results[i].quickplay,
                },
                user_info_competitive: {
                    portrait: results[i].competitive_portrait,
                    global: results[i].competitive_global,
                    data: results[i].competitive,
                },
                user_info_date: results[i].date,
                user_info_timestamp: results[i].timestamp,
            }
            response.data.push(history);
        }

        res.json(response);

    });

});



module.exports = router;
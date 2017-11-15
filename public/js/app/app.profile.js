var profile_id = $("#profile-id").text();

// morris
toggleStylesheet('/css/plugins/morris/morris-0.4.3.min.css', 1);

$('head').append('<script src=\'/js/plugins/morris/raphael-2.1.0.min.js\'><\/script>');
$('head').append('<script src=\'/js/plugins/morris/morris.js\'><\/script>');

// ladda
$('head').append('<script src=\'/js/plugins/ladda/spin.min.js\'><\/script>');
$('head').append('<script src=\'/js/plugins/ladda/ladda.min.js\'><\/script>');
$('head').append('<script src=\'/js/plugins/ladda/ladda.jquery.min.js\'><\/script>');


$('head').append('<script src=\'/js/plugins/jquery.tmpl/jquery.tmpl.min.js\'><\/script>');

toggleStylesheet('/css/plugins/ladda/ladda-themeless.min.css', 1);

console.log('app.profile.js loaded ' + profile_id);

$(document).ready(function () {

    // Bind normal buttons
    Ladda.bind('.ladda-button', {
        timeout: 20000
    });

    var l = $('#profile-user-update-request-btn').ladda();
    l.click(function () {
        // Start loading
        l.ladda('start');

        $.get("/users/refreshById", {
            id: profile_id
        }, function (response, status) {
            getUserProfileRequest(true);
            l.ladda('stop');
        });

        // Timeout example
        // Do something in backend and then stop ladda
        setTimeout(function () {
            l.ladda('stop');
        }, 20000)
    });

    getUserProfileRequest(true);

    $('input[name=options]').change(function () {
        var radioValue = $(this).val();
        if (radioValue == 'competitive') {
            getUserProfileRequest(true);
        } else {
            getUserProfileRequest(false);
        }
        // console.log(radioValue);
    });

});



function getUserProfileRequest(is_competitive) {

    $.get("/profile/request", {
        id: profile_id,
    }, function (response, status) {

        if (Object.keys(response).length === 0)
            return;

        // console.log(response.data);

        if (is_competitive && response.data[0].user_info_has_competitive) {
            setCompetitiveView(response.data[0], response.data[1]);
            showMorisChart(response.data);
        } else {
            setQuickplayView(response.data[0], response.data[1]);
        }

        setCommonView(response.data[0], response.data[1]);
    });
}

function setCommonView(json, prev_json) {
    // 현재 동호회 순위
    $("#profile-user-current-rank").text(json.user_info_current_rank);

    if (prev_json) {
        let rank_diff_element = $("#profile-user-current-rank-diff");
        if (prev_json.user_info_current_rank == null) {
            rank_diff_element.html(" 집계전 ");
        } else {
            let rank_diff = prev_json.user_info_current_rank - json.user_info_current_rank;
            rank_diff_element.removeClass('text-danger');
            rank_diff_element.removeClass('text-navy');
            if (rank_diff == 0) {
                rank_diff_element.html(" 변화없음 ");
            } else if (rank_diff > 0) {
                rank_diff_element.html(' <i class="fa fa-play fa-rotate-270"></i> ' + Math.abs(rank_diff));
                rank_diff_element.addClass('text-navy');
            } else {
                rank_diff_element.html(' <i class="fa fa-play fa-rotate-90"></i> ' + Math.abs(rank_diff));
                rank_diff_element.addClass('text-danger');
            }
        }
    }
}

function setQuickplayView(json, prev_json) {
    $("#profile-user-quickplay-btn").parent().addClass('active');

    // $('.competitive').each(function (index) {
    //     $(this).hide();
    // });
    $('.competitive').hide();

    $("#profile-user-id").text(json.user_id.toShortID());

    $("#profile-user-games-won").text(json.user_info_quickplay.global.games_won);

    $("#profile-user-portrait").attr("style", "background-image:url(" + json.user_info_quickplay.portrait + ");");

    let kda = (json.user_info_quickplay.global.eliminations / json.user_info_quickplay.global.deaths).toFixed(1);
    $("#profile-user-kda").text(kda);
    $("#profile-user-eliminations").text($.number(json.user_info_quickplay.global.eliminations));
    if (prev_json) {
        let prev_kda = (prev_json.user_info_quickplay.global.eliminations / prev_json.user_info_quickplay.global.deaths).toFixed(1);
        showDiff($("#profile-user-kda-diff"), prev_kda - kda);
    }

    $("#profile-user-damage-done-average").text($.number(json.user_info_quickplay.global.damage_done_average));
    $("#profile-user-damage-done").text($.number(json.user_info_quickplay.global.damage_done));
    if (prev_json) {
        showDiff($("#profile-user-damage-done-average-diff"), json.user_info_quickplay.global.damage_done_average - prev_json.user_info_quickplay.global.damage_done_average);
    }

    $("#profile-user-healing-done-average").text($.number(json.user_info_quickplay.global.healing_done_average));
    $("#profile-user-healing-done").text($.number(json.user_info_quickplay.global.healing_done));
    if (prev_json) {
        showDiff($("#profile-user-healing-done-average-diff"), json.user_info_quickplay.global.healing_done_average - prev_json.user_info_quickplay.global.healing_done_average);
    }
    showHeroHorizontalBarGraph(json, false);
}

function setCompetitiveView(json, prev_json) {

    // $("#container-row").toggle();
    // $("#container-row").removeClass("animated fadeInDown");
    // $("#container-row").addClass("animated fadeInDown");

    $("#profile-user-competitive-btn").parent().addClass('active');

    $('.competitive').show();

    // $('#profile-user-competitive-btn').attr('checked', "checked");
    // console.log($('#profile-user-competitive-btn').attr('checked'));

    // $("#profile-user-id").text(json.user_id);

    $("#profile-user-id").text(json.user_id.toShortID());

    $("#profile-user-games-won").text(json.user_info_competitive.global.games_won);
    var regex = /.*\/\D+\.png/i;
    var temp = json.user_info_competitive.data.data[json.user_info_competitive.data.order[0].name].thumb.replace('/img/heros/', '').replace('.png', '');
    var current_portrait_image = $("#profile-user-current-image").attr("src", "/img/poster/" + temp + ".jpg");

    // $("#profile-user-portrait").attr("style", "background-image:url(" + json.user_info_competitive.portrait + ");");

    // 경쟁전 점수
    $("#profile-user-rank").text(json.user_info_profile.profile.rank);

    // 주 포지션
    var most_hero_name = json.user_info_competitive.data.order[0].name;
    $("#profile-user-position").html(icon[json.user_info_competitive.data.data[most_hero_name].position]);
    //text(icon.support + " 지원");

    $("#profile-user-rank-picture").attr("src", json.user_info_profile.profile.rankPicture);

    let win_rate = (json.user_info_competitive.global.games_won / json.user_info_competitive.global.games_played * 100).toFixed(1);
    $("#profile-user-win-rate").text((win_rate + "%"));
    $("#profile-user-games-played").text($.number(json.user_info_competitive.global.games_played));
    if (prev_json) {
        let prev_win_rate = (prev_json.user_info_competitive.global.games_won / prev_json.user_info_competitive.global.games_played * 100).toFixed(1);
        showDiff($("#profile-user-win-rate-diff"), prev_win_rate - win_rate);
    }

    let kda = (json.user_info_competitive.global.eliminations / json.user_info_competitive.global.deaths).toFixed(1);
    $("#profile-user-kda").text(kda);
    $("#profile-user-eliminations").text($.number(json.user_info_competitive.global.eliminations));
    if (prev_json) {
        let prev_kda = (prev_json.user_info_competitive.global.eliminations / prev_json.user_info_competitive.global.deaths).toFixed(1);
        showDiff($("#profile-user-kda-diff"), prev_kda - kda);
    }

    $("#profile-user-damage-done-average").text($.number(json.user_info_competitive.global.damage_done_average));
    $("#profile-user-damage-done").text($.number(json.user_info_competitive.global.damage_done));
    if (prev_json) {
        showDiff($("#profile-user-damage-done-average-diff"), json.user_info_competitive.global.damage_done_average - prev_json.user_info_competitive.global.damage_done_average);
    }

    $("#profile-user-healing-done-average").text($.number(json.user_info_competitive.global.healing_done_average));
    $("#profile-user-healing-done").text($.number(json.user_info_competitive.global.healing_done));
    if (prev_json) {
        showDiff($("#profile-user-healing-done-average-diff"), json.user_info_competitive.global.healing_done_average - prev_json.user_info_competitive.global.healing_done_average);
    }

    showHeroHorizontalBarGraph(json, true);
    // $("#container-row").toggle();
}


function showTeamView(json) {

}

function showDiff(element, diff) {
    diff = diff.toFixed(1);
    element.removeClass('text-danger');
    element.removeClass('text-navy');
    if (diff == 0) {
        element.html(" 변화없음 " + ' <i class="fa fa-flash"></i>');
    } else if (diff > 0) {
        element.html((Math.abs(diff) + ' <i class="fa fa-level-up"></i>'));
        element.addClass('text-navy');
    } else {
        element.html((Math.abs(diff) + ' <i class="fa fa-level-down"></i>'));
        element.addClass('text-danger');
    }
}

var time_played_sorting = (a, b) => {
    return parseFloat(b.TimePlayed) - parseFloat(a.TimePlayed);
}

function showHeroHorizontalBarGraph(json, isCompetitive) {
    var container = $("#profile-info-container");
    container.empty();
    // console.log(json);

    var data = [];
    if (isCompetitive) {
        var info = json.user_info_competitive.data.data;
    } else {
        var info = json.user_info_quickplay.data.data;
    }

    if (info === undefined) return;

    Object.keys(info).forEach(function (key) {

        var timeplayed = getNumber(info[key].detail.time_played);
        if (isCompetitive) {
            var winrate = (getNumber(info[key].detail.games_won) / getNumber(info[key].detail.games_played) * 100).toFixed(1);
        } else {
            var winrate = getNumber(info[key].detail.games_won);
        }

        data.push({
            Key: key,
            Name: info[key].display_name,
            Portrait: info[key].thumb.replace("/img/heros/", "").replace(".png", ""),
            TimePlayed: timeplayed,
            Value: 0,
            TimeString: toTimeString(timeplayed),
            WinRate: isCompetitive ? (isNaN(winrate) ? 0 : winrate) + "%" : (isNaN(winrate) ? 0 : winrate),
            Kda: (getNumber(info[key].detail.eliminations) / getNumber(info[key].detail.deaths)).toFixed(1),
            Collapsed: '',
        });
    });


    data.sort(time_played_sorting);
    var maxValue = data[0].TimePlayed;

    var i = 0;
    data.forEach(function (e) {
        e.Value = e.TimePlayed / maxValue * 100;
        e.Value = isNaN(e.Value) ? 0 : e.Value.toFixed(0);
        if (i++ > 4) e.Collapsed = 'collapse  time-line-collapsed';
    });

    var markup = "<a class=\" ${Collapsed}  \" href=\"/profile/hero?id=" + profile_id + "&hero=${Key}&compatitive=" + isCompetitive + "\">" +
        "    <div class=\"col-xs-12 col-sm-12 col-md-6 profile-hero-bg text-white\" style=\"background-image:url(/img/poster-sm/${Portrait}.jpg);\">" +
        "        <p class=\"profile-hero-name \">${Name}</p> " +
        "        <div class=\"progress progress-mini \">" +
        "            <div style=\"width: ${Value}%; \" class=\"progress-bar\"></div>" +
        "        </div>" +
        "        <ul class=\"pull-right\">" +
        "            <li><small>목숨당처치</small> <strong>${Kda}</strong></li>";
    markup +=
        isCompetitive ?
        "            <li><small>승률</small> <strong>${WinRate}</strong></li>" :
        "            <li><small>승리</small> <strong>${WinRate}</strong><small>회</small></li>";
    markup +=
        "            <li><small>플레이시간</small> <strong>${TimeString}</strong></li>" +
        "        </ul>" +
        "    </div>" +
        " </a>";

    // var markup = "<div class=\"row ${Collapsed}\">" +
    //     "   <div class=\"col-lg-12 \">" +
    //     "        <div class=\"portrait bg-sm-portrait-${Portrait} \"></div>" +
    //     "        <div class=\"description \">" +
    //     "            <h3>${Name}</h3>" +
    //     "            <div class=\"progress progress-mini \">" +
    //     "                <div style=\"width: ${Value}%; \" class=\"progress-bar \"></div>" +
    //     "            </div>" +
    //     "            <div class=\"text-left \">" +
    //     "                <small>" +
    //     "        <i class=\"fa fa-comments-o \"></i> ${WinRate}" +
    //     "        <i class=\"fa fa-user \"></i> 목숨당처치" +
    //     "        <i class=\"fa fa-clock-o \"></i> 플레이시간 ${TimeString}" +
    //     "        </small>" +
    //     "            </div>" +
    //     "        </div>" +
    //     "    </div>" +
    //     "</div>";

    // Compile the markup as a named template
    $.template("heroinfoTemplate", markup);

    // Render the template with the movies data and insert
    // the rendered HTML under the "movieList" element
    $.tmpl("heroinfoTemplate", data).appendTo(container);

}

function showMorisChart(history) {
    if ($("#morris-bar-chart").length === 0)
        return;

    $("#morris-bar-chart").empty();

    let rank_data = [];

    for (let i = history.length - 1; i > -1; i--) {
        // console.log(history[i]);
        let d = {
            y: history[i].user_info_date,
            a: history[i].user_info_profile.profile.rank
        }
        rank_data.push(d);
    }

    Morris.Line({
        element: 'morris-bar-chart',
        data: rank_data,
        xkey: 'y',
        ykeys: ['a'],
        labels: ['경쟁전점수'],
        hideHover: 'auto',
        resize: true,
        ymin: 'auto',
        ymax: 'auto',
        yLabelFormat: function (y) {
            return y != Math.round(y) ? '' : y;
        },
        barColors: ['#54cdb4', '#1ab394'],
    });
}

var icon = {
    support: '<h3><span><svg viewBox="0 0 32 32" role="presentation" class="icon"><title>Support</title><path fill-rule="evenodd" d="M29.3,10.2h-7.5V2.7c0-1.5-1.2-2.7-2.7-2.7h-6.3c-1.5,0-2.7,1.2-2.7,2.7v7.5H2.7c-1.5,0-2.7,1.2-2.7,2.7v6.3c0,1.5,1.2,2.7,2.7,2.7h7.5v7.5c0,1.5,1.2,2.7,2.7,2.7h6.3c1.5,0,2.7-1.2,2.7-2.7v-7.5h7.5c1.5,0,2.7-1.2,2.7-2.7v-6.3C32,11.4,30.8,10.2,29.3,10.2z"></path></svg> 지원</span></h3>',
    tank: '<h3><span><svg viewBox="0 0 32 32" role="presentation" class="icon"><title>Tank</title><path d="M29,10.7c0,2.1,0,4.1,0,6.2c0,0.6-0.1,1.1-0.4,1.6c-2.9,5.3-6.8,9.7-11.8,13.2c-0.6,0.4-1,0.4-1.6,0 c-4.9-3.4-8.8-7.8-11.7-13c-0.3-0.6-0.4-1.2-0.4-1.8c0-3.9,0.1-7.8,0-11.7C3,2.3,5.2,1.9,7.1,1.4C10.4,0.6,13.3,0,16.6,0 c3.1,0,7.7,1.1,9.4,1.6c1.3,0.4,2.7,0.9,2.9,2.2C29,4.9,28.9,6,29,7.1C29,8.3,29,9.5,29,10.7C29,10.7,29,10.7,29,10.7z"></path></svg> 돌격</span></h3>',
    defense: '<h3><span><svg viewBox="0 0 32 32" role="presentation" class="icon"><title>Defense</title><path d="M16,10.8c-2,0-4,0-6.1,0c-1.7,0-3.1-1.4-3.1-3.1c0-2,0-3.9,0-5.9c0-1,0.8-1.8,1.7-1.8c0.3,0-0.1,0,0.2,0 C10,0,9.9,1.3,9.9,1.6c0,0.7,0,0.3,0,1c0,0.3,0.1,0.4,0.4,0.4c0.7,0,1.5,0,2.2,0c0.2,0,0.4-0.2,0.4-0.4c0-0.4,0-0.8,0-1.2 c0-0.8,0.7-1.4,1.4-1.4c1.4,0,2,0,3.4,0c1.1,0,1.4,1.2,1.3,1.5c0,0.7,0,0.4,0,1.1c0,0.3,0.1,0.5,0.5,0.5c0.7,0,1.4,0,2.1,0 c0.4,0,0.5-0.1,0.5-0.5c0-0.7,0-0.7,0-1.4c0-0.3,0.1-1.2,1.3-1.2c0.4,0-0.1,0,0.4,0c0.8,0,1.4,0.7,1.4,1.5c0,2.1,0,4.3,0,6.4 c0,1.5-1.4,2.8-2.9,2.8C20.2,10.8,18.1,10.8,16,10.8z"></path> <path d="M28.2,27.4c0-1-0.6-1.6-1.6-1.6c-0.5,0-1.7-0.1-2.1-0.6c-1.3-1.6-1.8-3.2-2.1-5.2c-0.4-2.4-0.3-3.8-0.4-6.2 c0-0.6,0-0.6-0.6-0.6c-3.7,0-7.3,0-11,0c-0.7,0-0.7,0-0.7,0.7c0,2.4,0,3.7-0.4,6.1c-0.3,1.9-0.8,3.8-2.2,5.3 c-0.3,0.3-1.4,0.5-2,0.5c-1,0-1.6,0.6-1.6,1.6c0,0.9,0,1.8,0,2.8c0,1.2,0.6,1.8,1.8,1.8c3.5,0,7,0,10.4,0c3.5,0,7,0,10.5,0 c1.1,0,1.7-0.6,1.7-1.7C28.2,29.3,28.3,28.4,28.2,27.4z"></path> </svg> 수비</span></h3>',
    offense: '<h3><span><svg viewBox="0 0 32 32" class="icon"><title>Offense</title><g><rect x="2.1" y="28.1" width="7.1" height="3.9"></rect><path d="M9.1,7c0,0,0-0.5,0-0.7C8.6,1.5,5.6,0,5.6,0s-3,1.5-3.5,6.3c0,0.2,0,0.7,0,0.7v18.4h3.5h3.5V7z"></path></g><g><rect x="12.5" y="28.1" width="7.1" height="3.9"></rect><path d="M19.5,7c0,0,0-0.5,0-0.7C19,1.5,16,0,16,0s-3,1.5-3.5,6.3c0,0.2,0,0.7,0,0.7v18.4H16h3.5V7z"></path></g><g><rect x="22.9" y="28.1" width="7.1" height="3.9"></rect><path d="M29.9,7c0,0,0-0.5,0-0.7C29.4,1.5,26.4,0,26.4,0s-3,1.5-3.5,6.3c0,0.2,0,0.7,0,0.7v18.4h3.5h3.5V7z"></path></g></svg> 공격</span></h3>',

}

var toTimeString = (time) => {
    if (time > 3600000)
        return (time / 3600000).toFixed(0) + '시간';
    else if (time > 60000)
        return (time / 60000).toFixed(0) + '분';
    else
        return time.toFixed(0) + '초';
}

var getNumber = (v) => {
    return isNaN(parseInt(v)) ? 0 : v;
}
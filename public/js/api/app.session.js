(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-102917924-1', 'auto');
ga('send', 'pageview');

$(document).ready(function () {

    checkValidSigninInfo();

    // load from localStorage
    var session = getSessionInfo();
    console.log(session);

    if (getSessionUserRole() != 2) {
        $(location).attr('href', '/');
    }

    setLayoutUserInfo(session);

    // if (localStorageSupport()) {
    //     var user_id = localStorage.getItem("store_user_id");
    //     if (user_id) {

    //         $.get("/session", {
    //             user_id: user_id,
    //         }, function (response, status) {
    //             if (response.signup) {
    //                 localStorage.removeItem("store_user_id");
    //                 $(location).attr('href', '/');
    //             }
    //             setLayoutUserInfo(response);
    //             checkUsersPoll(response);
    //             return;
    //         });
    //     }
    // }

    // // load from sessionStroage    
    // if (sessionStorage.getItem("user_id")) {
    //     if (sessionStorage.getItem("user_id") !== 'guest') {
    //         $.get("/session", {
    //             user_id: sessionStorage.getItem("user_id"),
    //         }, function (response, status) {
    //             setLayoutUserInfo(response);
    //             checkUsersPoll(response);
    //             return;
    //         });
    //     }
    // }

    // setLayoutUserInfo();
    commitUserRoleView();

    navigationActive();

});

function navigationActive() {
    let url = new URL(window.location.href);
    let navi_name = url.pathname;

    var added = false;
    $(".session-navigation").each(function (index) {
        if ($(this).attr('href') == navi_name && !added) {
            $(this).parent().addClass("active");
            $(this).parent().parent().removeClass("collapse");
            $(this).parent().parent().parent().addClass("active");
            added = true;
        }
    });
}

function setLayoutUserInfo(user) {

    if (typeof user === 'undefined') {
        var user_id = getSessionUser();
        if (user_id === 'guest') {
            setLayoutGuestUserInfo();
        }
        return;
    }
    console.log(user);
    $("#my-info-link").attr("href", "/myinfo?user_id=" + user.user_id.toRequestID());
    $(".session-user-info-avatar").attr("src", user.user_avatar)
    $("#session-user-id").text(user.user_id);
}

function setLayoutGuestUserInfo() {
    console.log('setLayoutGuestUserInfo');
    $("#session-user-id").text("게스트");
    $(".session-team-info").hide();
}

function getSessionInfo() {
    if (localStorageSupport() && localStorage.getItem("store_user_id") !== null) {
        var session = {
            user_id: localStorage.getItem("store_user_id"),
            user_role: localStorage.getItem("store_user_role"),
            user_team: localStorage.getItem("store_user_team"),
            user_avatar: localStorage.getItem("store_user_avatar"),
        }
        return session;
    }
    return {
        user_id: sessionStorage.getItem("user_id"),
        user_role: sessionStorage.getItem("user_role"),
        user_team: sessionStorage.getItem("user_team"),
        user_avatar: sessionStorage.getItem("user_avatar"),
    };
}

function checkUsersPoll(user) {
    if (user.user_poll == 0 && $(location)[0].pathname !== '/poll' && user.user_id !== 'guest') {
        $(location).attr('href', '/poll');
        return;
    }
    console.log(user);
    // console.log(user);
}

function getSessionUser() {
    if (localStorageSupport()) {
        var user_id = localStorage.getItem("store_user_id");
        if (user_id) return user_id;
    }
    return sessionStorage.getItem("user_id");
}

// 사용자 팀 가져오기
function getSessionUserTeam() {
    if (localStorageSupport()) {
        var user_id = localStorage.getItem("store_user_team");
        if (user_id) return user_id;
    }
    return sessionStorage.getItem("user_team");
}

// 사용자 역할 가져오기
function getSessionUserRole() {
    if (localStorageSupport()) {
        var user_id = localStorage.getItem("store_user_role");
        if (user_id) return user_id;
    }
    return sessionStorage.getItem("user_role") === null ? 0 : parseInt(sessionStorage.getItem("user_role"));
}

function commitUserRoleView() {

    var role_level = getSessionUserRole();
    console.log('사용자 레벨 :' + role_level);

    if (role_level > 0) {
        $(".user_role_level_1").show();
    } else {
        $(".user_role_level_1").hide();
    }

    if (role_level > 1) {
        $(".user_role_level_2").show();
    } else {
        $(".user_role_level_2").hide();
    }
    // 게스트 계정일 때
    if (role_level == 0) {
        $('.guest-hide').hide();
    }
}

// check if browser support HTML5 local storage
function localStorageSupport() {
    return (('localStorage' in window) && window['localStorage'] !== null)
}


// 로그인 정보 없이 로그인 시 사용자 화면으로
function checkValidSigninInfo() {
    if (localStorageSupport()) {

        if ((localStorage.getItem('store_user_id') == null) && (sessionStorage.getItem("user_id") == null)) {
            $(location).attr('href', '/');
            return;
        }
    } else {
        if (!sessionStorage.getItem("user_id")) {
            $(location).attr('href', '/');
        }
    }
}

function toggleStylesheet(href, onoff, media) {
    var existingNode = 0 //get existing stylesheet node if it already exists:
    for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].href && document.styleSheets[i].href.indexOf(href) > -1) existingNode = document.styleSheets[i].ownerNode
    }
    if (onoff == undefined) onoff = !existingNode //toggle on or off if undefined
    if (onoff) { //TURN ON:
        if (existingNode) return onoff //already exists so cancel now
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        if (media !== undefined) {
            link.media = media;
        }
        var head = document.getElementsByTagName('head')[0]
        head.insertBefore(link, head.childNodes[0]);
    } else { //TURN OFF:
        if (existingNode) existingNode.parentNode.removeChild(existingNode)
    }
    return onoff
}

String.prototype.toShortID = function () {
    var regex = /(\#|\-).[0-9]+/i;
    return this.replace(regex, "");
}


String.prototype.toRequestID = function () {
    return this.replace("#", "-");
}
String.prototype.toDisplayID = function () {
    return this.replace("-", "#");
}
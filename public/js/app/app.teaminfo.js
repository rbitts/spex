$(document).ready(function () {


    // ladda
    $('head').append('<script src=\'/js/plugins/ladda/spin.min.js\'><\/script>');
    $('head').append('<script src=\'/js/plugins/ladda/ladda.min.js\'><\/script>');
    $('head').append('<script src=\'/js/plugins/ladda/ladda.jquery.min.js\'><\/script>');

    toggleStylesheet('/css/plugins/ladda/ladda-themeless.min.css', 1);

    // slick carousel
    toggleStylesheet('/css/plugins/slick/slick.css', 1);
    toggleStylesheet('/css/plugins/slick/slick-theme.css', 1);

    $('head').append('<script src=\'/js/plugins/slick/slick.min.js\'><\/script>');



    // 리스트 로딩 후 보여주기
    var slick = $('.slick_demo_2');
    // slick.parent().toggle();
    $(".member-info-view-button").click(function () {
        console.log('aaa');
        slick.parent().toggle();
        $("#member-info-list-view").toggle();
    });


    slick.slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        // centerMode: true,
        responsive: [{
                breakpoint: 1920,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    Ladda.bind('.ladda-button', {
        timeout: 2000
    });

    var l = $('#team-member-request-btn').ladda();

    // 사용자가 가입 요청이 가능한지 확인
    if (getSessionUser() !== 'guest' && getSessionUser !== null) {
        $.get("/league/userteam", {
            user_id: getSessionUser(),
        }, function (response, status) {
            if (response === undefined) return;

            if (!response.hasTeam) {
                l.removeClass('collapse');
            }
        });
    }

    var action_to_team_id = $('#team-info-action-to').text();
    l.click(function () {
        // Start loading
        l.ladda('start');

        // let url = new URL(window.location.href);
        // let searchParams = new URLSearchParams(url.teamid);
        // let teamid = searchParams.get('teamid');

        $.get("/league/join", {
            user_id: getSessionUser(),
            action: 1,
            request_to: action_to_team_id,
        }, function (response, status) {
            l.ladda('stop');
            $(location).attr('href', '/league/teaminfo?teamid=' + action_to_team_id);

        });

        // Timeout example
        // Do something in backend and then stop ladda
        setTimeout(function () {
            l.ladda('stop');
        }, 12000)
    });

});
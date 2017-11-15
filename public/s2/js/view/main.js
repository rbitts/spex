(function ($, window, document, undefined) {
    'use strict';

    // var sl = $('.js-carousel').slick;

    $('.js-carousel').on('afterChange', function (event, slick, currentSlide) {
        // console.log(slick.$slides);
    });

    //'slickGoTo', 10);

})(jQuery, window, document);



(function ($, window, document, undefined) {
    'use strict';

    $('#carouselCus1').slick('setOption', 'responsive', [{
        breakpoint: 1200,
        settings: {
            slidesToShow: 4
        }
    }, {
        breakpoint: 992,
        settings: {
            slidesToShow: 2
        }
    }, {
        breakpoint: 768,
        settings: {
            slidesToShow: 2
        }
    }, {
        breakpoint: 554,
        settings: {
            slidesToShow: 1
        }
    }], true);

    // init cubeportfolio
    $('#js-grid-agency').cubeportfolio({
        filters: '#js-filters-agency',
        layoutMode: 'grid',
        defaultFilter: '*',
        animationType: 'slideLeft',
        gapHorizontal: 35,
        gapVertical: 15,
        gridAdjustment: 'responsive',
        mediaQueries: [{
            width: 1500,
            cols: 5,
        }, {
            width: 1100,
            cols: 4,
        }, {
            width: 800,
            cols: 3,
        }, {
            width: 480,
            cols: 2,
        }],
        caption: 'zoom',
        displayType: 'fadeIn',
        displayTypeSpeed: 100,

        singlePageDelegate: null,
        plugins: {
            loadMore: {
                element: '#js-loadMore-agency',
                action: 'click',
                loadItems: 3,
            }
        },
    });

    $('#carouselTeams').slick('setOption', 'responsive', [{
        breakpoint: 1200,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3
        }
    }, {
        breakpoint: 992,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2
        }
    }, {
        breakpoint: 576,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }], true);

})(jQuery, window, document);


(function ($, window, document, undefined) {
    'use strict';

    if ($.sessionStorage.hasSession()) {

        // android token register
        if (window.Android) {
            window.Android.registerID($.sessionStorage.getID());
            // $.alert('register:{0}'.format($.sessionStorage.getID()));
        }

        $.get('/api/info/myteam/recentgame/{0}'.format($.sessionStorage.getID().toRequestID()), {}, function (response, status) {
            if (response.success) {

                var $entry = $('#entry_section'),
                    $countdown = $entry.find('.js-countdown'),
                    $date = $entry.find('.spex-recent-game-date'),
                    $reg = $entry.find('.spex-recent-game-register'),
                    $image = $entry.find('.spex-recent-game-register-image'),
                    game = response.info;

                var dtime = new Date(game.date);
                $entry.removeClass('g-show-check');
                $date.text('{0}년 {1}월 {2}일 {3}시'.format(dtime.getFullYear(), dtime.getMonth() + 1, dtime.getDate(), dtime.getHours()));
                $countdown.countdown(game.dateString);
                $image.css('background-image', 'url(/img/league/{0}.png)'.format(response.member.league.s02.team));

                $reg.on('click', function (event) {
                    var gid = response.info.game_id,
                        sessionID = $.sessionStorage.getID().toRequestID();

                    if (gid === undefined || sessionID === undefined) {
                        $.alert('등록에 실패했습니다. 정상적인 경로로 접근해주세요.');
                        return;
                    }
                    $.post('/api/entry/{0}'.format(gid), {
                        id: sessionID,
                    }, function (response, status) {
                        if (response.success) {
                            $.alert('등록하였습니다.');
                        } else {
                            $.alert('등록에 실패했습니다. 정상적인 경로로 접근해주세요.');
                        }
                    });
                });
            }
        });
    }

})(jQuery, window, document);


(function ($, window, document, undefined) {
    'use strict';

    $('#jalendar').jalendar({
        sundayStart: true,
        dateType: 'yyyy-mm-dd',
        color: '#fafafa',
        weekColor: '#6d84b4',
        todayColor: '#6d84b4',
        titleColor: '#333333',
        lang: 'KR',
    });
})(jQuery, window, document);
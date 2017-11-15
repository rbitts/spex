(function ($, window, document, undefined) {
    'use strict';

    // init cubeportfolio
    var singlePage = $('#js-singlePage-container').children('div');
    $('#js-grid-slider-projects').cubeportfolio({
        layoutMode: 'slider',
        drag: true,
        auto: false,
        autoTimeout: 5000,
        autoPauseOnHover: true,
        showNavigation: true,
        showPagination: false,
        rewindNav: false,
        scrollByPage: false,
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
            options: {
                caption: '',
                gapVertical: 10,
            }
        }],
        gapHorizontal: 0,
        gapVertical: 25,
        caption: 'overlayBottomReveal',
        displayType: 'fadeIn',
        displayTypeSpeed: 100,

        // lightbox
        lightboxDelegate: '.cbp-lightbox',
        lightboxGallery: true,
        lightboxTitleSrc: 'data-title',
        lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

        // singlePageInline
        singlePageInlineDelegate: '.cbp-singlePageInline',
        singlePageInlinePosition: 'below',
        singlePageInlineInFocus: true,
        singlePageInlineCallback: function (url, element) {
            // to update singlePageInline content use the following method: this.updateSinglePageInline(yourContent)
            var t = this;

            $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'html',
                    timeout: 30000
                })
                .done(function (result) {

                    t.updateSinglePageInline(result);

                })
                .fail(function () {
                    t.updateSinglePageInline('AJAX Error! Please refresh the page!');
                });
        },

        // singlePage popup
        singlePageDelegate: '.cbp-singlePage',
        singlePageDeeplinking: true,
        singlePageStickyNavigation: true,
        singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
        singlePageCallback: function (url, element) {
            // to update singlePage content use the following method: this.updateSinglePage(yourContent)
            var t = this;

            $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'html',
                    timeout: 10000
                })
                .done(function (result) {
                    t.updateSinglePage(result);
                })
                .fail(function () {
                    t.updateSinglePage('AJAX Error! Please refresh the page!');
                });
        }
    });
})(jQuery, window, document);

(function ($, window, document, undefined) {
    'use strict';

    var parent = $("#memberFilterControl");
    var el = parent.find('.filter-button');


    el.each(function (i, e) {

        $(e).bind('click', function (ev) {
            el.removeClass("cbp-filter-item-active");

            var value = $(this).attr('data-filter');
            if (value == "all") {
                //$('.filter').removeClass('hidden');
                $('.filter').show('1000');
            } else {
                //            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
                //            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
                $(".filter").not('.' + value).hide('3000');
                $('.filter').filter('.' + value).show('3000');
            }
            $(this).addClass('cbp-filter-item-active');
        });

    });

})(jQuery, window, document);


(function ($, window, document, undefined) {
    'use strict';

    // join form status
    var sessionID = $.sessionStorage.getID();
    if (sessionID === null || sessionID === undefined)
        return;

    var url = "/api/member/" + sessionID.toRequestID();

    $.get(url, {}, function (response, status) {
        if (response.success) {
            if (response.info.league.s02 === undefined || !response.info.league.s02.accepted) {
                $("#session_id").val(sessionID);
                $("#team_join_form").removeClass('g-show-check');
            }
        }
    });

    // accept button status
    if ($.sessionStorage.hasSession() && $.sessionStorage.getLevel() > 1) {
        $(".accept-container").removeClass('g-show-check');
        $(".accept-button").click(function (e) {
            var id = $(this).data('accept-id').toRequestID();

            $.get('/api/leader/accept/' + id, {}, function (response, status) {
                if (response.success) {
                    window.location.reload(true);
                } else {
                    alert('실행에 실패했습니다.');
                }
            });
        });
    }

})(jQuery, window, document);
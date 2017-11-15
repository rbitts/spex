toggleStylesheet('/css/plugins/clockpicker/clockpicker.css', 1);
toggleStylesheet('/css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css', 1);
toggleStylesheet('/css/plugins/chosen/bootstrap-chosen.css', 1);

$('head').append(' <script src = \'/js/plugins/chosen/chosen.jquery.js\'> <\/script>');
$('head').append(' <script src = \'/js/plugins/clockpicker/clockpicker.js\'> <\/script>');

(function ($, window, document, undefined) {
    'use strict';

    toggleStylesheet('/s2/assets/vendor/jquery.dataTables/css/jquery.dataTables.css', 1);

    $('head').append(' <script src = \'/s2/assets/vendor/jquery.dataTables/js/jquery.dataTables.min.js\'> <\/script>');
    $('head').append(' <script src = \'/s2/assets/vendor/handlebars/handlebars-v4.0.10.js\'> <\/script>');


    var game_non_expired_template = {
        "templatesource": "#game-non-expired-html-template",
        "templatehtml": "#filterable-table tbody",
    }
    var game_expired_template = {
        "templatesource": "#game-expired-html-template",
        "templatehtml": "#filterable-table tbody",
    }

    function loadDataTable() {
        $('#filterable-table').dataTable({
            ajax: {
                url: '/api/games',
                complete: function () {

                }
            },
            "bAutoWidth": false,
            "processing": true,
            "iDisplayLength": 6,
            "aaSorting": [],
            "ordering": false,
            "info": false,
            "dom": "<<t>ip>",
            "columns": [{
                "data": "game",
                "render": function (data, type, row) {
                    if (!data.done) {
                        var template_html = game_non_expired_template['templatehtml'];
                        var source = $(game_non_expired_template['templatesource'] + '').html();
                    } else {
                        var template_html = game_expired_template['templatehtml'];
                        var source = $(game_expired_template['templatesource'] + '').html();

                        var regex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/g;
                        data.media_image = (data.media) ? 'https://img.youtube.com/vi/{0}/sddefault.jpg'.format(regex.exec(data.media)[1]) : '/s2/assets/img/nav/avatar-overwatch-default.png';
                    }
                    var handlebarscompile = Handlebars.compile(source);
                    var elmt = handlebarscompile({
                        game: data,
                        date: moment(data.date).format('YYYY.MM.DD HH:mm')
                    });

                    return elmt;
                },
                "target": 0,
                "className": "col-12 g-brd-bottom g-brd-gray-light-v4 g-mb-20 g-pb-20"
            }, {
                "data": "game.game_info.red_team.info.info.name",
                "target": 1,
                "visible": false
            }, {
                "data": "game.game_info.blue_team.info.info.name",
                "target": 2,
                "visible": false
            }],
            "createdRow": function (row, data, index) {
                $(row).addClass('row');
            },
            "language": {
                "oPaginate": {
                    "sFirst": "처음",
                    "sLast": "마지막",
                    "sNext": "<span aria-hidden='true'><i class='fa fa-angle-right'></i></span>",
                    "sPrevious": "<span aria-hidden='true'><i class='fa fa-angle-left'></i></span>"
                },
            }
        });

        $('#filterable-table').on('draw.dt', function () {
            // init cubeportfolio

            var cubes = $('.js-lightbox-slider');
            _.each(cubes, (e, i) => {
                var $e = $(e);
                if (!($e.data('cubeportfolio'))) {
                    $e.cubeportfolio({
                        layoutMode: 'grid',
                        drag: false,
                        auto: false,
                        autoTimeout: 5000,
                        autoPauseOnHover: false,
                        showNavigation: false,
                        showPagination: false,
                        rewindNav: false,
                        scrollByPage: false,
                        gridAdjustment: 'responsive',
                        mediaQueries: [{
                            width: 1500,
                            cols: 1,
                        }, {
                            width: 1100,
                            cols: 1,
                        }, {
                            width: 800,
                            cols: 1,
                        }, {
                            width: 480,
                            cols: 1,
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

                    });
                }
            })
            // $('.js-lightbox-slider').cubeportfolio('destroy');

            // user level view
            $('.spex-level-{0}'.format($.sessionStorage.getLevel())).removeClass('g-show-check');
        });
    }
    loadDataTable();
})(jQuery, window, document);

(function ($, window, document, undefined) {
    'use strict';

    // init cubeportfolio
    // var singlePage = $('#js-singlePage-container').children('div');
    $('.js-grid-slider-projects').cubeportfolio({
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
            cols: 8,
        }, {
            width: 1100,
            cols: 6,
        }, {
            width: 800,
            cols: 4,
        }, {
            width: 480,
            cols: 3,

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

        // singlePage popup
        // singlePageDelegate: '.cbp-singlePage',
        // singlePageDeeplinking: true,
        // singlePageStickyNavigation: true,
        // singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
        // singlePageAnimation: 'fade',
        // singlePageCallback: function (url, element) {
        //     // to update singlePage content use the following method: this.updateSinglePage(yourContent)
        //     var indexElement = $(element).parents('.cbp-item').index(),
        //         item = singlePage.eq(indexElement);

        //     item.find('img').each(function (index, el) {
        //         var attr = el.getAttribute('data-cbp-src');

        //         if (attr) {
        //             el.setAttribute('src', attr);
        //             el.removeAttribute('data-cbp-src');
        //         }
        //     });

        //     this.updateSinglePage(item.html());
        // },

    });

    $('.clockpicker').each(function () {
        var clockpicker = $(this).find('input').clockpicker({
            'default': '22:00',
            autoclose: true,
            twelvehour: true,
            donetext: '선택',
            afterDone: function () {
                clockpicker.val(clockpicker.val().slice(0, -2) + ' ' + clockpicker.val()
                    .slice(-2));
            }
        });
    });

})(jQuery, window, document);



(function ($, window, document, undefined) {
    'use strict';

    function e(b, c, e) {
        var el = $('.filter-controls');
    }


    $.Gamesfilters = {

    }, $.Gamesfilters.constructor = e;

    $.Gamesfilters.constructor(jQuery, window, document);

})(jQuery, window, document);



// clickable init
(function ($, window, document, undefined) {
    'use strict';

    $.Clickables.init('.clickable', 2);

    $('#game_create_button').on('click', function (event) {
        var $modal = $('#createGameModal'),
            $form = $($modal.find('form'));

        $form.data('spex-game-id', '');
        $modal.modal('show');
    });

})(jQuery, window, document);


// new game form submit
(function ($, window, document, undefined) {
    'use strict';

    $("form[name='gameForm']").on("submit", function (event) {
        var $self = $(this),
            $date = $(this).find('input[name="date"]'),
            $time = $(this).find('input[name="time"]');

        event.preventDefault();
        // validation check
        var validated = {
            valid: true
        }
        var teams = $.Clickables.getValues();
        if (teams.length != 2) {
            validated.valid = false;
            validated.message = '2개의 팀을 선택해주세요.';
        }

        if (!validated.valid) {
            alert(validated.message);
            return;
        }

        var url = (($self.data('spex-game-id') !== '')) ? '/api/modify/game/{0}'.format($self.data('spex-game-id')) : '/api/create/game';

        $.post(url, {
                date: $date.val(),
                time: $time.val(),
                red_team: teams[0],
                blue_team: teams[1],
            },
            function (response, status) {
                if (response.success) {
                    alert('수정완료');
                    location.reload();
                } else {
                    alert(response.message);
                }
            });
    });
})(jQuery, window, document);

(function ($, window, document, undefined) {
    'use strict';

    $('.modify-game').on('click', function (event) {
        var $self = $(this),
            gid = $self.data('spex-game-id'),
            $modal = $('#createGameModal');

        $modal.modal('show');

        $.get('/api/info/game/{0}'.format(gid), {},
            function (response, status) {
                if (response.success) {
                    var $form = $($modal.find('form')),
                        date = $form.find('input[name=date]'),
                        time = $form.find('input[name=time]'),
                        clickables = $modal.find('.clickable');

                    var dtime = new Date(response.info.date);
                    var mdate = moment(new Date(response.info.date));
                    // date.val('{0}/{1}/{2}'.format(dtime.getFullYear(), dtime.getMonth() + 1, dtime.getDate()));
                    // time.val('{0}:{1}'.format(dtime.getHours(), dtime.getMinutes()));
                    date.val(mdate.format('YYYY/MM/DD'));
                    time.val(mdate.format('HH:mm'));

                    $.Clickables.clear();
                    $.Clickables.setValue(response.info.game_info.red_team.id);
                    $.Clickables.setValue(response.info.game_info.blue_team.id);

                    $form.data('spex-game-id', gid);
                } else {
                    alert(response.message);
                }
            });
        event.preventDefault();
    });

    $('.expire-game').on('click', function (event) {
        var $self = $(this),
            gid = $self.data('spex-game-id');

        $.post('/api/expire/game/{0}'.format(gid), {}, function (response, status) {
            if (response.success) {
                $.alert('준비가 종료되었습니다.');
                window.location.reload();
            }
            console.log(response);
        })

        event.preventDefault();
    });

})(jQuery, window, document);


// filters
(function ($, window, document, undefined) {
    'use strict';

    function setCustomFilter() {
        $.fn.dataTable.ext.search.push(
            function (settings, data, dataIndex) {
                var filters = $('input[name=filter_team]'),
                    filter_strings = [];

                _.each(filters, (f, i) => {
                    var $f = $(f),
                        checked = $f.is(":checked");
                    if (checked)
                        filter_strings.push($f.val());
                });
                if (filter_strings.length == 0)
                    return true;

                if (_.contains(filter_strings, data[1]) || _.contains(filter_strings, data[2])) {
                    return true;
                }

                return false;
            }
        );
    }

    setCustomFilter();

    var filters = $('input[name=filter_team]').change(function () {
        $('#filterable-table').DataTable().draw();
        if (_.select(filters, (f) => {
                return $(f).is(':checked')
            }).length > 0) {
            $('input[name=filter_team_all]').prop('checked', false);
        } else {
            $('input[name=filter_team_all]').prop('checked', true);
        }
    });
    $('input[name=filter_team_all]').change(function () {
        var $this = $(this),
            checked = $this.is(':checked');

        if (checked) {
            $('input[name=filter_team]').prop('checked', false);
            $('#filterable-table').DataTable().draw();
        }
    });

})(jQuery, window, document);
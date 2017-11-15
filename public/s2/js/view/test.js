(function ($, window, document, undefined) {
    'use strict';

    toggleStylesheet('/s2/assets/vendor/jquery.dataTables/css/jquery.dataTables.min.css', 1);

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
            "dom": "<<t>p>",
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
            }],
            "createdRow": function (row, data, index) {
                $(row).addClass('row');
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
    $('head').append(' <script src = \'/s2/js/view/games.js\'> <\/script>');
    loadDataTable();
})(jQuery, window, document);
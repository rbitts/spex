(function ($, window, document, undefined) {
    'use strict';

    toggleStylesheet('/s2/assets/vendor/jquery.dataTables/css/jquery.dataTables.css', 1);

    $('head').append(' <script src = \'/s2/assets/vendor/jquery.dataTables/js/jquery.dataTables.min.js\'> <\/script>');
    $('head').append(' <script src = \'/s2/assets/vendor/handlebars/handlebars-v4.0.10.js\'> <\/script>');


    var search_html_template = {
        "templatesource": "#search-result-html-template",
        "templatehtml": "#search-result-table tbody",
    }

    function loadDataTable() {
        var query = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);

        $('#search-result-table').dataTable({
            "processing": true,
            "serverSide": true,
            ajax: {
                url: '/api/search/overlog/{0}'.format(query),
                "type": "POST",
                complete: function (response, status) {
                    _.each($('.search-result-overlog-count'), e => {
                        $(e).text(response.responseJSON.recordsTotal);
                    })
                }
            },
            "bAutoWidth": false,
            "processing": true,
            "iDisplayLength": 5,
            "aaSorting": [],
            "ordering": false,
            "info": false,
            "dom": "<<t>ip>",
            "columns": [{
                "data": "info",
                "render": function (data, type, row) {
                    var template_html = search_html_template['templatehtml'];
                    var source = $(search_html_template['templatesource'] + '').html();
                    var handlebarscompile = Handlebars.compile(source);
                    var elmt = handlebarscompile({
                        user: data,
                    });

                    return elmt;
                },
                "target": 0,
                "className": "col-12 g-brd-bottom g-brd-gray-light-v4"
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
            // $('.js-lightbox-slider').cubeportfolio('destroy');

            // user level view
            $('.spex-level-{0}'.format($.sessionStorage.getLevel())).removeClass('g-show-check');
        });

    }
    loadDataTable();


    var league_search_html_template = {
        "templatesource": "#league-search-result-html-template",
        "templatehtml": "#league-search-result-table tbody",
    }



    function loadLeagueDataTable() {
        var query = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);

        $('#league-search-result-table').dataTable({
            "processing": true,
            "serverSide": true,
            ajax: {
                url: '/api/search/league/{0}'.format(query),
                "type": "POST",
                complete: function (response, status) {
                    _.each($('.search-result-league-count'), e => {
                        $(e).text(response.responseJSON.recordsTotal);
                    })
                }
            },
            "bAutoWidth": false,
            "processing": true,
            "iDisplayLength": 5,
            "aaSorting": [],
            "ordering": false,
            "info": false,
            "dom": "<<t>i>",
            "columns": [{
                "data": "info",
                "render": function (data, type, row) {
                    var template_html = league_search_html_template['templatehtml'];
                    var source = $(league_search_html_template['templatesource'] + '').html();
                    var handlebarscompile = Handlebars.compile(source);
                    var elmt = handlebarscompile({
                        user: data,
                    });

                    return elmt;
                },
                "target": 0,
                "className": "col-12 g-brd-bottom g-brd-gray-light-v4"
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
            // $('.js-lightbox-slider').cubeportfolio('destroy');

            // user level view
            $('.spex-level-{0}'.format($.sessionStorage.getLevel())).removeClass('g-show-check');
        });
    }

    loadLeagueDataTable();


})(jQuery, window, document);
(function ($, window, document, undefined) {
    'use strict';

    $('head').append(' <script src = \'/s2/assets/vendor/handlebars/handlebars-v4.0.10.js\'> <\/script>');

    var Combine = function (users, containUsers, targetScore = 2800 * 6) {
        this.users = users;
        this.mustContainUsers = containUsers;
        this.targetScore = targetScore;
    }

    var combinations = {
        results: [],

        makeCombine: function () {
            this.results = [];
            var startScore = _(this.mustContainUsers).reduce((p, n) => {
                return p.score + n.score
            });

            _.each(this.users, u => {
                this.__makeCombines(this.users, this.targetScore, u, this.mustContainUsers, startScore);
            });
            this.results = _.uniq(this.results, false);

            var combination = _(this.results).map((item) => {

                var temp = item.split('/');
                var response = [];
                _(temp).each(t => {
                    var inner_temp = t.split('-');
                    response.push({
                        name: inner_temp[0],
                        score: inner_temp[1]
                    })
                })
                return response;
            })

            return combination;
        },
        // brute force function
        __makeCombines: function (users, targetScore, current, route = [], accValue = 0) {
            // cut the leafs
            if (accValue > targetScore + (100 * 6)) {
                return;
            }

            if (!_.isEmpty(_(route).filter(t => {
                    return _.isEqual(current, t);
                }))) {
                return;
            }

            current.visited = true;
            route.push(current);
            accValue += current.score;

            if (route.length == 6 && Math.abs(targetScore - accValue) < (100 * 6) + 1) {
                this.results.push(
                    _(_(_(route).sortBy('name')).map(t => {
                        return t.name + '-' + t.score
                    })).reduce((p, n) => {
                        return p + '/' + n
                    })
                )

                route.pop();
                current.visited = false;
                accValue -= current.score;
                return;
            }

            var n = _.select(users, u => {
                return !u.visited;
            });

            _.each(n, (item) => {
                this.__makeCombines(users, targetScore, item, route, accValue);
            })
            route.pop();
            current.visited = false;
            accValue -= current.score;

        }
    }

    $.extend(Combine.prototype, combinations);

    // //sample test
    // var defaultUser = {
    //     name: '',
    //     score: 0,
    //     visited: false,
    // }

    // var users = []

    // for (var i = 0; i < 10; i++) {
    //     users.push(_.defaults({
    //         name: 'ID' + i,
    //         score: _.random(1000, 5000)
    //     }, defaultUser));
    // }

    // var mustContainUsers = [users[0], users[1]];


    // $('.js-toggable').on('click', function () {
    //     console.log(combiner.makeCombine());
    //     console.log($.EntrySelector.getValue());
    // })

    var entry_html_template = {
        "templatesource": "#game-entry-html-template",
        "templatehtml": "#entry-container",
    }

    var entry_list_html_template = {
        "templatesource": "#game-entry-list-html-template",
        "templatehtml": "#entry-list-container",
    }


    $('#requestBuild').on('click', function () {
        var entries = _($('.js-entry-selector').getEntryJSON()).map(u => {
            return {
                name: u.name.toShortID(),
                score: u.score,
                icon: u.icon,
                visited: false,
            }
        });
        console.log(entries);
        var targetScore = $('#targetscore').val();

        if (!(/^[0-9]*$/gm.test(targetScore)) || !_.isNumber(parseInt(targetScore)) || _.isEmpty(targetScore)) {
            $.alert('목표점수가 없습니다. 기본목표점수(2800)로 조회합니다.');
            targetScore = undefined;
        } else {
            targetScore = targetScore * 6;
        }

        var combiner = new Combine(entries, [], targetScore);
        var combinationsJSON = combiner.makeCombine();

        var template_html = entry_html_template['templatehtml'];
        var source = $(entry_html_template['templatesource'] + '').html();
        var handlebarscompile = Handlebars.compile(source);
        var $entries_container = $('#entry-container');

        var template_html_list = entry_list_html_template['templatehtml'];
        var source_list = $(entry_list_html_template['templatesource'] + '').html();
        var handlebarscompile_list = Handlebars.compile(source_list);
        var $entries_container_list = $('#entry-list-container');

        $entries_container.empty();
        $entries_container_list.empty();

        _(combinationsJSON).each(combination => {
            var match = _(combination).map(comb => {
                return _(entries).findWhere({
                    name: comb.name
                });
            });

            match.average = _(_(match).map(m => {
                return m.score;
            })).reduce((p, n) => {
                return p + n
            });

            var data = {
                average: Math.round(match.average / match.length),
                entry1: match[0].name,
                score1: match[0].score,
                icon1: match[0].icon,
                entry2: match[1].name,
                score2: match[1].score,
                icon2: match[1].icon,
                entry3: match[2].name,
                score3: match[2].score,
                icon3: match[2].icon,
                entry4: match[3].name,
                score4: match[3].score,
                icon4: match[3].icon,
                entry5: match[4].name,
                score5: match[4].score,
                icon5: match[4].icon,
                entry6: match[5].name,
                score6: match[5].score,
                icon6: match[5].icon,
            }
            $entries_container.append(handlebarscompile(data));
            $entries_container_list.append(handlebarscompile_list(data));

        })


    });


    // $('#entryBuilderModal').modal('show');

})(jQuery, window, document);




(function ($, window, document, undefined) {
    'use strict';

    $('head').append(' <script src = \'/s2/assets/vendor/clipboard/clipboard.min.js\'> <\/script>');


    // var clipboard = new Clipboard('#copy_to_clipboard', {
    //     container: $('#entry-list-container')
    // });



    $('.clipboard').on('click', function () {
        $('.list').removeClass('collapse');
        $('.grid').addClass('collapse');

        var clipboard = new Clipboard('.clipboard');
        clipboard.on('success', function (e) {
            console.info('Action:', e.action);
            console.info('Text:', e.text);
            console.info('Trigger:', e.trigger);

            e.clearSelection();
        });

    });;

})(jQuery, window, document);
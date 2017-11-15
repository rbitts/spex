(function ($, window, document, undefined) {
    'use strict';

    // initialization of quantity counter
    $.HSCore.components.HSCountQty.init('.js-quantity');


    // initialization team selector
    $.get("/api/info/team/0", {}, function (response, status) {
        if (response.success) {
            // console.log(response.info);
            var collection = [];

            response.info.forEach(function (element) {
                collection.push(element.info.name);
            });

            $.HSCore.components.HSCountQty.setCollection(collection);
        }
    });



    $.Simulation = {

        /**
         *
         *
         * @var jQuery pageCollection
         */
        pageCollection: $(),

        /**
         * Initialization of Count quantity wrapper.
         *
         * @param String selector (optional)
         * @param Object config (optional)
         *
         * @return jQuery pageCollection - collection of initialized items.
         */

        init: function (selector) {

            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) return;

            this.initSimulator();

            return this.pageCollection;
        },

        initSimulator: function () {
            //Variables
            var $self = this,
                collection = $self.pageCollection;

            //Actions
            this.collection.each(function (i, el) {
                var $this = $(el),
                    $toggable = $this.find('.js-toggable');

                $.fn.extend({
                    getCount: function () {
                        var count = 0;
                        var avg_score = 0;
                        this.find('.js-toggable').each(function (i, elm) {
                            if ($(elm).hasClass('activated')) {
                                count++;
                                avg_score += parseInt($(elm).data('active-score'));
                            }
                        });

                        $('.js-score-summary-icon').attr('src', '/img/icons/rank-0.png');
                        $('.js-score-summary').text(0);

                        if (count > 0) {
                            avg_score = Math.round(avg_score / count);
                            var avg_icon = Math.ceil((avg_score - 1000) / 500);

                            $('.js-score-summary-icon').attr('src', '/img/icons/rank-' + avg_icon + '.png');
                            $('.js-score-summary').text(avg_score);
                        }
                        return count;
                    }
                });

                $toggable.on('click', function (e) {
                    $(this).toggleClass("activated");
                    e.preventDefault();

                    console.log($this.getCount());
                });

                //Actions
                collection = collection.add($this);
            });
        },

        _setValue: function (values) {
            if (values === undefined) {
                return;
            }

            //Variables
            var $self = this,
                collection = $self.pageCollection;


            //Actions
            this.collection.each(function (i, el) {
                var $this = $(el),
                    $item = $this.find('.js-item');

                // $name = $item.find('.js-name'),
                // $toggable = $item.find('.js-toggable');

                $item.addClass('g-show-check');
                values.forEach(function (elmt, idx) {
                    var $figure = $($item[idx]),
                        $name = $figure.find('.js-name'),
                        $score = $figure.find('.js-score'),
                        $rank_icon = $figure.find('.js-rank-icon'),
                        $toggable = $figure.find('.js-toggable');

                    var image_url = (elmt.mostplay) ? 'url(\'/img/vertical-portrait/' + elmt.mostplay + '.png\'' : 'url(\'/s2/assets/img/120x120/img6.png\')';
                    $toggable.css('background-image', image_url);
                    $toggable.removeClass('activated');
                    $name.text(elmt.name.toShortID());

                    $rank_icon.attr('src', '/img/icons/rank-' + elmt.tier_icon + '.png');
                    $toggable.data('active-score', elmt.score);
                    $score.text(elmt.score);

                    $figure.removeClass('g-show-check');
                    // console.log(elmt);
                    $('.js-score-summary-icon').attr('src', '/img/icons/rank-0.png');
                    $('.js-score-summary').text(0);

                });

            });
        },

        _id: 0,
        show: function (id) {
            var $self = this;
            if ($self._id == id) {
                return;
            }

            // initialization team selector
            $.get("/api/info/team/" + id + "/member", {}, function (response, status) {
                if (response.success) {
                    var collection = [];
                    response.info.forEach(function (element) {
                        if (element.league.s02.accepted) {
                            collection.push({
                                name: element.id,
                                score: element.competitive.max_score,
                                mostplay: element.account.player.mostplay,
                                tier_icon: element.competitive.tier,
                            });
                        }
                    });
                    $self._setValue(collection);
                }
            });
        }
    }


    $.Simulation.init('.js-simulator');

    $('.js-result').on('resultChanged', function (e, arg) {
        var id = parseInt(arg.resultVal) + 6;
        $.Simulation.show(id);
        return false;
    });

    $.Simulation.show(7);

    $.Clickables.init('.clickable', 1);

})(jQuery, window, document);
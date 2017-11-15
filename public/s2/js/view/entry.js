(function ($, window, document, undefined) {
    'use strict';

    $.EntrySelector = {

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

            this.initEntrySelector();

            return this.pageCollection;
        },

        initEntrySelector: function () {
            //Variables
            var $self = this,
                collection = $self.pageCollection;

            //Actions
            this.collection.each(function (i, el) {
                var $this = $(el),
                    $items = $this.find('.js-entry-item'),
                    $toggable = $items.find('.js-toggable');


                $.fn.extend({
                    getEntry: function () {
                        var $self = this,
                            $items = $self.find('.js-entry-item'),
                            entry = [];

                        $items.each((i, el) => {
                            var $toggable = $(el).find('.js-toggable'),
                                label = $self.data('label');

                            if ($toggable.hasClass('activated')) {
                                entry.push($toggable.data('label'));
                            }
                        });

                        return entry;
                    },
                    getValue: function () {
                        var $self = this,
                            $items = $self.find('.js-entry-item'),
                            value = 0,
                            count = 0;

                        $items.each((i, el) => {
                            var $toggable = $(el).find('.js-toggable'),
                                label = $self.data('label');

                            if ($toggable.hasClass('activated')) {
                                // console.log($toggable.data('label'));
                                value += $toggable.data('value');
                                count++;
                            }
                        });

                        return count != 0 ? value / count : 0;

                    },
                    getEntryJSON: function () {
                        var $self = this,
                            $items = _($self.find('.js-entry-item')).select(t => {
                                var $toggable = $(t).find('.js-toggable');
                                return $toggable.hasClass('activated');
                            }),
                            entry = [];

                        var entries = _($items).map(el => {
                            var $toggable = $(el).find('.js-toggable');

                            return {
                                name: $toggable.data('label'),
                                score: $toggable.data('value'),
                                icon: $toggable.data('icon'),
                            }
                        });

                        return entries;
                    },

                    // item active
                    isActive: function () {
                        var $this = $(this),
                            $toggable = $this.find('.js-toggable');
                        return $toggable.hasClass('activated');
                    }
                });

                $toggable.on('click', function (e) {
                    var $self = $(this),
                        $parent = $self.closest('.js-entry-item'),
                        label = $self.data('label'),
                        value = $self.data('value');

                    var limit = 8,
                        count = 0;

                    var siblings = $parent.siblings();
                    siblings.each((i, el) => {
                        var $el = $(el);
                        if ($el.isActive()) {
                            count++;
                            // console.log($el.find('.js-toggable').data('label'));
                        }

                    })
                    if (count < limit) {
                        $(this).toggleClass("activated");
                    }

                    var score = $this.getValue();
                    $('.entry-average-image').attr('src', '/img/icons/rank-{0}.png'.format(Math.ceil((score - 1000) / 500)));
                    $('.entry-average-label').text(Math.round(score));
                    // console.log(siblings);
                    e.preventDefault();
                });

                //Actions
                collection = collection.add($this);
            });
        },
    }


    $.EntrySelector.init('.js-entry-selector');

    jQuery.ajaxSettings.traditional = true;


    $('.entry-commit').on('click', (e) => {

        $.post('/api/entry/{0}/team/{1}'.format($('input[name=gid]').val(), $('input[name=tid]').val()), {
                entry: $('.js-entry-selector').getEntry()
            },
            function (response, status) {
                if (response.success) {
                    window.location.href = '/s2/game/preview/{0}'.format($('input[name=gid]').val());
                }
            });

    });

})(jQuery, window, document);
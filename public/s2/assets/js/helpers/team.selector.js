// new games select team
(function ($, window, document, undefined) {
    'use strict';

    $.Clickables = {
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

        init: function (selector, limit) {

            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) return;

            this.initElements(limit);

            return this.pageCollection;
        },

        initElements: function (limit) {
            //Variables
            var $self = this,
                collection = $self.pageCollection;

            //Actions
            this.collection.each(function (i, el) {
                var $this = $(el);

                $.fn.extend({
                    clickable: function (limit) {
                        var $self = this,
                            _limitAtOnce = limit,
                            $image = $(this).find('.clickable-image');

                        $self.on('click', function (e) {
                            if (_limitAtOnce == 1) { // toggle
                                var siblings = $self.siblings();
                                siblings.each(function (i, si) {
                                    $(si).setChecked(false);
                                });
                                $self.setChecked(true);
                            } else {
                                var clicked_cnt = 0;
                                var siblings = $self.siblings();
                                siblings.each(function (i, si) {
                                    if ($(si)._check_clicked()) clicked_cnt++;
                                });
                                if (clicked_cnt < _limitAtOnce) {
                                    $image.toggleClass('g-grayscale-100x');
                                }
                            }
                            e.preventDefault();
                        });
                    },

                    _check_clicked: function () {
                        var $self = this,
                            $image = $(this).find('.clickable-image');
                        return (!$image.hasClass('g-grayscale-100x'));
                    },
                    setChecked: function (checked) {
                        var $self = this,
                            $image = $(this).find('.clickable-image');

                        if (!$image.hasClass('g-grayscale-100x')) {
                            $image.addClass('g-grayscale-100x');
                        }

                        if (checked)
                            $image.removeClass('g-grayscale-100x');
                    }
                });

                $this.clickable(limit);

                //Actions
                collection = collection.add($this);
            });
        },
        getValues: function () {
            //Variables
            var $self = this,
                values = [],
                collection = $self.pageCollection;

            //Actions
            this.collection.each(function (i, el) {
                var $this = $(el);
                if ($this._check_clicked()) {
                    values.push($this.data('value'));
                }
            })
            return values;
        },

        setValue: function (value) {
            //Variables
            var $self = this,
                collection = $self.pageCollection;

            //Actions
            this.collection.each(function (i, el) {
                var $this = $(el);
                if ($this.data('value') == value) {
                    $this.setChecked(true);
                }
            })
        },
        clear: function () {
            //Variables
            var $self = this,
                collection = $self.pageCollection;

            //Actions
            this.collection.each(function (i, el) {
                var $this = $(el);
                $this.setChecked(false);
            })
        },
    }

})(jQuery, window, document);
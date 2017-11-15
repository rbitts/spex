var entry_limit = 6;

(function ($, window, document, undefined) {
    'use strict';

    toggleStylesheet('/s2/assets/vendor/jquery-steps/jquery.steps.css', 1);
    $('head').append(' <script src = \'/s2/assets/vendor/jquery-steps/jquery.steps.min.js\'> <\/script>');

    var form = $("#example-manipulation").show();

    form.steps({
        headerTag: "h3",
        bodyTag: "section",
        enableAllSteps: true,
        transitionEffect: "fade",
        // transitionEffect: "slideLeft",
        titleTemplate: "#title#",
        enablePagination: true,
        labels: {
            cancel: "",
            next: "<i class=\"fa fa-chevron-right mr-2\"></i>다음",
            previous: "<i class=\"fa fa-chevron-left mr-2\"></i>이전",
            finish: "완료"
        },
        onStepChanging: function (event, currentIndex, newIndex) {

            // Allways allow previous action even if the current form is not valid!
            if (currentIndex > newIndex) {
                return true;
            }

            // Needed in some cases if the user went back (clean up)
            if (currentIndex < newIndex) {
                // To remove error styles
                form.find(".body:eq(" + newIndex + ") label.error").remove();
                form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
            }

            if (currentIndex == 0) {
                var checked = $.entrySelector.get(0).getChecked();
                if (checked.length != entry_limit) {
                    return false;
                }
                return true;
            }

            if (currentIndex == 1) {
                var checked = $.entrySelector.get(1).getChecked();
                if (checked.length != entry_limit) {
                    return false;
                }
                return true;
            }

            if (currentIndex == 2) {
                return ($.radioSelector.get(0).getValue());
            }

            if (currentIndex == 3) {
                return ($.radioSelector.get(1).getValue());
            }

            return true;

            // form.validate().settings.ignore = ":disabled,:hidden";
            // return form.valid();
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
            // // Used to skip the "Warning" step if the user is old enough.
            // if (currentIndex === 2 && Number($("#age-2").val()) >= 18) {
            //     form.steps("next");
            // }
            // // Used to skip the "Warning" step if the user is old enough and wants to the previous step.
            // if (currentIndex === 2 && priorIndex === 3) {
            //     form.steps("previous");
            // }
        },
        onFinishing: function (event, currentIndex) {
            //final validation
            var gid = $('.spex-game-id').val();
            if (!(gid)) {
                return false;
            }

            if ($.entrySelector.get(0).getChecked().length != entry_limit || $.entrySelector.get(1).getChecked().length != entry_limit) {
                return false;
            }
            if (!($.radioSelector.get(0).getValue()) || !($.radioSelector.get(1).getValue())) {
                return false;
            }

            var getEntries = function (entry) {
                return entry.tag;
            }

            var url = ($('.spex-game-modify').is(':checked')) ? '/api/modify/game/{0}/round/{1}'.format(gid, $('.spex-game-rid').val()) : '/api/modify/game/{0}/create/round'.format(gid);

            $.post(url, {
                entries: [$.entrySelector.get(0).getChecked().map(getEntries), $.entrySelector.get(1).getChecked().map(getEntries)],
                map: $.radioSelector.get(0).getValue(),
                winner: $.radioSelector.get(1).getValue(),
                potg: ''
            }, function (response, status) {
                if (response.success) {
                    $(location).attr('href', '/s2/game/{0}'.format($('.spex-game-id').val()));
                    return true;
                } else {
                    return false;
                }
            });
        },
        onFinished: function (event, currentIndex) {
            alert("Submitted!");
        }
    });

})(jQuery, window, document);


(function ($, window, document, undefined) {
    'use strict';

    $.entrySelector = {

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

            this.initSimulator(limit);

            return this.pageCollection;
        },

        initSimulator: function (limit) {
            //Variables
            var $self = this,
                collection = $self.pageCollection,
                limit = limit;

            //Actions
            this.collection.each(function (i, el) {
                var $this = $(el),
                    $toggables = $this.find('.js-toggable');

                $.fn.extend({
                    getChecked: function () {
                        var $this = $(this),
                            $toggables = $this.find('.js-toggable'),
                            ret = [];

                        $toggables.each((i, elmt) => {
                            var $elmt = $(elmt);
                            ret.push({
                                tag: $elmt.data('battle-tag'),
                                score: $elmt.data('score'),
                                checked: $elmt.hasClass('activated')
                            });
                        });

                        return ret.filter(function (item) {
                            return (item.checked);
                        })
                    },
                    initialize: function () {
                        var clength = $this.getChecked().length;
                        if (clength > 0) {
                            var average = Math.round($this.getChecked().map(function (entry) {
                                return entry.score;
                            }).reduce(function (previousValue, currentValue) {
                                return (previousValue + currentValue);
                            }) / clength);

                            $this.find('.js-entries-score').text(average);
                        } else {
                            $this.find('.js-entries-score').text(0);
                        }
                    }
                });

                $toggables.on('click', function (e) {
                    var clength = $this.getChecked().length;

                    if (!$(this).hasClass('activated') && clength < limit) {
                        $(this).addClass('activated');
                    } else {
                        $(this).removeClass('activated');
                    }

                    clength = $this.getChecked().length;

                    if (clength > 0) {
                        var average = Math.round($this.getChecked().map(function (entry) {
                            return entry.score;
                        }).reduce(function (previousValue, currentValue) {
                            return (previousValue + currentValue);
                        }) / clength);

                        $this.find('.js-entries-score').text(average);
                    } else {
                        $this.find('.js-entries-score').text(0);
                    }
                    e.preventDefault();
                });

                $this.initialize();

                //Actions
                collection = collection.add($this);
            });
        },

        get: function (index) {
            var $self = this,
                collection = $self.pageCollection;

            return $(this.collection[index]);
        }
    }

    $.entrySelector.init('.js-entry-selector', entry_limit);


})(jQuery, window, document);


(function ($, window, document, undefined) {
    'use strict';

    $.radioSelector = {

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

            this.initSelector();

            return this.pageCollection;
        },

        initSelector: function () {
            //Variables
            var $self = this,
                collection = $self.pageCollection;

            //Actions
            this.collection.each(function (i, el) {
                var $this = $(el),
                    $radio = $this.find('.spexjs-radio-item');

                $radio.on('click', function (e) {
                    var $radio = $this.find('.spexjs-radio-item');
                    $radio.each((i, elmt) => {
                        var $elmt = $(elmt);
                        if (!$elmt.hasClass('g-grayscale-100x')) {
                            $elmt.addClass('g-grayscale-100x');
                        }
                    });

                    $(this).removeClass('g-grayscale-100x');

                    e.preventDefault();
                });

                $.fn.extend({
                    getValue: function () {
                        var $this = $(this),
                            $radio = $this.find('.spexjs-radio-item'),
                            ret;

                        $radio.each((i, elmt) => {
                            var $elmt = $(elmt);
                            if (!$elmt.hasClass('g-grayscale-100x')) {
                                ret = $elmt.data('value');
                            }
                        });

                        return ret;
                    }
                })

                //Actions
                collection = collection.add($this);
            });
        },
        get: function (index) {
            var $self = this,
                collection = $self.pageCollection;

            return $(this.collection[index]);
        }

    }

    $.radioSelector.init('.js-radio-selector');


})(jQuery, window, document);
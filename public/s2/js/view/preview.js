(function ($, window, document, undefined) {
    'use strict';


    // option.data('spex-team')
    // console.log(option.data('spex-game'));
    $.get('/api/member/{0}'.format($.sessionStorage.getID().toRequestID()), {}, function (response, status) {
        if (response.success) {
            var $option = $('.options');

            $option.each((i, el) => {
                var $self = $(el),
                    $modify = $self.find('.modify-entry');
                $modify.attr('href', '/s2/game/preview/{0}/entry/{1}'.format($self.data('spex-game'), $self.data('spex-team')));

                var level = response.info.account.security.account_type !== undefined ? response.info.account.security.account_type : 0;
                var account_team = response.info.league.s02.team !== undefined ? response.info.league.s02.team : 0;
                if (level === 2 && account_team == $self.data('spex-team')) {
                    $self.removeClass('g-show-check');
                }
            });
        }
    });

})(jQuery, window, document);
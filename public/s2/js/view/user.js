(function ($, window, document, undefined) {
    'use strict';

    $("#sign_out_button").bind('click', function (e) {
        $.sessionStorage.logout();
        $(location).attr('href', '/');
        e.preventDefault();
    });

})(jQuery, window, document);
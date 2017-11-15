(function ($, window, document, undefined) {
    'use strict';
    // prototypes
    String.prototype.toRequestID = function () {
        if (this === undefined) return null;
        return this.replace("#", "-");
    }

    String.prototype.toDisplayID = function () {
        if (this === undefined) return null;
        return this.replace("-", "#");
    }

    String.prototype.toShortID = function () {
        if (this === undefined) return null;
        return this.replace(/(#|-).[0-9]+/i, "");
    }


    $(document).on('ready', function () {
        if (window.Android) {
            window.Android.pageLoaded('ddddd');
            // $.alert('register:{0}'.format($.sessionStorage.getID()));
        }

        var e = $("nav, .blog-overlay"),
            n = $(".blog-logo, .blog-open-nav"),
            a = $(".blog-post"),
            i = 0,
            r = void 0,
            o = 0,
            s = void 0;
        $(".blog-post").on("scroll resize", function (e) {
            return o = a.scrollTop(), i !== o && (s = o > i, i = o, r !== s && (r = s, s ? n.toggleClass("is-hide", !0) : n.toggleClass("is-hide", !1))), !1
        }), $(".blog-open-nav").on("click", function (n) {
            return "function" == typeof history.pushState && history.pushState("open-nav", "nav"), e.toggleClass("is-visible", !0), !1
        }), $(window).on("popstate", function (n) {
            var a = n.state || n.originalEvent.state;
            return "open-nav" == a ? (e.toggleClass("is-visible", !0)) : (e.toggleClass("is-visible", !1)), !1
        }), $(".blog-close-nav, .blog-overlay").on("click", function (n) {
            return "function" == typeof history.pushState && history.back(), e.toggleClass("is-visible", !1), !1
        }), $("#search").on("keypress", function (e) {
            return 13 === e.keyCode && $(this).val().length > 0 ? (window.location.href = "/s2/search/" + $(this).val().replace(new RegExp("%", "g"), "%25").replace(new RegExp("\\?", "g"), "%3F").replace(new RegExp("#", "g"), "%23"), !1) : void 0
        })

        // dismiss navigation bar when api click
        $('#apiModal').on('shown.bs.modal', function () {
            return "function" == typeof history.pushState && history.back(), e.toggleClass("is-visible", !1), !1
        });

        // logout
        $("#sign_out_button").bind('click', function (e) {
            $.sessionStorage.logout();
            $(location).attr('href', '/');
            e.preventDefault();
        });

    })

    // this moved to server
    // if ($.sessionStorage.hasSession() && $.sessionStorage.isExpired()) {
    //     $.get("/api/member/" + $.sessionStorage.getID().toRequestID(), {}, function (response, status) {
    //         if (response.success) {
    //             if (response.info.account.security.savepassword) {
    //                 console.log('session update (local) : ' + $.sessionStorage.toString());
    //                 $.sessionStorage.loginWithSave(response.info.id.toDisplayID(), response.info.account.player.icon, response.info.account.security.account_type);
    //             } else {
    //                 console.log('session update : (session)' + $.sessionStorage.toString());
    //                 $.sessionStorage.login(response.info.id.toDisplayID(), response.info.account.player.icon, response.info.account.security.account_type);
    //             }
    //         }
    //     });
    // }

})(jQuery, window, document);
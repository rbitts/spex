(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-102917924-1', 'auto');
ga('send', 'pageview');

function Init(t) {
    1 != t && (_afterResize(), _slider_full(), _topNav(), _megaNavHorizontal(), _sideNav(), _stickyFooter(), _infiniteScroll()), _owl_carousel(), _flexslider(), _popover(), _lightbox(), _mixitup(), _animate(), _onepageNav(), _scrollTo(!1, 0), _parallax(), _video(), _youtubeBG(), _toggle(), _placeholder(), _wrotate(), _lazyload(), _misc(), _countDown(), _masonryGallery(), _toastr(!1, !1, !1, !1), _charts(), _select2(), _form(), _pickers(), _editors(), _pajinate(), _zoom(), _autosuggest(), _stepper(), _slimScroll(), _modalAutoLoad(), _bgimage(), _cookie_alert(), _widget_flickr(), _widget_twitter(), _widget_facebook(), _widget_dribbble(), _widget_media(), jQuery("a[data-toggle=tooltip], button[data-toggle=tooltip], span[data-toggle=tooltip]").tooltip()
}

function _afterResize() {
    jQuery(window).on("load", function () {
        "use strict";
        jQuery(window).resize(function () {
            window.afterResizeApp && clearTimeout(window.afterResizeApp), window.afterResizeApp = setTimeout(function () {
                _slider_full(), window.width = jQuery(window).width(), window.height = jQuery(window).height(), jQuery(".flexslider").length > 0 && jQuery(".flexslider").resize()
            }, 300)
        })
    })
}

function loadScript(t, e) {
    if (_arr[t]) e && e();
    else {
        _arr[t] = !0;
        var i = document.getElementsByTagName("body")[0],
            a = document.createElement("script");
        a.type = "text/javascript", a.src = t, a.onload = e, i.appendChild(a)
    }
}

function _slider_full() {
    _headerHeight = 0, jQuery("#header").hasClass("transparent") || jQuery("#header").hasClass("translucent") ? _headerHeight = 0 : (_headerHeight = jQuery("#header").outerHeight() || 0, jQuery("#topBar").length > 0 && (_topBarHeight = jQuery("#topBar").outerHeight() || 0, _headerHeight += _topBarHeight)), _screenHeight = jQuery(window).height() - _headerHeight, jQuery("#header").hasClass("static") && (_screenHeight = jQuery(window).height()), jQuery("#slider").hasClass("halfheight") && jQuery("#slider.halfheight").height(_screenHeight / 2), jQuery("#slider").hasClass("thirdheight") && jQuery("#slider.thirdheight").height(_screenHeight / 1.5), jQuery("#slider").hasClass("fullheight") && (jQuery("#slider.fullheight").height(_screenHeight), jQuery("#slider.fullheight-min").css({
        "min-height": _screenHeight + "px"
    })), window.width < 960 && jQuery("#slider.mobile-fullheight").height(_screenHeight)
}

function _topNav() {
    function t() {
        (n = jQuery(document).scrollTop()) > 100 ? jQuery("#toTop").is(":hidden") && jQuery("#toTop").show() : jQuery("#toTop").is(":visible") && jQuery("#toTop").hide()
    }

    function e() {
        jQuery("#sidepanel_overlay").unbind(), jQuery("#sidepanel_overlay").bind("click", function () {
            jQuery("a#sidepanel_btn").trigger("click")
        })
    }
    window.scrollTop = 0, window._cmScroll = 0;
    var i = jQuery("#header");
    jQuery(window).scroll(function () {
        t()
    });
    var a = !1;
    if (jQuery("#topMain a.dropdown-toggle").bind("click", function (t) {
            "#" == jQuery(this).attr("href") && t.preventDefault(), a = jQuery(this).parent().hasClass("resp-active"), jQuery("#topMain").find(".resp-active").removeClass("resp-active"), a || jQuery(this).parents("li").addClass("resp-active")
        }), jQuery("li.search i.fa").click(function () {
            jQuery("#header .search-box").is(":visible") ? jQuery("#header .search-box").fadeOut(300) : (jQuery(".search-box").fadeIn(300), jQuery("#header .search-box form input").focus(), jQuery("#header li.quick-cart div.quick-cart-box").is(":visible") && jQuery("#header li.quick-cart div.quick-cart-box").fadeOut(300))
        }), 0 != jQuery("#header li.search i.fa").size() && (jQuery("#header .search-box, #header li.search i.fa").on("click", function (t) {
            t.stopPropagation()
        }), jQuery("body").on("click", function () {
            jQuery("#header li.search .search-box").is(":visible") && jQuery("#header .search-box").fadeOut(300)
        })), jQuery(document).bind("click", function () {
            jQuery("#header li.search .search-box").is(":visible") && jQuery("#header .search-box").fadeOut(300)
        }), jQuery("#closeSearch").bind("click", function (t) {
            t.preventDefault(), jQuery("#header .search-box").fadeOut(300)
        }), jQuery("button#page-menu-mobile").bind("click", function () {
            jQuery(this).next("ul").slideToggle(150)
        }), jQuery("li.quick-cart>a").click(function (t) {
            t.preventDefault();
            var e = jQuery("li.quick-cart div.quick-cart-box");
            e.is(":visible") ? e.fadeOut(300) : (e.fadeIn(300), jQuery("li.search .search-box").is(":visible") && jQuery(".search-box").fadeOut(300))
        }), 0 != jQuery("li.quick-cart>a").size() && (jQuery("li.quick-cart").on("click", function (t) {
            t.stopPropagation()
        }), jQuery("body").on("click", function () {
            jQuery("li.quick-cart div.quick-cart-box").is(":visible") && jQuery("li.quick-cart div.quick-cart-box").fadeOut(300)
        })), jQuery("#page-menu ul.menu-scrollTo>li").bind("click", function (t) {
            var e = jQuery("a", this).attr("href");
            jQuery("a", this).hasClass("external") || (t.preventDefault(), jQuery("#page-menu ul.menu-scrollTo>li").removeClass("active"), jQuery(this).addClass("active"), jQuery(e).length > 0 && (_padding_top = 0, jQuery("#header").hasClass("sticky") && (_padding_top = jQuery(e).css("padding-top"), _padding_top = _padding_top.replace("px", "")), jQuery("html,body").animate({
                scrollTop: jQuery(e).offset().top - _padding_top
            }, 800, "easeInOutExpo")))
        }), window.currentScroll = 0, jQuery("button.btn-mobile").bind("click", function (t) {
            t.preventDefault(), jQuery(this).toggleClass("btn-mobile-active"), jQuery("html").removeClass("noscroll"), jQuery("#menu-overlay").remove(), jQuery("#topNav div.nav-main-collapse").hide(0), jQuery(this).hasClass("btn-mobile-active") ? (jQuery("#topNav div.nav-main-collapse").show(0), jQuery("html").addClass("noscroll"), jQuery("body").append('<div id="menu-overlay"></div>'), window.currentScroll = jQuery(window).scrollTop()) : jQuery("html,body").animate({
                scrollTop: currentScroll
            }, 300, "easeInOutExpo")
        }), i.hasClass("bottom")) i.addClass("dropup"), window.homeHeight = jQuery(window).outerHeight() - 55, i.hasClass("sticky") && (window.isOnTop = !0, jQuery(window).scroll(function () {
        jQuery(document).scrollTop() > window.homeHeight / 2 ? i.removeClass("dropup") : i.addClass("dropup")
    }), jQuery(window).scroll(function () {
        jQuery(document).scrollTop() > window.homeHeight ? !0 === window.isOnTop && (jQuery("#header").addClass("fixed"), i.removeClass("dropup"), window.isOnTop = !1) : !1 === window.isOnTop && (jQuery("#header").removeClass("fixed"), i.addClass("dropup"), window.isOnTop = !0)
    }), jQuery(window).resize(function () {
        window.homeHeight = jQuery(window).outerHeight()
    }));
    else if (i.hasClass("sticky")) {
        if (_topBar_H = jQuery("#topBar").outerHeight() || 0, window.width <= 992 && _topBar_H < 1) {
            n = jQuery(document).scrollTop();
            _header_H = i.outerHeight() || 0, i.addClass("fixed"), jQuery("body").css({
                "padding-top": _header_H + "px"
            })
        }
        jQuery(window).scroll(function () {
            if (window.width > 992 && _topBar_H < 1 || _topBar_H > 0) {
                var t = jQuery(document).scrollTop();
                t > _topBar_H ? (i.addClass("fixed"), _header_H = i.outerHeight() || 0, i.hasClass("transparent") || i.hasClass("translucent") || jQuery("body").css({
                    "padding-top": _header_H + "px"
                })) : (i.hasClass("transparent") || i.hasClass("translucent") || jQuery("body").css({
                    "padding-top": "0px"
                }), i.removeClass("fixed"))
            }
            if (i.hasClass("transparent")) {
                var e = jQuery("#topNav div.nav-main-collapse"),
                    a = e.attr("data-switch-default") || "",
                    n = e.attr("data-switch-scroll") || "";
                "" == a && "" == n || (t > 0 ? window._cmScroll < 1 && (e.removeClass(a, n).addClass(n), window._cmScroll = 1) : t < 1 && (e.removeClass(a, n).addClass(a), window._cmScroll = 0))
            }
        })
    } else if (i.hasClass("static") && i.hasClass("transparent")) {
        if (_topBar_H = jQuery("#topBar").outerHeight() || 0, window.width <= 992 && _topBar_H < 1) {
            var n = jQuery(document).scrollTop();
            _header_H = i.outerHeight() || 0, i.addClass("fixed")
        }
        jQuery(window).scroll(function () {
            (window.width > 992 && _topBar_H < 1 || _topBar_H > 0) && (jQuery(document).scrollTop() > _topBar_H ? (i.addClass("fixed"), _header_H = i.outerHeight() || 0) : i.removeClass("fixed"))
        })
    } else i.hasClass("static");
    if (jQuery("#slidetop a.slidetop-toggle").bind("click", function () {
            jQuery("#slidetop .container").slideToggle(150, function () {
                jQuery("#slidetop .container").is(":hidden") ? jQuery("#slidetop").removeClass("active") : jQuery("#slidetop").addClass("active")
            })
        }), jQuery(document).keyup(function (t) {
            27 == t.keyCode && jQuery("#slidetop").hasClass("active") && jQuery("#slidetop .container").slideToggle(150, function () {
                jQuery("#slidetop").removeClass("active")
            })
        }), jQuery("a#sidepanel_btn").bind("click", function (t) {
            t.preventDefault(), r = "right", jQuery("#sidepanel").hasClass("sidepanel-inverse") && (r = "left"), jQuery("#sidepanel").is(":hidden") ? (jQuery("body").append('<span id="sidepanel_overlay"></span>'), "left" == r ? jQuery("#sidepanel").stop().show().animate({
                left: "0px"
            }, 150) : jQuery("#sidepanel").stop().show().animate({
                right: "0px"
            }, 150)) : (jQuery("#sidepanel_overlay").remove(), "left" == r ? jQuery("#sidepanel").stop().animate({
                left: "-300px"
            }, 300) : jQuery("#sidepanel").stop().animate({
                right: "-300px"
            }, 300), setTimeout(function () {
                jQuery("#sidepanel").hide()
            }, 500)), e()
        }), jQuery("#sidepanel_close").bind("click", function (t) {
            t.preventDefault(), jQuery("a#sidepanel_btn").trigger("click")
        }), jQuery(document).keyup(function (t) {
            27 == t.keyCode && jQuery("#sidepanel").is(":visible") && jQuery("a#sidepanel_btn").trigger("click")
        }), jQuery("#menu_overlay_open").length > 0) {
        var o = !!jQuery("html").hasClass("ie9");
        1 == o && jQuery("#topMain").hide(), jQuery("#menu_overlay_open").bind("click", function (t) {
            t.preventDefault(), jQuery("body").addClass("show-menu"), 1 == o && jQuery("#topMain").show()
        }), jQuery("#menu_overlay_close").bind("click", function (t) {
            t.preventDefault(), jQuery("body").hasClass("show-menu") && jQuery("body").removeClass("show-menu"), 1 == o && jQuery("#topMain").hide()
        }), jQuery(document).keyup(function (t) {
            27 == t.keyCode && (jQuery("body").hasClass("show-menu") && jQuery("body").removeClass("show-menu"), 1 == o && jQuery("#topMain").hide())
        })
    }
    if (jQuery("#sidebar_vertical_btn").length > 0 && jQuery("body").hasClass("menu-vertical-hide")) {
        if (_paddingStatusL = jQuery("#mainMenu.sidebar-vertical").css("left"), _paddingStatusR = jQuery("#mainMenu.sidebar-vertical").css("right"), parseInt(_paddingStatusL) < 0) r = "left";
        else if (parseInt(_paddingStatusR) < 0) r = "right";
        else var r = "left";
        jQuery("#sidebar_vertical_btn").bind("click", function (t) {
            _paddingStatus = jQuery("#mainMenu.sidebar-vertical").css(r), parseInt(_paddingStatus) < 0 ? "right" == r ? jQuery("#mainMenu.sidebar-vertical").stop().animate({
                right: "0px"
            }, 200) : jQuery("#mainMenu.sidebar-vertical").stop().animate({
                left: "0px"
            }, 200) : "right" == r ? jQuery("#mainMenu.sidebar-vertical").stop().animate({
                right: "-263px"
            }, 200) : jQuery("#mainMenu.sidebar-vertical").stop().animate({
                left: "-263px"
            }, 200)
        }), jQuery(window).scroll(function () {
            _paddingStatus = parseInt(jQuery("#mainMenu.sidebar-vertical").css(r)), _paddingStatus >= 0 && ("right" == r ? jQuery("#mainMenu.sidebar-vertical").stop().animate({
                right: "-263px"
            }, 200) : jQuery("#mainMenu.sidebar-vertical").stop().animate({
                left: "-263px"
            }, 200))
        })
    }
    jQuery("#topBar").length > 0 && jQuery("#topNav ul").addClass("has-topBar"), jQuery(window).scroll(function () {
        window.width < 769 && (jQuery("#header li.quick-cart div.quick-cart-box").is(":visible") && jQuery("#header li.quick-cart div.quick-cart-box").fadeOut(0), jQuery("#header li.search .search-box").is(":visible") && jQuery("#header .search-box").fadeOut(0))
    })
}

function _megaNavHorizontal() {
    function t() {
        jQuery("#main-nav-overlay").remove(), jQuery("#header nav.main-nav").addClass("min-nav-active"), jQuery("body").append('<div id="main-nav-overlay"></div>'), jQuery("#header button.nav-toggle-close").bind("click", function () {
            jQuery("#header nav.main-nav").removeClass("min-nav-active")
        }), jQuery("#main-nav-overlay, #header").mouseover(function () {
            e()
        })
    }

    function e() {
        jQuery("#main-nav-overlay").remove(), jQuery("#header nav.main-nav").removeClass("min-nav-active")
    }
    if (jQuery("#wrapper nav.main-nav").length > 0) {
        var i = jQuery("#slider").width(),
            a = jQuery("#wrapper nav.main-nav").height();
        jQuery("#wrapper nav.main-nav>div>ul>li>.main-nav-submenu").css({
            "min-height": a + "px"
        }), jQuery("#wrapper nav.main-nav>div>ul>li.main-nav-expanded>.main-nav-submenu").css({
            width: i + "px"
        }), jQuery("#wrapper nav.main-nav>div>ul>li").bind("click", function (t) {
            var e = jQuery(this);
            jQuery("div", e).hasClass("main-nav-open") || jQuery("#wrapper nav.main-nav>div>ul>li>.main-nav-submenu").removeClass("main-nav-open"), jQuery("div", e).toggleClass("main-nav-open")
        })
    }
    var n = jQuery("#header>.container").width() - 278,
        o = jQuery("#header nav.main-nav").height();
    jQuery("#header nav.main-nav>div>ul>li>.main-nav-submenu").css({
        "min-height": o + "px"
    }), jQuery("#header nav.main-nav>div>ul>li.main-nav-expanded>.main-nav-submenu").css({
        width: n + "px"
    }), jQuery("#header nav.main-nav>div>ul>li").bind("click", function (t) {
        var e = jQuery(this);
        jQuery("div", e).hasClass("main-nav-open") || jQuery("#header nav.main-nav>div>ul>li>.main-nav-submenu").removeClass("main-nav-open"), jQuery("div", e).toggleClass("main-nav-open")
    }), window.width > 767 ? jQuery("#header button.nav-toggle").mouseover(function (e) {
        e.preventDefault(), t()
    }) : jQuery("#header button.nav-toggle").bind("click", function (e) {
        e.preventDefault(), t()
    }), jQuery("body").on("click", "#header button.nav-toggle, #header nav.main-nav", function (t) {
        t.stopPropagation()
    }), jQuery("#header button.nav-toggle, #header nav.main-nav").mouseover(function (t) {
        t.stopPropagation()
    }), jQuery(document).bind("click", function () {
        e()
    }), jQuery("nav.main-nav>div>ul>li a").bind("click", function (t) {
        "#" == jQuery(this).attr("href") && t.preventDefault()
    })
}

function _sideNav() {
    jQuery("div.side-nav").each(function () {
        var t = jQuery("ul", this);
        jQuery("button", this).bind("click", function () {
            t.slideToggle(300)
        })
    }), jQuery("div.side-nav>ul>li>a.dropdown-toggle").bind("click", function (t) {
        t.preventDefault(), jQuery(this).next("ul").slideToggle(200), jQuery(this).closest("li").toggleClass("active")
    })
}

function _animate() {
    jQuery("body").hasClass("enable-animation") && new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 90,
        mobile: !1,
        live: !0
    }).init(), jQuery(".countTo").appear(function () {
        var t = jQuery(this),
            e = t.attr("data-from") || 0,
            i = t.attr("data-speed") || 1300,
            a = t.attr("data-refreshInterval") || 60;
        t.countTo({
            from: parseInt(e),
            to: t.html(),
            speed: parseInt(i),
            refreshInterval: parseInt(a)
        })
    })
}

function _onepageNav() {
    var t = jQuery(".nav-onepage");
    t.length > 0 && loadScript(plugin_path + "jquery.nav.min.js", function () {
        jQuery(t).onePageNav({
            currentClass: "active",
            changeHash: !1,
            scrollSpeed: 750,
            scrollThreshold: .5,
            filter: ":not(.external)",
            easing: "easeInOutExpo"
        })
    });
    var e = jQuery("#nav-bullet");
    e.length > 0 && loadScript(plugin_path + "jquery.nav.min.js", function () {
        jQuery(e).onePageNav({
            currentClass: "active",
            changeHash: !1,
            scrollSpeed: 750,
            scrollThreshold: .5,
            filter: ":not(.external)",
            easing: "easeInOutExpo"
        })
    })
}

function _owl_carousel() {
    var _container = jQuery("div.owl-carousel");
    _container.length > 0 && loadScript(plugin_path + "owl-carousel/owl.carousel.min.js", function () {
        _container.each(function () {
            function progressBar(t) {
                $elem = t, buildProgressBar(), start()
            }

            function buildProgressBar() {
                $progressBar = jQuery("<div>", {
                    id: "progressBar"
                }), $bar = jQuery("<div>", {
                    id: "bar"
                }), $progressBar.append($bar).prependTo($elem)
            }

            function start() {
                percentTime = 0, isPause = !1, tick = setInterval(interval, 10)
            }

            function interval() {
                !1 === isPause && (percentTime += 1 / time, $bar.css({
                    width: percentTime + "%"
                }), percentTime >= 100 && $elem.trigger("owl.next"))
            }

            function pauseOnDragging() {
                isPause = !0
            }

            function moved() {
                clearTimeout(tick), start()
            }
            var slider = jQuery(this),
                options = slider.attr("data-plugin-options"),
                $opt = eval("(" + options + ")");
            if ("true" == $opt.progressBar) var afterInit = progressBar;
            else var afterInit = !1;
            var defaults = {
                    items: 5,
                    itemsCustom: !1,
                    itemsDesktop: [1199, 4],
                    itemsDesktopSmall: [980, 3],
                    itemsTablet: [768, 2],
                    itemsTabletSmall: !1,
                    itemsMobile: [479, 1],
                    singleItem: !0,
                    itemsScaleUp: !1,
                    slideSpeed: 200,
                    paginationSpeed: 800,
                    rewindSpeed: 1e3,
                    autoPlay: !1,
                    stopOnHover: !1,
                    navigation: !1,
                    navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                    rewindNav: !0,
                    scrollPerPage: !1,
                    pagination: !0,
                    paginationNumbers: !1,
                    responsive: !0,
                    responsiveRefreshRate: 200,
                    responsiveBaseWidth: window,
                    baseClass: "owl-carousel",
                    theme: "owl-theme",
                    lazyLoad: !1,
                    lazyFollow: !0,
                    lazyEffect: "fade",
                    autoHeight: !1,
                    jsonPath: !1,
                    jsonSuccess: !1,
                    dragBeforeAnimFinish: !0,
                    mouseDrag: !0,
                    touchDrag: !0,
                    transitionStyle: !1,
                    addClassActive: !1,
                    beforeUpdate: !1,
                    afterUpdate: !1,
                    beforeInit: !1,
                    afterInit: afterInit,
                    beforeMove: !1,
                    afterMove: 0 != afterInit && moved,
                    afterAction: !1,
                    startDragging: !1,
                    afterLazyLoad: !1
                },
                config = jQuery.extend({}, defaults, options, slider.data("plugin-options"));
            slider.owlCarousel(config).addClass("owl-carousel-init");
            var elem = jQuery(this),
                time = 7
        })
    });
    var _container2 = jQuery("div.owl-carousel-2");
    _container2.length > 0 && loadScript(plugin_path + "owl-carousel-2/owl.carousel.min.js", function () {
        _container2.each(function () {
            var t = jQuery(this),
                e = t.attr("data-plugin-options");
            _defaults = {
                loop: !0,
                margin: 10,
                nav: !0,
                center: !1,
                mouseDrag: !0,
                touchDrag: !0,
                pullDrag: !0,
                freeDrag: !1,
                stagePadding: 0,
                merge: !1,
                mergeFit: !0,
                autoWidth: !1,
                startPosition: 0,
                URLhashListener: !1,
                navRewind: !0,
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                slideBy: 1,
                dots: !0,
                dotsEach: !1,
                dotData: !1,
                lazyLoad: !1,
                lazyContent: !1,
                autoplay: !1,
                autoplayTimeout: 3e3,
                autoplayHoverPause: !1,
                smartSpeed: 250,
                autoplaySpeed: !1,
                navSpeed: !1,
                dragEndSpeed: !1,
                callbacks: !0,
                responsiveRefreshRate: 200,
                responsiveBaseElement: "#wrapper",
                responsiveClass: !0,
                video: !1,
                videoHeight: !1,
                videoWidth: !1,
                animateOut: !1,
                animateIn: !1,
                fallbackEasing: "swing",
                info: !1,
                nestedItemSelector: !1,
                itemElement: "div",
                navContainer: !1,
                dotsContainer: !1,
                animateOut: "slideOutDown",
                animateIn: "flipInX",
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    1e3: {
                        items: 5
                    }
                }
            };
            var i = jQuery.extend({}, _defaults, JSON.parse(e));
            t.owlCarousel(i).addClass("owl-loaded")
        })
    })
}

function _flexslider() {
    var t = jQuery(".flexslider");
    t.length > 0 && loadScript(plugin_path + "slider.flexslider/jquery.flexslider-min.js", function () {
        if (jQuery().flexslider) {
            var e = t.attr("data-controlNav"),
                i = t.attr("data-slideshowSpeed") || 7e3,
                a = t.attr("data-pauseOnHover") || !1;
            a = "true" == a, e = "thumbnails" == e ? "thumbnails" : "true" == e || "false" != e, _directionNav = "thumbnails" != e && 0 != e, jQuery(t).flexslider({
                animation: "slide",
                controlNav: e,
                slideshowSpeed: parseInt(i) || 7e3,
                directionNav: _directionNav,
                pauseOnHover: a,
                start: function (t) {
                    jQuery(".flex-prev").html('<i class="fa fa-angle-left"></i>'), jQuery(".flex-next").html('<i class="fa fa-angle-right"></i>')
                }
            }), t.resize()
        }
    })
}

function _popover() {
    jQuery("a[data-toggle=popover]").bind("click", function (t) {
        jQuery(".popover-title .close").remove(), t.preventDefault()
    });
    var t = !1,
        e = !1;
    jQuery("a[data-toggle=popover], button[data-toggle=popover]").popover({
        html: !0,
        trigger: "manual"
    }).click(function (i) {
        jQuery(this).popover("show"), e = !1, t = !0, i.preventDefault()
    }), jQuery(document).click(function (i) {
        t & e ? (jQuery("a[data-toggle=popover], button[data-toggle=popover]").popover("hide"), t = e = !1) : e = !0
    }), jQuery("a[data-toggle=popover], button[data-toggle=popover]").popover({
        html: !0,
        trigger: "manual"
    }).click(function (t) {
        $(this).popover("show"), $(".popover-title").append('<button type="button" class="close">&times;</button>'), $(".close").click(function (t) {
            jQuery("a[data-toggle=popover], button[data-toggle=popover]").popover("hide")
        }), t.preventDefault()
    })
}

function _lightbox() {
    var t = jQuery(".lightbox");
    t.length > 0 && loadScript(plugin_path + "magnific-popup/jquery.magnific-popup.min.js", function () {
        if (void 0 === jQuery.magnificPopup) return !1;
        jQuery.extend(!0, jQuery.magnificPopup.defaults, {
            tClose: "Close",
            tLoading: "Loading...",
            gallery: {
                tPrev: "Previous",
                tNext: "Next",
                tCounter: "%curr% / %total%"
            },
            image: {
                tError: "Image not loaded!"
            },
            ajax: {
                tError: "Content not loaded!"
            }
        }), t.each(function () {
            var t = jQuery(this),
                e = t.attr("data-plugin-options"),
                i = {},
                a = {
                    type: "image",
                    fixedContentPos: !1,
                    fixedBgPos: !1,
                    mainClass: "mfp-no-margins mfp-with-zoom",
                    closeOnContentClick: !0,
                    closeOnBgClick: !0,
                    image: {
                        verticalFit: !0
                    },
                    zoom: {
                        enabled: !1,
                        duration: 300
                    },
                    gallery: {
                        enabled: !1,
                        navigateByImgClick: !0,
                        preload: [0, 1],
                        arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                        tPrev: "Previous",
                        tNext: "Next",
                        tCounter: '<span class="mfp-counter">%curr% / %total%</span>'
                    }
                };
            t.data("plugin-options") && (i = jQuery.extend({}, a, e, t.data("plugin-options"))), jQuery(this).magnificPopup(i)
        })
    })
}

function _scrollTo(t, e) {
    0 == t ? (jQuery("a.scrollTo").bind("click", function (t) {
        t.preventDefault();
        var e = jQuery(this).attr("href"),
            i = jQuery(this).attr("data-offset") || 0;
        "#" != e && "#top" != e && jQuery("html,body").animate({
            scrollTop: jQuery(e).offset().top - parseInt(i)
        }, 800, "easeInOutExpo"), "#top" == e && jQuery("html,body").animate({
            scrollTop: 0
        }, 800, "easeInOutExpo")
    }), jQuery("#toTop").bind("click", function (t) {
        t.preventDefault(), jQuery("html,body").animate({
            scrollTop: 0
        }, 800, "easeInOutExpo")
    })) : jQuery("html,body").animate({
        scrollTop: jQuery(t).offset().top - e
    }, 800, "easeInOutExpo")
}

function _parallax() {
    jQuery().parallax && jQuery(".parallax-auto, .parallax-1, .parallax-2, .parallax-3, .parallax-4, section.page-header.page-header-parallax").each(function () {
        jQuery(this);
        jQuery(this).parallax("50%", "0.2")
    });
    var t = jQuery("#slider");
    if (t.length > 0 && t.hasClass("parallax-slider")) {
        if (window.width < 768 && t.hasClass("pallax-slider-mobile-deisable")) return !1;
        t.offset().top;
        jQuery(window).scroll(function () {
            var e = jQuery(document).scrollTop(),
                i = t.attr("data-parallax-offset") || 0;
            if (e < 768) {
                var a = jQuery("#slider").height();
                jQuery("#slider>div").css("top", .5 * e - Number(i)), t.hasClass("parallax-slider-noopacity") || jQuery("#slider>div").css("opacity", 1 - e / a * 1)
            }
        })
    }
}

function _video() {
    if (jQuery("section.section-video").length > 0) {
        var t = jQuery("section.section-video .section-container-video>video");
        _w = jQuery(window).width(), t.width(_w)
    }
}

function _youtubeBG() {
    jQuery("#YTPlayer").length > 0 && loadScript(plugin_path + "jquery.mb.YTPlayer.min.js", function () {
        if (jQuery().mb_YTPlayer) {
            /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent), jQuery(".player").mb_YTPlayer(), jQuery("#video-volume").bind("click", function (t) {
                t.preventDefault(), jQuery("#YTPlayer").toggleVolume()
            }), jQuery("#video-volume").bind("click", function () {
                jQuery("i.fa", this).hasClass("fa-volume-down") ? (jQuery("i.fa", this).removeClass("fa-volume-down"), jQuery("i.fa", this).removeClass("fa-volume-up"), jQuery("i.fa", this).addClass("fa-volume-up")) : (jQuery("i.fa", this).removeClass("fa-volume-up"), jQuery("i.fa", this).removeClass("fa-volume-v"), jQuery("i.fa", this).addClass("fa-volume-down"))
            })
        }
    })
}

function _mixitup() {
    var t = jQuery(".mix-grid");
    t.length > 0 && loadScript(plugin_path + "mixitup/jquery.mixitup.min.js", function () {
        jQuery().mixitup && (t.mixitup(), jQuery("ul.mix-filter a").bind("click", function (t) {
            t.preventDefault()
        }))
    })
}

function _toggle() {
    jQuery("div.toggle.active > p").addClass("preview-active"), jQuery("div.toggle.active > div.toggle-content").slideDown(400), jQuery("div.toggle > label").click(function (t) {
        var e = jQuery(this).parent(),
            i = jQuery(this).parents("div.toggle"),
            a = !1;
        if (i.hasClass("toggle-accordion") && void 0 !== t.originalEvent && i.find("div.toggle.active > label").trigger("click"), e.toggleClass("active"), e.find("> p").get(0)) {
            var n = (a = e.find("> p")).css("height"),
                o = a.css("height");
            a.css("height", "auto"), a.css("height", n)
        }
        var r = e.find("> div.toggle-content");
        e.hasClass("active") ? (jQuery(a).animate({
            height: o
        }, 350, function () {
            jQuery(this).addClass("preview-active")
        }), r.slideDown(350)) : (jQuery(a).animate({
            height: 25
        }, 350, function () {
            jQuery(this).removeClass("preview-active")
        }), r.slideUp(350))
    })
}

function _placeholder() {
    -1 != navigator.appVersion.indexOf("MSIE") && jQuery("[placeholder]").focus(function () {
        var t = jQuery(this);
        t.val() == t.attr("placeholder") && (t.val(""), t.removeClass("placeholder"))
    }).blur(function () {
        var t = jQuery(this);
        "" != t.val() && t.val() != t.attr("placeholder") || (t.addClass("placeholder"), t.val(t.attr("placeholder")))
    }).blur()
}

function _wrotate() {
    jQuery(".word-rotator").each(function () {
        var t = jQuery(this),
            e = t.find(".items"),
            i = e.find("> span"),
            a = i.eq(0).clone(),
            n = jQuery(this).height(),
            o = 1,
            r = 0,
            s = jQuery(this).attr("data-delay") || 2e3;
        e.append(a), t.height(n).addClass("active"), setInterval(function () {
            r = o * n, e.animate({
                top: -r + "px"
            }, 300, "easeOutQuad", function () {
                ++o > i.length && (e.css("top", 0), o = 1)
            })
        }, s)
    });
    var t = jQuery("span.rotate");
    t.length > 0 && loadScript(plugin_path + "text-rotator/jquery.simple-text-rotator.min.js", function () {
        t.each(function () {
            var t = jQuery(this),
                e = t.attr("data-animation") || "fade",
                i = t.attr("data-speed") || 2e3;
            t.textrotator({
                animation: e,
                speed: parseInt(i)
            })
        })
    })
}

function _lazyload() {
    var t = jQuery("img.lazy");
    t.length > 0 && loadScript(plugin_path + "lazyload/jquery.lazyload.min.js", function () {
        jQuery().lazyload && t.each(function () {
            var t = jQuery(this),
                e = t.attr("data-effect") || "fadeIn";
            t.lazyload({
                effect: e
            })
        })
    })
}

function _misc() {
    if (jQuery("#portfolio").length > 0 && jQuery("#portfolio .item-box .owl-carousel").each(function () {
            jQuery(this).parent().parent().find(".item-box-desc").css({
                "padding-top": "29px"
            })
        }), jQuery().masonry && jQuery(".masonry").masonry(), jQuery("#portfolio.portfolio-isotope").length > 0 && loadScript(plugin_path + "isotope/isotope.pkgd.min.js", function () {
            function t() {
                _dw = jQuery(document).width(), e.hasClass("fullwidth") ? (_w = e.width(), _wItem = _w / _cols, _dw < 760 && (_wItem = _w / 2), _dw < 480 && (_wItem = jQuery("#portfolio").width()), jQuery("#portfolio>.portfolio-item").css({
                    width: _wItem
                })) : (_mR = parseInt(jQuery("#portfolio>.portfolio-item").css("margin-right")), _w = jQuery("#portfolio").closest(".container").width(), _wItem = _w / _cols - _mR, _dw < 760 && (_wItem = _w / 2 - _mR), _dw < 480 && (_wItem = _w), jQuery("#portfolio.portfolio-isotope").css({
                    width: _w
                }), jQuery("#portfolio>.portfolio-item").css({
                    width: _wItem
                })), jQuery(".flexslider").length > 0 && jQuery(".flexslider").resize()
            }
            if (jQuery().isotope) {
                var e = jQuery("#portfolio");
                e.hasClass("portfolio-isotope-2") ? _cols = 2 : e.hasClass("portfolio-isotope-3") ? _cols = 3 : e.hasClass("portfolio-isotope-4") ? _cols = 4 : e.hasClass("portfolio-isotope-5") ? _cols = 5 : e.hasClass("portfolio-isotope-6") ? _cols = 6 : _cols = 4, t(), jQuery(window).on("load", function () {
                    setTimeout(function () {
                        e.isotope({
                            masonry: {},
                            filter: "*",
                            animationOptions: {
                                duration: 750,
                                easing: "linear",
                                queue: !1
                            }
                        }), jQuery("#portfolio_filter>li>a").bind("click", function (t) {
                            t.preventDefault(), jQuery("#portfolio_filter>li.active").removeClass("active"), jQuery(this).parent("li").addClass("active");
                            var i = jQuery(this).attr("data-filter");
                            e.isotope({
                                filter: i,
                                animationOptions: {
                                    duration: 750,
                                    easing: "linear",
                                    queue: !1
                                }
                            })
                        })
                    }, 50);
                    setTimeout(function () {
                        e.isotope("layout")
                    }, 300)
                }), jQuery(window).resize(function () {
                    window.afterResizeApp2 && clearTimeout(window.afterResizeApp2), window.afterResizeApp2 = setTimeout(function () {
                        t(), setTimeout(function () {
                            e.isotope("layout")
                        }, 300)
                    }, 300)
                })
            }
        }), jQuery("#blog.blog-isotope").length > 0 && loadScript(plugin_path + "isotope/isotope.pkgd.min.js", function () {
            function t() {
                _dw = jQuery(document).width(), e.hasClass("fullwidth") ? (_w = jQuery(document).width(), _wItem = _w / _cols, _dw < 760 && (_wItem = _w / 2), _dw < 480 && (_wItem = jQuery("#blog").width()), jQuery("#blog>.blog-post-item").css({
                    width: _wItem
                })) : (_mR = parseInt(jQuery("#blog>.blog-post-item").css("margin-right")), _w = jQuery("#blog").closest(".container").width(), _wItem = _w / _cols - _mR, _dw < 760 && (_wItem = _w / 2 - _mR), _dw < 480 && (_wItem = _w), jQuery("#blog.blog-isotope").css({
                    width: _w
                }), jQuery("#blog>.blog-post-item").css({
                    width: _wItem
                })), jQuery(".flexslider").length > 0 && jQuery(".flexslider").resize()
            }
            if (jQuery().isotope) {
                var e = jQuery("#blog");
                e.hasClass("blog-isotope-2") ? _cols = 2 : e.hasClass("blog-isotope-3") ? _cols = 3 : (e.hasClass("blog-isotope-4"), _cols = 4), t(), jQuery(window).on("load", function () {
                    setTimeout(function () {
                        e.isotope({
                            masonry: {},
                            filter: "*",
                            animationOptions: {
                                duration: 750,
                                easing: "linear",
                                queue: !1
                            }
                        }), jQuery("#blog_filter>li>a").bind("click", function (t) {
                            t.preventDefault(), jQuery("#blog_filter>li.active").removeClass("active"), jQuery(this).parent("li").addClass("active");
                            var i = jQuery(this).attr("data-filter");
                            e.isotope({
                                filter: i,
                                animationOptions: {
                                    duration: 750,
                                    easing: "linear",
                                    queue: !1
                                }
                            })
                        })
                    }, 50);
                    setTimeout(function () {
                        e.isotope("layout")
                    }, 300)
                }), jQuery(window).resize(function () {
                    window.afterResizeApp2 && clearTimeout(window.afterResizeApp2), window.afterResizeApp2 = setTimeout(function () {
                        t(), setTimeout(function () {
                            e.isotope("layout")
                        }, 300)
                    }, 300)
                })
            }
        }), jQuery(".box-flip").length > 0 && (jQuery(".box-flip").each(function () {
            _height1 = jQuery(".box1", this).outerHeight(), _height2 = jQuery(".box2", this).outerHeight(), _height1 >= _height2 ? _height = _height1 : _height = _height2, jQuery(this).css({
                "min-height": _height + "px"
            }), jQuery(".box1", this).css({
                "min-height": _height + "px"
            }), jQuery(".box2", this).css({
                "min-height": _height + "px"
            })
        }), jQuery(".box-flip").hover(function () {
            jQuery(this).addClass("flip")
        }, function () {
            jQuery(this).removeClass("flip")
        })), jQuery("div.sticky-side").length > 0) {
        var t = jQuery("div.sticky-side");
        _h = t.height() / 2, t.css({
            "margin-top": "-" + _h + "px"
        })
    }
    jQuery(".incr").bind("click", function (t) {
        t.preventDefault();
        var e = jQuery(this).attr("data-for"),
            i = parseInt(jQuery(this).attr("data-max")),
            a = parseInt(jQuery("#" + e).val());
        a < i && jQuery("#" + e).val(a + 1)
    }), jQuery(".decr").bind("click", function (t) {
        t.preventDefault();
        var e = jQuery(this).attr("data-for"),
            i = parseInt(jQuery(this).attr("data-min")),
            a = parseInt(jQuery("#" + e).val());
        a > i && jQuery("#" + e).val(a - 1)
    }), jQuery("a.toggle-default").bind("click", function (t) {
        t.preventDefault();
        var e = jQuery(this).attr("href");
        jQuery(e).is(":hidden") ? (jQuery(e).slideToggle(200), jQuery("i.fa", this).removeClass("fa-plus-square").addClass("fa-minus-square")) : (jQuery(e).slideToggle(200), jQuery("i.fa", this).removeClass("fa-minus-square").addClass("fa-plus-square"))
    }), jQuery("input[type=file]").length > 0 && loadScript(plugin_path + "custom.fle_upload.js"), jQuery("textarea.word-count").on("keyup", function () {
        var t = jQuery(this),
            e = this.value.match(/\S+/g).length,
            i = t.attr("data-maxlength") || 200;
        if (e > parseInt(i)) {
            var a = t.val().split(/\s+/, 200).join(" ");
            t.val(a + " ")
        } else {
            var n = t.attr("data-info");
            if ("" == n || void 0 == n) {
                var o = t.next("div");
                jQuery("span", o).text(e + "/" + i)
            } else jQuery("#" + n).text(e + "/" + i)
        }
    })
}

function _stickyFooter() {
    function t() {
        e = a.height(), i = jQuery(window).scrollTop() + jQuery(window).height() - e + "px", jQuery(document.body).height() + e > jQuery(window).height() ? a.css({
            position: "absolute"
        }).stop().animate({
            top: i
        }, 0) : a.css({
            position: "static"
        })
    }
    if (jQuery("#footer").hasClass("sticky")) {
        var e = 0,
            i = 0,
            a = jQuery("#footer.sticky");
        t(), jQuery(window).scroll(t).resize(t)
    }
}

function _countDown() {
    var t = jQuery(".countdown"),
        e = jQuery(".countdown-download");
    (t.length > 0 || e.length > 0) && loadScript(plugin_path + "countdown/jquery.countdown.pack.min.js", function () {
        t.each(function () {
            var t = jQuery(this),
                e = t.attr("data-from"),
                i = t.attr("data-labels");
            if (i && (i = i.split(",")), e) {
                var a = new Date(e);
                jQuery(this).countdown({
                    until: new Date(a),
                    labels: i || ["Years", "Months", "Weeks", "Days", "Hours", "Minutes", "Seconds"]
                })
            }
        }), e.bind("click", function (t) {
            t.preventDefault();
            var e = jQuery(this),
                i = e.attr("data-for"),
                a = jQuery("#" + i + " span.download-wait>.countdown"),
                n = parseInt(e.attr("data-seconds")),
                o = e.attr("href");
            return e.fadeOut(250, function () {
                jQuery("#" + i).fadeIn(250, function () {
                    var t = new Date;
                    t.setSeconds(t.getSeconds() + n), a.countdown({
                        until: t,
                        format: "S",
                        expiryUrl: o,
                        onExpiry: function () {
                            jQuery("#" + i + " span.download-message").removeClass("hide"), jQuery("#" + i + " span.download-wait").addClass("hide")
                        }
                    })
                })
            }), !1
        })
    })
}

function _masonryGallery() {
    jQuery(".masonry-gallery").length > 0 && jQuery(".masonry-gallery").each(function () {
        var t = jQuery(this),
            e = 4;
        t.hasClass("columns-2") ? e = 2 : t.hasClass("columns-3") ? e = 3 : t.hasClass("columns-4") ? e = 4 : t.hasClass("columns-5") ? e = 5 : t.hasClass("columns-6") && (e = 6);
        var i = t.find("a:eq(0)").outerWidth(),
            a = t.attr("data-img-big"),
            n = t.width(),
            o = n / e;
        (o = Math.floor(o)) * e >= n && t.css({
            "margin-right": "-1px"
        }), e < 6 && t.children("a").css({
            width: o + "px"
        }), parseInt(a) > 0 && (a = Number(a) - 1, t.find("a:eq(" + a + ")").css({
            width: 2 * i + "px"
        }), loadScript(plugin_path + "isotope/isotope.pkgd.min.js", function () {
            setTimeout(function () {
                t.isotope({
                    masonry: {
                        columnWidth: i
                    }
                }), t.isotope("layout")
            }, 1e3)
        }))
    })
}

function _toastr(t, e, i, a) {
    var n = jQuery(".toastr-notify");
    n.length > 0 && 0 != t && loadScript(plugin_path + "toastr/toastr.js", function () {
        n.bind("click", function (t) {
            t.preventDefault();
            var e = jQuery(this).attr("data-message"),
                i = jQuery(this).attr("data-notifyType") || "default",
                a = jQuery(this).attr("data-position") || "top-right",
                n = "true" == jQuery(this).attr("data-progressBar"),
                o = "true" == jQuery(this).attr("data-closeButton"),
                r = "true" == jQuery(this).attr("data-debug"),
                s = "true" == jQuery(this).attr("data-newestOnTop"),
                l = "true" == jQuery(this).attr("data-preventDuplicates"),
                u = jQuery(this).attr("data-showDuration") || "300",
                c = jQuery(this).attr("data-hideDuration") || "1000",
                d = jQuery(this).attr("data-timeOut") || "5000",
                h = jQuery(this).attr("data-extendedTimeOut") || "1000",
                p = jQuery(this).attr("data-showEasing") || "swing",
                f = jQuery(this).attr("data-hideEasing") || "linear",
                g = jQuery(this).attr("data-showMethod") || "fadeIn",
                m = jQuery(this).attr("data-hideMethod") || "fadeOut";
            toastr.options = {
                closeButton: o,
                debug: r,
                newestOnTop: s,
                progressBar: n,
                positionClass: "toast-" + a,
                preventDuplicates: l,
                onclick: null,
                showDuration: u,
                hideDuration: c,
                timeOut: d,
                extendedTimeOut: h,
                showEasing: p,
                hideEasing: f,
                showMethod: g,
                hideMethod: m
            }, toastr[i](e)
        }), 0 != t && (onclick = 0 != a ? function () {
            window.location = a
        } : null, toastr.options = {
            closeButton: !0,
            debug: !1,
            newestOnTop: !1,
            progressBar: !0,
            positionClass: "toast-" + e,
            preventDuplicates: !1,
            onclick: onclick,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "5000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
        }, setTimeout(function () {
            toastr[i](t)
        }, 1500))
    })
}

function _charts() {
    jQuery(".piechart").length > 0 && loadScript(plugin_path + "chart.easypiechart/dist/jquery.easypiechart.min.js", function () {
        jQuery(".piechart").each(function () {
            var t = jQuery(this),
                e = t.attr("data-size") || 150,
                i = t.attr("data-animate") || "3000";
            t.easyPieChart({
                size: e,
                animate: i,
                scaleColor: !1,
                trackColor: t.attr("data-trackcolor") || "rgba(0,0,0,0.04)",
                lineWidth: t.attr("data-width") || "2",
                lineCap: "square",
                barColor: t.attr("data-color") || "#0093BF"
            }), jQuery("*", this).attr("style", "line-height:" + e + "px !important; height:" + e + "px !important; width:" + e + "px !important")
        })
    })
}

function _select2() {
    var t = jQuery("select.select2");
    t.length > 0 && loadScript(plugin_path + "select2/js/select2.full.min.js", function () {
        t.each(function () {
            var t = jQuery(this);
            t.hasClass("select2-custom") || t.select2()
        })
    })
}

function _form() {
    jQuery("form.validate-plugin").length > 0 && loadScript(plugin_path + "form.validate/jquery.form.min.js", function () {
        loadScript(plugin_path + "form.validate/jquery.validation.min.js")
    }), jQuery("form.validate").length > 0 && loadScript(plugin_path + "form.validate/jquery.form.min.js", function () {
        loadScript(plugin_path + "form.validate/jquery.validation.min.js", function () {
            jQuery().validate && jQuery("form.validate").each(function () {
                var t = jQuery(this),
                    e = t.attr("data-success") || "Successfully! Thank you!",
                    i = (t.attr("data-captcha"), t.attr("data-toastr-position") || "top-right"),
                    a = t.attr("data-toastr-type") || "success";
                _Turl = t.attr("data-toastr-url") || !1, t.append('<input type="hidden" name="is_ajax" value="true" />'), t.validate({
                    submitHandler: function (t) {
                        jQuery(t).find(".input-group-addon").find(".fa-envelope").removeClass("fa-envelope").addClass("fa-refresh fa-spin"), jQuery(t).ajaxSubmit({
                            target: jQuery(t).find(".validate-result").length > 0 ? jQuery(t).find(".validate-result") : "",
                            error: function (t) {
                                _toastr("Sent Failed!", i, "error", !1)
                            },
                            success: function (n) {
                                "_failed_" == (n = n.trim()) ? _toastr("SMTP ERROR! Please, check your config file!", i, "error", !1): "_captcha_" == n ? _toastr("Invalid Captcha!", i, "error", !1) : (jQuery(t).find(".input-group-addon").find(".fa-refresh").removeClass("fa-refresh fa-spin").addClass("fa-envelope"), jQuery(t).find("input.form-control").val(""), _toastr(e, i, a, _Turl))
                            }
                        })
                    }
                })
            })
        })
    });
    var t = jQuery("input.masked");
    t.length > 0 && loadScript(plugin_path + "form.masked/jquery.maskedinput.js", function () {
        t.each(function () {
            var t = jQuery(this);
            _format = t.attr("data-format") || "(999) 999-999999", _placeholder = t.attr("data-placeholder") || "X", jQuery.mask.definitions.f = "[A-Fa-f0-9]", t.mask(_format, {
                placeholder: _placeholder
            })
        })
    })
}

function _pickers() {
    var t = jQuery(".datepicker");
    t.length > 0 && loadScript(plugin_path + "bootstrap.datepicker/js/bootstrap-datepicker.min.js", function () {
        jQuery().datepicker && t.each(function () {
            var t = jQuery(this),
                e = t.attr("data-lang") || "en";
            "en" != e && "" != e && loadScript(plugin_path + "bootstrap.datepicker/locales/bootstrap-datepicker." + e + ".min.js"), jQuery(this).datepicker({
                format: t.attr("data-format") || "yyyy-mm-dd",
                language: e,
                rtl: "true" == t.attr("data-RTL"),
                changeMonth: "false" != t.attr("data-changeMonth"),
                todayBtn: "false" != t.attr("data-todayBtn") && "linked",
                calendarWeeks: "false" != t.attr("data-calendarWeeks"),
                autoclose: "false" != t.attr("data-autoclose"),
                todayHighlight: "false" != t.attr("data-todayHighlight"),
                onRender: function (t) {}
            }).on("changeDate", function (t) {}).data("datepicker")
        })
    });
    var e = jQuery(".rangepicker");
    e.length > 0 && loadScript(plugin_path + "bootstrap.daterangepicker/moment.min.js", function () {
        loadScript(plugin_path + "bootstrap.daterangepicker/daterangepicker.js", function () {
            jQuery().datepicker && e.each(function () {
                var t = jQuery(this),
                    e = t.attr("data-format").toUpperCase() || "YYYY-MM-DD";
                t.daterangepicker({
                    format: e,
                    startDate: t.attr("data-from"),
                    endDate: t.attr("data-to"),
                    ranges: {
                        Today: [moment(), moment()],
                        Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
                        "Last 7 Days": [moment().subtract(6, "days"), moment()],
                        "Last 30 Days": [moment().subtract(29, "days"), moment()],
                        "This Month": [moment().startOf("month"), moment().endOf("month")],
                        "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
                    }
                }, function (t, e, i) {})
            })
        })
    });
    var i = jQuery(".timepicker");
    i.length > 0 && loadScript(plugin_path + "timepicki/timepicki.min.js", function () {
        jQuery().timepicki && i.timepicki()
    });
    var a = jQuery(".colorpicker");
    a.length > 0 && loadScript(plugin_path + "spectrum/spectrum.min.js", function () {
        jQuery().spectrum && a.each(function () {
            var t = jQuery(this),
                e = t.attr("data-format") || "hex",
                i = t.attr("data-palletteOnly") || "false",
                a = t.attr("data-fullpicker") || "false",
                n = t.attr("data-allowEmpty") || !1;
            if (_flat = t.attr("data-flat") || !1, "true" == i || "true" == a) var o = [
                ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
                ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
                ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
                ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
                ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
                ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
                ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
                ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
            ];
            else o = null;
            t.attr("data-defaultColor") ? _color = t.attr("data-defaultColor") : _color = "#ff0000", t.attr("data-defaultColor") || "true" != n || (_color = null), t.spectrum({
                showPaletteOnly: "true" == i,
                togglePaletteOnly: "true" == i,
                flat: "true" == _flat,
                showInitial: "true" == n,
                showInput: "true" == n,
                allowEmpty: "true" == n,
                chooseText: t.attr("data-chooseText") || "Coose",
                cancelText: t.attr("data-cancelText") || "Cancel",
                color: _color,
                showInput: !0,
                showPalette: !0,
                preferredFormat: e,
                showAlpha: "rgb" == e,
                palette: o
            })
        })
    })
}

function _editors() {
    var t = jQuery("textarea.summernote");
    t.length > 0 && loadScript(plugin_path + "editor.summernote/summernote.min.js", function () {
        jQuery().summernote && t.each(function () {
            var t = jQuery(this).attr("data-lang") || "en-US";
            "en-US" != t && (alert(t), loadScript(plugin_path + "editor.summernote/lang/summernote-" + t + ".js")), jQuery(this).summernote({
                height: jQuery(this).attr("data-height") || 200,
                lang: jQuery(this).attr("data-lang") || "en-US",
                toolbar: [
                    ["style", ["style"]],
                    ["fontsize", ["fontsize"]],
                    ["style", ["bold", "italic", "underline", "strikethrough", "clear"]],
                    ["color", ["color"]],
                    ["para", ["ul", "ol", "paragraph"]],
                    ["table", ["table"]],
                    ["media", ["link", "picture", "video"]],
                    ["misc", ["codeview", "fullscreen", "help"]]
                ]
            })
        })
    });
    var e = jQuery("textarea.markdown");
    e.length > 0 && loadScript(plugin_path + "editor.markdown/js/bootstrap-markdown.min.js", function () {
        jQuery().markdown && e.each(function () {
            var t = jQuery(this),
                e = t.attr("data-lang") || "en";
            "en" != e && loadScript(plugin_path + "editor.markdown/locale/bootstrap-markdown." + e + ".js"), jQuery(this).markdown({
                autofocus: "true" == t.attr("data-autofocus"),
                savable: "true" == t.attr("data-savable"),
                height: t.attr("data-height") || "inherit",
                language: "en" == e ? null : e
            })
        })
    })
}

function _pajinate() {
    var t = jQuery("div.pajinate");
    t.length > 0 && loadScript(plugin_path + "pajinate/jquery.pajinate.bootstrap.min.js", function () {
        jQuery().pajinate && t.each(function () {
            var t = jQuery(this),
                e = t.attr("data-pajinante-items-per-page") || 8;
            _numLinks = t.attr("data-pajinante-num-links") || 5, t.pajinate({
                items_per_page: parseInt(e),
                num_page_links_to_display: parseInt(_numLinks),
                item_container_id: t.attr("data-pajinate-container") || ".pajinate-container",
                nav_panel_id: ".pajinate-nav ul",
                show_first_last: !1,
                wrap_around: !0,
                abort_on_small_lists: !0,
                start_page: 0,
                nav_label_prev: "&laquo;",
                nav_label_next: "&raquo;"
            })
        })
    })
}

function _infiniteScroll() {
    var t = jQuery(".infinite-scroll");
    t.length > 0 && loadScript(plugin_path + "infinite-scroll/jquery.infinitescroll.min.js", function () {
        _navSelector = t.attr("data-nextSelector") || "#inf-load-nex", _itemSelector = t.attr("data-itemSelector") || ".item", _nextSelector = _navSelector + " a", t.infinitescroll({
            loading: {
                finishedMsg: '<i class="fa fa-check"></i>',
                msgText: '<i class="fa fa-refresh fa-spin"></i>',
                img: "data:image/gif;base64,R0lGODlhGAAYAPUAABQSFCwuLBwaHAwKDKyurGxqbNze3CwqLCQmJLS2tOzu7OTi5JyenBweHBQWFJyanPz+/HRydLSytFxeXPz6/ExOTKSmpFRSVHR2dAwODAQCBOzq7PTy9ISChPT29IyKjIyOjISGhOTm5GRiZJSWlJSSlFRWVMTCxNza3ExKTNTS1KyqrHx6fGRmZKSipMzOzMTGxDQyNDw+PAQGBDQ2NERCRFxaXMzKzGxubDw6PCQiJLy+vERGRLy6vHx+fNTW1CH/C05FVFNDQVBFMi4wAwEAAAAh+QQJBQAAACwAAAAAGAAYAEAGqECAcAhoRAiojQJFiAiI0Kh0qOsZOhqhDMK9ZadgAI0WBmhAXAhFVm5HbZR0aTYdsFpSkwqjo5sRLAtpIjxuUzZpECmGjI1QA4JcKH5lGVICDHFpGyoqGx4uDWENFh4iKjcbiR4MT1ItLJSPJWkUNo9uAyhpBpaOGjdpOY7ExcYaIQs9OsUpibfENZoQIF9gY1EpqlwiLAh+M4AqJmUCOBJJGz8EOKJRQQAh+QQJBQABACwAAAAAGAAYAAAGp8CAcBhoRBILDgdFKAiI0KHAB5rUZBUWDALxMJ5R4SCmiWpoJ67iEm4TZx0upOCuB1jyir2tuXE3DnthE3IlglENchwDh0QDG3ITjUQ7ciGTQxFybJgBGkcYGhoYPaGdARdyOKchcjunhH8znQAccmCYJZGnDpAQN2WdFXI+pwEFch2znRe+MDTBbzGMbQIPHlwwLBcyNSMgLIF2Ai0WKAocBhI4uERBACH5BAkFACwALAAAAAAYABgAAAaoQJZwyNIEJiAJCpWICIjQKFGD6Gw8D4d0C3UQIJsKd1wsQSgFMldjgUAu6q1jA27EpRg34x5FUCAeT3xDAx5uBQAMJyZ8GRxuFiRuFAF3B24QKguYE3cpmAubbil3I5gGKpgIdwF/EA9tgAN8JicMGQVuHLODQgKGEKu9QgxuGMNCDQpgAMgsF38rGs4Ffx/TyBUiECtayAIPHgohAdi9DRFKTCAj5VJBACH5BAkFAAAALAAAAAAYABgAAAa0QIBwSAQMaphHoVFsOoezlsEleFqJDsnmcu1qLJBW9zpQUSpjqwyycQgPBAIiLYRBGIDMAgJRaegREB4CE3wQFAN0NHwRYHwwdAANfBIqhlx0AXwGCnx+kQV8Cp0QBZEaL3wbBnwBkReGKgl8TGkadnwugRA0dBkUhhMNHhARdBqWEAsZAAwQkHQIEgQHQgIbFDKRTRUUL4nbRC0QFjPhRBcbEm7nQg0uBi3g7Q0RDxEyzFdBACH5BAkFAAgALAAAAAAYABgAAAaxQIRwSCwKHMWkssgLCZbQYmNnUgpMh6gQoIoUZQqIh6ZFHDjV7QLCLpURIcUTAWKzvWUBhYFwcOwnA28IOx4CBXY3AIMIJRAFEmwoSIwYEAQGbDWMQiwQBh4QKpxCjhyhbqQqEByZLKQ1bAaRr4wOKGwSiKlvADd2BQIeJ4MDJ3YcSA8UlFqWdiBCAgohbyR2C4tCJhwBZTQUEAo5RQUqzVAHJuhDJjsNpFIhKfFG7FFBACH5BAkFAAAALAAAAQAYABYAAAa3QIBQmEnlNMOkcgmoGSCQEJNIY048UIhhKqS1lClKFtLjClmmoWAzvunMgJmqIWRkDTYkHIBxARpiECUDe0MIHg0RUCV6hQAaGxESEAszjkkvEk8sl0kqKgoQCJ1CGiIKChuNlwcQCigvpGcQKBKxpAMLEBI4IpaXGiVQODoeb44DwhAUAgAuGIUaEyhZDEINKr9cCDdjG81CJpxmO2MUPEojVVy6UBQ2TDGEUyFQCzKyjzk880NBACH5BAkFAAEALAAAAAAYABgAAAazwIBwGABMOhcNcckUOkoKiJTVrAYqG6k2YWXiKFptpEs0gbWbXmFmHQwbWcjNJlCSYwIhQ9qxk4UaVAIeEB1/TCANBRAnfodCExEEEDSPSzUJKCeWSzQGHBicRBUcHimiQywKC5WoGjAoCTKoATQUBBETqDMnEAUNH6ghEBQOAT6OZBo+UgxCAjF/Mw0TN1IKeUJuVTMFPSJhEBePGOHEBZYJ4SI8nCxaHB/GnBoXISYATUEAIfkECQUAKgAsAAAAABgAGAAABqpAlXCoErQsr4WBlCE6nQ2XB0Ktup5Yk6LKhZywzgKlyplSKRfwsELdYA6DDCI1OaiFgg2EALirHxAfGn5gDR4rg4RPGhEbDopYAQkdkFgjBnaVTiEoiZpDCQmfRBooIKNDBwYjqEIdCQGtDgoFnpoaEh4NqBogEA+oDisQjn4xExUIAAMILCIQFBV+JmNUHh7VEAWEMF1VCmmELt4UDAKQGSUoCy8WI+dPQQAh+QQJBQAJACwAAAAAGAAYAAAGrMCEcJhoRCQoxUblmmSI0KGA4YFYr9bFIUqsbLBgK4ErLFAosEiuESi8sBKyifKqRTWXk+el4zYULgNkQhkaZBYShoOLOigAi5ARE5CQDzOUixGYi3abXANPnlE5olyapUQzD6hELaesDgYNrAkzEi5kMwOKnxYbs1EIKh4wF5dQNSoQF2QSWC8FATo0GDcUHi2DBGFgGymLBwvcEBQPDpQZNi4qGxsoEjgCXEEAIfkEBQUACAAsAAAAABgAGAAABqZAhHCIEBQIBg/HICk4iNCh4OGBWK9WTgkQHZoUlFMJwyKpsJCFrBvhhJ7QGgqrgA9tr0BX6HhhTUQNO3Z7ADBWFAdEIQJ7UAMRJTREAjyOl0MNmJucnZ6foKGio6SdmqQphDljA5wCIUQBVRAwXJcAO6dCJlg3tl0BPxdQAgpYKDVRAh8cOF05C2g/JSw+JTAeCsOFJRxoVx4PjZgORygcHCgETl1BADs=",
                speed: "normal"
            },
            nextSelector: _nextSelector,
            navSelector: _navSelector,
            itemSelector: _itemSelector,
            behavior: "",
            state: {
                isDone: !1
            }
        }, function (e) {
            Init(!0), jQuery().isotope && (t.isotope("appended", jQuery(e)), setTimeout(function () {
                t.isotope("layout")
            }, 2e3))
        })
    })
}

function _zoom() {
    var t = jQuery("figure.zoom");
    t.length > 0 && loadScript(plugin_path + "image.zoom/jquery.zoom.min.js", function () {
        jQuery().zoom && t.each(function () {
            var t = jQuery(this),
                e = t.attr("data-mode"),
                i = t.attr("id");
            "grab" == e ? t.zoom({
                on: "grab"
            }) : "click" == e ? t.zoom({
                on: "click"
            }) : "toggle" == e ? t.zoom({
                on: "toggle"
            }) : t.zoom(), isMobile.any() && t.zoom({
                on: "toggle"
            }), i && jQuery(".zoom-more[data-for=" + i + "] a").bind("click", function (t) {
                t.preventDefault();
                var e = jQuery(this).attr("href");
                "#" != e && (jQuery(".zoom-more[data-for=" + i + "] a").removeClass("active"), jQuery(this).addClass("active"), jQuery("figure#" + i + ">.lightbox").attr("href", e), jQuery("figure#" + i + ">img").fadeOut(0, function () {
                    jQuery("figure#" + i + ">img").attr("src", e)
                }).fadeIn(500))
            })
        })
    })
}

function _autosuggest() {
    _container = jQuery("div.autosuggest"), _container.length > 0 && loadScript(plugin_path + "typeahead.bundle.js", function () {
        jQuery().typeahead && _container.each(function () {
            var t = jQuery(this),
                e = t.attr("data-minLength") || 1,
                i = t.attr("data-queryURL"),
                a = t.attr("data-limit") || 10;
            if ("false" == t.attr("data-autoload")) return !1;
            var n = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                limit: a,
                remote: {
                    url: i + "%QUERY"
                }
            });
            jQuery(".typeahead", t).typeahead({
                limit: a,
                hint: "false" != t.attr("data-hint"),
                highlight: "false" != t.attr("data-highlight"),
                minLength: parseInt(e),
                cache: !1
            }, {
                name: "_typeahead",
                source: n
            })
        })
    })
}

function _stepper() {
    var t = jQuery("input.stepper");
    t.length > 0 && loadScript(plugin_path + "form.stepper/jquery.stepper.min.js", function () {
        jQuery().stepper && jQuery(t).each(function () {
            var t = jQuery(this),
                e = t.attr("min") || null,
                i = t.attr("max") || null;
            t.stepper({
                limit: [e, i],
                floatPrecission: t.attr("data-floatPrecission") || 2,
                wheel_step: t.attr("data-wheelstep") || .1,
                arrow_step: t.attr("data-arrowstep") || .2,
                allowWheel: "false" != t.attr("data-mousescrool"),
                UI: "false" != t.attr("data-UI"),
                type: t.attr("data-type") || "float",
                preventWheelAcceleration: "false" != t.attr("data-preventWheelAcceleration"),
                incrementButton: t.attr("data-incrementButton") || "&blacktriangle;",
                decrementButton: t.attr("data-decrementButton") || "&blacktriangledown;",
                onStep: null,
                onWheel: null,
                onArrow: null,
                onButton: null,
                onKeyUp: null
            })
        })
    })
}

function _slimScroll() {
    jQuery(".slimscroll").length > 0 && loadScript(plugin_path + "slimscroll/jquery.slimscroll.min.js", function () {
        jQuery().slimScroll && jQuery(".slimscroll").each(function () {
            var t;
            t = jQuery(this).attr("data-height") ? jQuery(this).attr("data-height") : jQuery(this).height(), jQuery(this).slimScroll({
                size: jQuery(this).attr("data-size") || "5px",
                opacity: jQuery(this).attr("data-opacity") || .6,
                position: jQuery(this).attr("data-position") || "right",
                allowPageScroll: !1,
                disableFadeOut: !1,
                railVisible: !0,
                railColor: jQuery(this).attr("data-railColor") || "#222",
                railOpacity: jQuery(this).attr("data-railOpacity") || .05,
                alwaysVisible: "false" != jQuery(this).attr("data-alwaysVisible"),
                railVisible: "false" != jQuery(this).attr("data-railVisible"),
                color: jQuery(this).attr("data-color") || "#333",
                wrapperClass: jQuery(this).attr("data-wrapper-class") || "slimScrollDiv",
                railColor: jQuery(this).attr("data-railColor") || "#eaeaea",
                height: t
            }), "true" == jQuery(this).attr("disable-body-scroll") && jQuery(this).bind("mousewheel DOMMouseScroll", function (t) {
                var e = null;
                "mousewheel" == t.type ? e = -1 * t.originalEvent.wheelDelta : "DOMMouseScroll" == t.type && (e = 40 * t.originalEvent.detail), e && (t.preventDefault(), jQuery(this).scrollTop(e + jQuery(this).scrollTop()))
            })
        })
    })
}

function _modalAutoLoad() {
    jQuery("div.modal").length > 0 && jQuery("div.modal").each(function () {
        var t = jQuery(this),
            e = t.attr("id"),
            i = t.attr("data-autoload") || !1;
        "" != e && "hidden" == localStorage.getItem(e) && (i = "false"), "true" == i && jQuery(window).on("load", function () {
            var e = t.attr("data-autoload-delay") || 1e3;
            setTimeout(function () {
                t.modal("toggle")
            }, parseInt(e))
        }), jQuery("input.loadModalHide", this).bind("click", function () {
            jQuery(this).is(":checked") ? (localStorage.setItem(e, "hidden"), console.log("[Modal Autoload #" + e + "] Added to localStorage")) : (localStorage.removeItem(e), console.log("[Modal Autoload #" + e + "] Removed from localStorage"))
        })
    })
}

function _bgimage() {
    var t = jQuery("section[data-background], section div[data-background]");
    t.length > 0 && loadScript(plugin_path + "jquery.backstretch.min.js", function () {
        jQuery(t).each(function () {
            var t = jQuery(this),
                e = t.attr("data-background") || "";
            if ("" != e) {
                var i = t.attr("data-background-delay") || 3e3,
                    a = t.attr("data-background-fade") || 750,
                    n = e.split(",");
                (n = e.replace(" ", "").split(","))[1] ? t.backstretch(n, {
                    duration: parseInt(i),
                    fade: parseInt(a)
                }): t.backstretch(n), jQuery(".bs-next", t).bind("click", function (e) {
                    e.preventDefault(), t.data("backstretch").next()
                }), jQuery(".bs-prev", t).bind("click", function (e) {
                    e.preventDefault(), t.data("backstretch").prev()
                }), jQuery(window).resize(function () {
                    window.afterResizeBkstr && clearTimeout(window.afterResizeBkstr), window.afterResizeBkstr = setTimeout(function () {
                        t.data("backstretch").next()
                    }, 350)
                })
            }
        })
    });
    var e = jQuery("body").attr("data-background") || "";
    "" != e && loadScript(plugin_path + "jquery.backstretch.min.js", function () {
        e && (jQuery.backstretch(e), jQuery("body").addClass("transparent"))
    })
}

function _cookie_alert() {
    var t = jQuery("#cookie-alert"),
        e = _getCookie("cookie-alert");
    if (t.length > 0 && null == e) {
        var i = t.attr("data-expire") || 30;
        t.hasClass("alert-position-bottom") ? t.animate({
            bottom: "0px"
        }, 800, "easeInOutExpo") : t.animate({
            top: "0px"
        }, 800, "easeInOutExpo"), jQuery("button", t).bind("click", function () {
            _setCookie("cookie-alert", "closed", Number(i))
        })
    }
    t.length > 0 && t.hasClass("cookie-reset") && _delCookie("cookie-alert")
}

function _widget_flickr() {
    var t = jQuery(".widget-flickr");
    t.length > 0 && loadScript(plugin_path + "widget.jflickr/jflickrfeed.min.js", function () {
        jQuery().jflickrfeed && jQuery(".widget-flickr") && t.each(function () {
            var t = jQuery(this),
                e = t.attr("data-id"),
                i = t.attr("data-limit") || 14;
            t.jflickrfeed({
                limit: parseInt(i),
                qstrings: {
                    id: e
                },
                itemTemplate: '<li><a href="{{image}}" title="{{title}}"><img src="{{image_s}}" alt="{{title}}" width="63" height="63" /></a></li>'
            }, function (t) {
                _lightbox()
            })
        })
    })
}

function _widget_twitter() {
    var t = jQuery(".widget-twitter");
    t.length > 0 && loadScript(plugin_path + "widget.twittie/twittie.min.js", function () {
        jQuery().twittie && t.each(function () {
            var t = jQuery(this),
                e = t.attr("data-php") + "?username=" + t.attr("data-username") + "&limit=" + (t.attr("data-limit") || 3);
            jQuery.getJSON(e, function (e) {
                t.html(format_twitter(e))
            })
        })
    })
}

function format_twitter(t) {
    for (var e = [], i = 0; i < t.length; i++) {
        var a = t[i].user.screen_name,
            n = t[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function (t) {
                return '<a href="' + t + '" target="_blank">' + t + "</a>"
            }).replace(/\B@([_a-z0-9]+)/gi, function (t) {
                return t.charAt(0) + '<a href="http://twitter.com/' + t.substring(1) + '" target="_blank">' + t.substring(1) + "</a>"
            });
        e.push('<li><i class="fa fa-twitter"></i><span>' + n + '</span><small><a href="http://twitter.com/' + a + "/statuses/" + t[i].id_str + '" target="_blank">' + relative_time(t[i].created_at) + "</a></small></li>")
    }
    return e.join("")
}

function relative_time(t) {
    var e = t.split(" "),
        i = Date.parse(t),
        a = arguments.length > 1 ? arguments[1] : new Date,
        n = parseInt((a.getTime() - i) / 1e3);
    return t = e[1] + " " + e[2] + ", " + e[5] + " " + e[3], n += 60 * a.getTimezoneOffset(), n < 60 ? "less than a minute ago" : n < 120 ? "about a minute ago" : n < 3600 ? parseInt(n / 60).toString() + " minutes ago" : n < 7200 ? "about an hour ago" : n < 86400 ? "about " + parseInt(n / 3600).toString() + " hours ago" : n < 172800 ? "1 day ago" : parseInt(n / 86400).toString() + " days ago"
}

function _widget_facebook() {
    var t = jQuery("div.fb-like"),
        e = jQuery("div.fb-share-button");
    (t.length > 0 || e.length > 0) && (jQuery("body").append('<div id="fb-root"></div>'), function (t, e, i) {
        var a, n = t.getElementsByTagName(e)[0];
        t.getElementById(i) || ((a = t.createElement(e)).id = i, a.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3", n.parentNode.insertBefore(a, n))
    }(document, "script", "facebook-jssdk"))
}

function _widget_dribbble() {
    var t = jQuery(".widget-dribbble");
    t.length > 0 && loadScript(plugin_path + "widget.dribbble/jribbble.min.js", function () {
        var e = t.attr("data-token") || "f688ac519289f19ce5cebc1383c15ad5c02bd58205cd83c86cbb0ce09170c1b4",
            i = t.attr("data-target") || "_blank",
            a = t.attr("data-shots") || 2046896;
        jQuery.jribbble.setToken(e), jQuery.jribbble.shots(a).rebounds().then(function (e) {
            var a = [];
            e.forEach(function (t) {
                a.push("<li>"), a.push('<a href="' + t.html_url + '" target="' + i + '">'), a.push('<img class="img-fluid" src="' + t.images.normal + '" alt="image">'), a.push("</a></li>")
            }), t.html(a.join(""))
        })
    })
}

function _widget_media() {
    jQuery(".widget-media").length > 0 && loadScript(plugin_path + "widget.mediaelementbuild/mediaelement-and-player.min.js", function () {})
}

function wheel(t) {
    t.preventDefault()
}

function disable_scroll() {
    window.addEventListener && window.addEventListener("DOMMouseScroll", wheel, !1), window.onmousewheel = document.onmousewheel = wheel
}

function enable_scroll() {
    window.removeEventListener && window.removeEventListener("DOMMouseScroll", wheel, !1), window.onmousewheel = document.onmousewheel = document.onkeydown = null
}

function enable_overlay() {
    jQuery("span.global-overlay").remove(), jQuery("body").append('<span class="global-overlay"></span>')
}

function disable_overlay() {
    jQuery("span.global-overlay").remove()
}

function _setCookie(t, e, i) {
    var a = "";
    if (i) {
        var n = new Date;
        n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3), a = "; expires=" + n.toUTCString()
    }
    document.cookie = t + "=" + e + a + "; path=/"
}

function _getCookie(t) {
    for (var e = t + "=", i = document.cookie.split(";"), a = 0; a < i.length; a++) {
        for (var n = i[a];
            " " == n.charAt(0);) n = n.substring(1, n.length);
        if (0 == n.indexOf(e)) return n.substring(e.length, n.length)
    }
    return null
}

function _delCookie(t) {
    _setCookie(t, "", -1)
}

function _loadTetherBS4() {
    ! function (t, e) {
        "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e(require, exports, module) : t.Tether = e()
    }(this, function (t, e, i) {
        "use strict";

        function a(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function n(t) {
            var e = t.getBoundingClientRect(),
                i = {};
            for (var a in e) i[a] = e[a];
            if (t.ownerDocument !== document) {
                var o = t.ownerDocument.defaultView.frameElement;
                if (o) {
                    var r = n(o);
                    i.top += r.top, i.bottom += r.top, i.left += r.left, i.right += r.left
                }
            }
            return i
        }

        function o(t) {
            var e = (getComputedStyle(t) || {}).position,
                i = [];
            if ("fixed" === e) return [t];
            for (var a = t;
                (a = a.parentNode) && a && 1 === a.nodeType;) {
                var n = void 0;
                try {
                    n = getComputedStyle(a)
                } catch (t) {}
                if (void 0 === n || null === n) return i.push(a), i;
                var o = n,
                    r = o.overflow,
                    s = o.overflowX,
                    l = o.overflowY;
                /(auto|scroll)/.test(r + l + s) && ("absolute" !== e || ["relative", "absolute", "fixed"].indexOf(n.position) >= 0) && i.push(a)
            }
            return i.push(t.ownerDocument.body), t.ownerDocument !== document && i.push(t.ownerDocument.defaultView), i
        }

        function r() {
            A && document.body.removeChild(A), A = null
        }

        function s(t) {
            var e = void 0;
            t === document ? (e = document, t = document.documentElement) : e = t.ownerDocument;
            var i = e.documentElement,
                a = n(t),
                o = S();
            return a.top -= o.top, a.left -= o.left, void 0 === a.width && (a.width = document.body.scrollWidth - a.left - a.right), void 0 === a.height && (a.height = document.body.scrollHeight - a.top - a.bottom), a.top = a.top - i.clientTop, a.left = a.left - i.clientLeft, a.right = e.body.clientWidth - a.width - a.left, a.bottom = e.body.clientHeight - a.height - a.top, a
        }

        function l(t) {
            return t.offsetParent || document.documentElement
        }

        function u() {
            var t = document.createElement("div");
            t.style.width = "100%", t.style.height = "200px";
            var e = document.createElement("div");
            c(e.style, {
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
                visibility: "hidden",
                width: "200px",
                height: "150px",
                overflow: "hidden"
            }), e.appendChild(t), document.body.appendChild(e);
            var i = t.offsetWidth;
            e.style.overflow = "scroll";
            var a = t.offsetWidth;
            i === a && (a = e.clientWidth), document.body.removeChild(e);
            var n = i - a;
            return {
                width: n,
                height: n
            }
        }

        function c() {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                e = [];
            return Array.prototype.push.apply(e, arguments), e.slice(1).forEach(function (e) {
                if (e)
                    for (var i in e)({}).hasOwnProperty.call(e, i) && (t[i] = e[i])
            }), t
        }

        function d(t, e) {
            if (void 0 !== t.classList) e.split(" ").forEach(function (e) {
                e.trim() && t.classList.remove(e)
            });
            else {
                var i = new RegExp("(^| )" + e.split(" ").join("|") + "( |$)", "gi"),
                    a = f(t).replace(i, " ");
                g(t, a)
            }
        }

        function h(t, e) {
            if (void 0 !== t.classList) e.split(" ").forEach(function (e) {
                e.trim() && t.classList.add(e)
            });
            else {
                d(t, e);
                var i = f(t) + " " + e;
                g(t, i)
            }
        }

        function p(t, e) {
            if (void 0 !== t.classList) return t.classList.contains(e);
            var i = f(t);
            return new RegExp("(^| )" + e + "( |$)", "gi").test(i)
        }

        function f(t) {
            return t.className instanceof t.ownerDocument.defaultView.SVGAnimatedString ? t.className.baseVal : t.className
        }

        function g(t, e) {
            t.setAttribute("class", e)
        }

        function m(t, e, i) {
            i.forEach(function (i) {
                -1 === e.indexOf(i) && p(t, i) && d(t, i)
            }), e.forEach(function (e) {
                p(t, e) || h(t, e)
            })
        }

        function a(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function y(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }

        function v(t, e) {
            var i = arguments.length <= 2 || void 0 === arguments[2] ? 1 : arguments[2];
            return t + i >= e && e >= t - i
        }

        function j() {
            return "undefined" != typeof performance && void 0 !== performance.now ? performance.now() : +new Date
        }

        function w() {
            for (var t = {
                    top: 0,
                    left: 0
                }, e = arguments.length, i = Array(e), a = 0; e > a; a++) i[a] = arguments[a];
            return i.forEach(function (e) {
                var i = e.top,
                    a = e.left;
                "string" == typeof i && (i = parseFloat(i, 10)), "string" == typeof a && (a = parseFloat(a, 10)), t.top += i, t.left += a
            }), t
        }

        function Q(t, e) {
            return "string" == typeof t.left && -1 !== t.left.indexOf("%") && (t.left = parseFloat(t.left, 10) / 100 * e.width), "string" == typeof t.top && -1 !== t.top.indexOf("%") && (t.top = parseFloat(t.top, 10) / 100 * e.height), t
        }

        function b(t, e) {
            return "scrollParent" === e ? e = t.scrollParents[0] : "window" === e && (e = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset]), e === document && (e = e.documentElement), void 0 !== e.nodeType && function () {
                var t = e,
                    i = s(e),
                    a = i,
                    n = getComputedStyle(e);
                if (e = [a.left, a.top, i.width + a.left, i.height + a.top], t.ownerDocument !== document) {
                    var o = t.ownerDocument.defaultView;
                    e[0] += o.pageXOffset, e[1] += o.pageYOffset, e[2] += o.pageXOffset, e[3] += o.pageYOffset
                }
                J.forEach(function (t, i) {
                    "Top" === (t = t[0].toUpperCase() + t.substr(1)) || "Left" === t ? e[i] += parseFloat(n["border" + t + "Width"]) : e[i] -= parseFloat(n["border" + t + "Width"])
                })
            }(), e
        }
        var _ = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var a = e[i];
                        a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t, a.key, a)
                    }
                }
                return function (e, i, a) {
                    return i && t(e.prototype, i), a && t(e, a), e
                }
            }(),
            C = void 0;
        void 0 === C && (C = {
            modules: []
        });
        var A = null,
            x = function () {
                var t = 0;
                return function () {
                    return ++t
                }
            }(),
            k = {},
            S = function () {
                var t = A;
                t || ((t = document.createElement("div")).setAttribute("data-tether-id", x()), c(t.style, {
                    top: 0,
                    left: 0,
                    position: "absolute"
                }), document.body.appendChild(t), A = t);
                var e = t.getAttribute("data-tether-id");
                return void 0 === k[e] && (k[e] = n(t), O(function () {
                    delete k[e]
                })), k[e]
            },
            E = [],
            O = function (t) {
                E.push(t)
            },
            T = function () {
                for (var t = void 0; t = E.pop();) t()
            },
            I = function () {
                function t() {
                    a(this, t)
                }
                return _(t, [{
                    key: "on",
                    value: function (t, e, i) {
                        var a = !(arguments.length <= 3 || void 0 === arguments[3]) && arguments[3];
                        void 0 === this.bindings && (this.bindings = {}), void 0 === this.bindings[t] && (this.bindings[t] = []), this.bindings[t].push({
                            handler: e,
                            ctx: i,
                            once: a
                        })
                    }
                }, {
                    key: "once",
                    value: function (t, e, i) {
                        this.on(t, e, i, !0)
                    }
                }, {
                    key: "off",
                    value: function (t, e) {
                        if (void 0 !== this.bindings && void 0 !== this.bindings[t])
                            if (void 0 === e) delete this.bindings[t];
                            else
                                for (var i = 0; i < this.bindings[t].length;) this.bindings[t][i].handler === e ? this.bindings[t].splice(i, 1) : ++i
                    }
                }, {
                    key: "trigger",
                    value: function (t) {
                        if (void 0 !== this.bindings && this.bindings[t]) {
                            for (var e = 0, i = arguments.length, a = Array(i > 1 ? i - 1 : 0), n = 1; i > n; n++) a[n - 1] = arguments[n];
                            for (; e < this.bindings[t].length;) {
                                var o = this.bindings[t][e],
                                    r = o.handler,
                                    s = o.ctx,
                                    l = o.once,
                                    u = s;
                                void 0 === u && (u = this), r.apply(u, a), l ? this.bindings[t].splice(e, 1) : ++e
                            }
                        }
                    }
                }]), t
            }();
        C.Utils = {
            getActualBoundingClientRect: n,
            getScrollParents: o,
            getBounds: s,
            getOffsetParent: l,
            extend: c,
            addClass: h,
            removeClass: d,
            hasClass: p,
            updateClasses: m,
            defer: O,
            flush: T,
            uniqueId: x,
            Evented: I,
            getScrollBarSize: u,
            removeUtilElements: r
        };
        var B = function () {
                function t(t, e) {
                    var i = [],
                        a = !0,
                        n = !1,
                        o = void 0;
                    try {
                        for (var r, s = t[Symbol.iterator](); !(a = (r = s.next()).done) && (i.push(r.value), !e || i.length !== e); a = !0);
                    } catch (t) {
                        n = !0, o = t
                    } finally {
                        try {
                            !a && s.return && s.return()
                        } finally {
                            if (n) throw o
                        }
                    }
                    return i
                }
                return function (e, i) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return t(e, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            _ = function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var a = e[i];
                        a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t, a.key, a)
                    }
                }
                return function (e, i, a) {
                    return i && t(e.prototype, i), a && t(e, a), e
                }
            }(),
            M = function (t, e, i) {
                for (var a = !0; a;) {
                    var n = t,
                        o = e,
                        r = i;
                    a = !1, null === n && (n = Function.prototype);
                    var s = Object.getOwnPropertyDescriptor(n, o);
                    if (void 0 !== s) {
                        if ("value" in s) return s.value;
                        var l = s.get;
                        if (void 0 === l) return;
                        return l.call(r)
                    }
                    var u = Object.getPrototypeOf(n);
                    if (null === u) return;
                    t = u, e = o, i = r, a = !0, s = u = void 0
                }
            };
        if (void 0 === C) throw new Error("You must include the utils.js file before tether.js");
        var D = C.Utils,
            o = D.getScrollParents,
            s = D.getBounds,
            l = D.getOffsetParent,
            c = D.extend,
            h = D.addClass,
            d = D.removeClass,
            m = D.updateClasses,
            O = D.defer,
            T = D.flush,
            u = D.getScrollBarSize,
            r = D.removeUtilElements,
            H = function () {
                if ("undefined" == typeof document) return "";
                for (var t = document.createElement("div"), e = ["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"], i = 0; i < e.length; ++i) {
                    var a = e[i];
                    if (void 0 !== t.style[a]) return a
                }
            }(),
            z = [],
            P = function () {
                z.forEach(function (t) {
                    t.position(!1)
                }), T()
            };
        ! function () {
            var t = null,
                e = null,
                i = null,
                a = function a() {
                    return void 0 !== e && e > 16 ? (e = Math.min(e - 16, 250), void(i = setTimeout(a, 250))) : void(void 0 !== t && j() - t < 10 || (null != i && (clearTimeout(i), i = null), t = j(), P(), e = j() - t))
                };
            "undefined" != typeof window && void 0 !== window.addEventListener && ["resize", "scroll", "touchmove"].forEach(function (t) {
                window.addEventListener(t, a)
            })
        }();
        var N = {
                center: "center",
                left: "right",
                right: "left"
            },
            F = {
                middle: "middle",
                top: "bottom",
                bottom: "top"
            },
            q = {
                top: 0,
                left: 0,
                middle: "50%",
                center: "50%",
                bottom: "100%",
                right: "100%"
            },
            R = function (t, e) {
                var i = t.left,
                    a = t.top;
                return "auto" === i && (i = N[e.left]), "auto" === a && (a = F[e.top]), {
                    left: i,
                    top: a
                }
            },
            L = function (t) {
                var e = t.left,
                    i = t.top;
                return void 0 !== q[t.left] && (e = q[t.left]), void 0 !== q[t.top] && (i = q[t.top]), {
                    left: e,
                    top: i
                }
            },
            U = function (t) {
                var e = t.split(" "),
                    i = B(e, 2);
                return {
                    top: i[0],
                    left: i[1]
                }
            },
            W = U,
            G = function (t) {
                function e(t) {
                    var i = this;
                    a(this, e), M(Object.getPrototypeOf(e.prototype), "constructor", this).call(this), this.position = this.position.bind(this), z.push(this), this.history = [], this.setOptions(t, !1), C.modules.forEach(function (t) {
                        void 0 !== t.initialize && t.initialize.call(i)
                    }), this.position()
                }
                return y(e, t), _(e, [{
                    key: "getClass",
                    value: function () {
                        var t = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0],
                            e = this.options.classes;
                        return void 0 !== e && e[t] ? this.options.classes[t] : this.options.classPrefix ? this.options.classPrefix + "-" + t : t
                    }
                }, {
                    key: "setOptions",
                    value: function (t) {
                        var e = this,
                            i = arguments.length <= 1 || void 0 === arguments[1] || arguments[1],
                            a = {
                                offset: "0 0",
                                targetOffset: "0 0",
                                targetAttachment: "auto auto",
                                classPrefix: "tether"
                            };
                        this.options = c(a, t);
                        var n = this.options,
                            r = n.element,
                            s = n.target,
                            l = n.targetModifier;
                        if (this.element = r, this.target = s, this.targetModifier = l, "viewport" === this.target ? (this.target = document.body, this.targetModifier = "visible") : "scroll-handle" === this.target && (this.target = document.body, this.targetModifier = "scroll-handle"), ["element", "target"].forEach(function (t) {
                                if (void 0 === e[t]) throw new Error("Tether Error: Both element and target must be defined");
                                void 0 !== e[t].jquery ? e[t] = e[t][0] : "string" == typeof e[t] && (e[t] = document.querySelector(e[t]))
                            }), h(this.element, this.getClass("element")), !1 !== this.options.addTargetClasses && h(this.target, this.getClass("target")), !this.options.attachment) throw new Error("Tether Error: You must provide an attachment");
                        this.targetAttachment = W(this.options.targetAttachment), this.attachment = W(this.options.attachment), this.offset = U(this.options.offset), this.targetOffset = U(this.options.targetOffset), void 0 !== this.scrollParents && this.disable(), "scroll-handle" === this.targetModifier ? this.scrollParents = [this.target] : this.scrollParents = o(this.target), !1 !== this.options.enabled && this.enable(i)
                    }
                }, {
                    key: "getTargetBounds",
                    value: function () {
                        if (void 0 === this.targetModifier) return s(this.target);
                        if ("visible" === this.targetModifier) return this.target === document.body ? {
                            top: pageYOffset,
                            left: pageXOffset,
                            height: innerHeight,
                            width: innerWidth
                        } : ((o = {
                            height: (t = s(this.target)).height,
                            width: t.width,
                            top: t.top,
                            left: t.left
                        }).height = Math.min(o.height, t.height - (pageYOffset - t.top)), o.height = Math.min(o.height, t.height - (t.top + t.height - (pageYOffset + innerHeight))), o.height = Math.min(innerHeight, o.height), o.height -= 2, o.width = Math.min(o.width, t.width - (pageXOffset - t.left)), o.width = Math.min(o.width, t.width - (t.left + t.width - (pageXOffset + innerWidth))), o.width = Math.min(innerWidth, o.width), o.width -= 2, o.top < pageYOffset && (o.top = pageYOffset), o.left < pageXOffset && (o.left = pageXOffset), o);
                        if ("scroll-handle" === this.targetModifier) {
                            var t = void 0,
                                e = this.target;
                            e === document.body ? (e = document.documentElement, t = {
                                left: pageXOffset,
                                top: pageYOffset,
                                height: innerHeight,
                                width: innerWidth
                            }) : t = s(e);
                            var i = getComputedStyle(e),
                                a = 0;
                            (e.scrollWidth > e.clientWidth || [i.overflow, i.overflowX].indexOf("scroll") >= 0 || this.target !== document.body) && (a = 15);
                            var n = t.height - parseFloat(i.borderTopWidth) - parseFloat(i.borderBottomWidth) - a,
                                o = {
                                    width: 15,
                                    height: .975 * n * (n / e.scrollHeight),
                                    left: t.left + t.width - parseFloat(i.borderLeftWidth) - 15
                                },
                                r = 0;
                            408 > n && this.target === document.body && (r = -11e-5 * Math.pow(n, 2) - .00727 * n + 22.58), this.target !== document.body && (o.height = Math.max(o.height, 24));
                            var l = this.target.scrollTop / (e.scrollHeight - n);
                            return o.top = l * (n - o.height - r) + t.top + parseFloat(i.borderTopWidth), this.target === document.body && (o.height = Math.max(o.height, 24)), o
                        }
                    }
                }, {
                    key: "clearCache",
                    value: function () {
                        this._cache = {}
                    }
                }, {
                    key: "cache",
                    value: function (t, e) {
                        return void 0 === this._cache && (this._cache = {}), void 0 === this._cache[t] && (this._cache[t] = e.call(this)), this._cache[t]
                    }
                }, {
                    key: "enable",
                    value: function () {
                        var t = this,
                            e = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
                        !1 !== this.options.addTargetClasses && h(this.target, this.getClass("enabled")), h(this.element, this.getClass("enabled")), this.enabled = !0, this.scrollParents.forEach(function (e) {
                            e !== t.target.ownerDocument && e.addEventListener("scroll", t.position)
                        }), e && this.position()
                    }
                }, {
                    key: "disable",
                    value: function () {
                        var t = this;
                        d(this.target, this.getClass("enabled")), d(this.element, this.getClass("enabled")), this.enabled = !1, void 0 !== this.scrollParents && this.scrollParents.forEach(function (e) {
                            e.removeEventListener("scroll", t.position)
                        })
                    }
                }, {
                    key: "destroy",
                    value: function () {
                        var t = this;
                        this.disable(), z.forEach(function (e, i) {
                            e === t && z.splice(i, 1)
                        }), 0 === z.length && r()
                    }
                }, {
                    key: "updateAttachClasses",
                    value: function (t, e) {
                        var i = this;
                        t = t || this.attachment, e = e || this.targetAttachment;
                        var a = ["left", "top", "bottom", "right", "middle", "center"];
                        void 0 !== this._addAttachClasses && this._addAttachClasses.length && this._addAttachClasses.splice(0, this._addAttachClasses.length), void 0 === this._addAttachClasses && (this._addAttachClasses = []);
                        var n = this._addAttachClasses;
                        t.top && n.push(this.getClass("element-attached") + "-" + t.top), t.left && n.push(this.getClass("element-attached") + "-" + t.left), e.top && n.push(this.getClass("target-attached") + "-" + e.top), e.left && n.push(this.getClass("target-attached") + "-" + e.left);
                        var o = [];
                        a.forEach(function (t) {
                            o.push(i.getClass("element-attached") + "-" + t), o.push(i.getClass("target-attached") + "-" + t)
                        }), O(function () {
                            void 0 !== i._addAttachClasses && (m(i.element, i._addAttachClasses, o), !1 !== i.options.addTargetClasses && m(i.target, i._addAttachClasses, o), delete i._addAttachClasses)
                        })
                    }
                }, {
                    key: "position",
                    value: function () {
                        var t = this,
                            e = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
                        if (this.enabled) {
                            this.clearCache();
                            var i = R(this.targetAttachment, this.attachment);
                            this.updateAttachClasses(this.attachment, i);
                            var a = this.cache("element-bounds", function () {
                                    return s(t.element)
                                }),
                                n = a.width,
                                o = a.height;
                            if (0 === n && 0 === o && void 0 !== this.lastSize) {
                                var r = this.lastSize;
                                n = r.width, o = r.height
                            } else this.lastSize = {
                                width: n,
                                height: o
                            };
                            var c = this.cache("target-bounds", function () {
                                    return t.getTargetBounds()
                                }),
                                d = c,
                                h = Q(L(this.attachment), {
                                    width: n,
                                    height: o
                                }),
                                p = Q(L(i), d),
                                f = Q(this.offset, {
                                    width: n,
                                    height: o
                                }),
                                g = Q(this.targetOffset, d);
                            h = w(h, f), p = w(p, g);
                            for (var m = c.left + p.left - h.left, y = c.top + p.top - h.top, v = 0; v < C.modules.length; ++v) {
                                var j = C.modules[v].position.call(this, {
                                    left: m,
                                    top: y,
                                    targetAttachment: i,
                                    targetPos: c,
                                    elementPos: a,
                                    offset: h,
                                    targetOffset: p,
                                    manualOffset: f,
                                    manualTargetOffset: g,
                                    scrollbarSize: x,
                                    attachment: this.attachment
                                });
                                if (!1 === j) return !1;
                                void 0 !== j && "object" == typeof j && (y = j.top, m = j.left)
                            }
                            var b = {
                                    page: {
                                        top: y,
                                        left: m
                                    },
                                    viewport: {
                                        top: y - pageYOffset,
                                        bottom: pageYOffset - y - o + innerHeight,
                                        left: m - pageXOffset,
                                        right: pageXOffset - m - n + innerWidth
                                    }
                                },
                                _ = this.target.ownerDocument,
                                A = _.defaultView,
                                x = void 0;
                            return _.body.scrollWidth > A.innerWidth && (x = this.cache("scrollbar-size", u), b.viewport.bottom -= x.height), _.body.scrollHeight > A.innerHeight && (x = this.cache("scrollbar-size", u), b.viewport.right -= x.width), (-1 === ["", "static"].indexOf(_.body.style.position) || -1 === ["", "static"].indexOf(_.body.parentElement.style.position)) && (b.page.bottom = _.body.scrollHeight - y - o, b.page.right = _.body.scrollWidth - m - n), void 0 !== this.options.optimizations && !1 !== this.options.optimizations.moveElement && void 0 === this.targetModifier && function () {
                                var e = t.cache("target-offsetparent", function () {
                                        return l(t.target)
                                    }),
                                    i = t.cache("target-offsetparent-bounds", function () {
                                        return s(e)
                                    }),
                                    a = getComputedStyle(e),
                                    n = i,
                                    o = {};
                                if (["Top", "Left", "Bottom", "Right"].forEach(function (t) {
                                        o[t.toLowerCase()] = parseFloat(a["border" + t + "Width"])
                                    }), i.right = _.body.scrollWidth - i.left - n.width + o.right, i.bottom = _.body.scrollHeight - i.top - n.height + o.bottom, b.page.top >= i.top + o.top && b.page.bottom >= i.bottom && b.page.left >= i.left + o.left && b.page.right >= i.right) {
                                    var r = e.scrollTop,
                                        u = e.scrollLeft;
                                    b.offset = {
                                        top: b.page.top - i.top + r - o.top,
                                        left: b.page.left - i.left + u - o.left
                                    }
                                }
                            }(), this.move(b), this.history.unshift(b), this.history.length > 3 && this.history.pop(), e && T(), !0
                        }
                    }
                }, {
                    key: "move",
                    value: function (t) {
                        var e = this;
                        if (void 0 !== this.element.parentNode) {
                            var i = {};
                            for (var a in t) {
                                i[a] = {};
                                for (var n in t[a]) {
                                    for (var o = !1, r = 0; r < this.history.length; ++r) {
                                        var s = this.history[r];
                                        if (void 0 !== s[a] && !v(s[a][n], t[a][n])) {
                                            o = !0;
                                            break
                                        }
                                    }
                                    o || (i[a][n] = !0)
                                }
                            }
                            var u = {
                                    top: "",
                                    left: "",
                                    right: "",
                                    bottom: ""
                                },
                                d = function (t, i) {
                                    if (!1 !== (void 0 !== e.options.optimizations ? e.options.optimizations.gpu : null)) {
                                        var a = void 0,
                                            n = void 0;
                                        t.top ? (u.top = 0, a = i.top) : (u.bottom = 0, a = -i.bottom), t.left ? (u.left = 0, n = i.left) : (u.right = 0, n = -i.right), u[H] = "translateX(" + Math.round(n) + "px) translateY(" + Math.round(a) + "px)", "msTransform" !== H && (u[H] += " translateZ(0)")
                                    } else t.top ? u.top = i.top + "px" : u.bottom = i.bottom + "px", t.left ? u.left = i.left + "px" : u.right = i.right + "px"
                                },
                                h = !1;
                            if ((i.page.top || i.page.bottom) && (i.page.left || i.page.right) ? (u.position = "absolute", d(i.page, t.page)) : (i.viewport.top || i.viewport.bottom) && (i.viewport.left || i.viewport.right) ? (u.position = "fixed", d(i.viewport, t.viewport)) : void 0 !== i.offset && i.offset.top && i.offset.left ? function () {
                                    u.position = "absolute";
                                    var a = e.cache("target-offsetparent", function () {
                                        return l(e.target)
                                    });
                                    l(e.element) !== a && O(function () {
                                        e.element.parentNode.removeChild(e.element), a.appendChild(e.element)
                                    }), d(i.offset, t.offset), h = !0
                                }() : (u.position = "absolute", d({
                                    top: !0,
                                    left: !0
                                }, t.page)), !h) {
                                for (var p = !0, f = this.element.parentNode; f && 1 === f.nodeType && "BODY" !== f.tagName;) {
                                    if ("static" !== getComputedStyle(f).position) {
                                        p = !1;
                                        break
                                    }
                                    f = f.parentNode
                                }
                                p || (this.element.parentNode.removeChild(this.element), this.element.ownerDocument.body.appendChild(this.element))
                            }
                            var g = {},
                                m = !1;
                            for (var n in u) {
                                var y = u[n];
                                this.element.style[n] !== y && (m = !0, g[n] = y)
                            }
                            m && O(function () {
                                c(e.element.style, g)
                            })
                        }
                    }
                }]), e
            }(I);
        G.modules = [], C.position = P;
        var Y = c(G, C),
            B = function () {
                function t(t, e) {
                    var i = [],
                        a = !0,
                        n = !1,
                        o = void 0;
                    try {
                        for (var r, s = t[Symbol.iterator](); !(a = (r = s.next()).done) && (i.push(r.value), !e || i.length !== e); a = !0);
                    } catch (t) {
                        n = !0, o = t
                    } finally {
                        try {
                            !a && s.return && s.return()
                        } finally {
                            if (n) throw o
                        }
                    }
                    return i
                }
                return function (e, i) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return t(e, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            s = (D = C.Utils).getBounds,
            c = D.extend,
            m = D.updateClasses,
            O = D.defer,
            J = ["left", "top", "right", "bottom"];
        C.modules.push({
            position: function (t) {
                var e = this,
                    i = t.top,
                    a = t.left,
                    n = t.targetAttachment;
                if (!this.options.constraints) return !0;
                var o = this.cache("element-bounds", function () {
                        return s(e.element)
                    }),
                    r = o.height,
                    l = o.width;
                if (0 === l && 0 === r && void 0 !== this.lastSize) {
                    var u = this.lastSize;
                    l = u.width, r = u.height
                }
                var d = this.cache("target-bounds", function () {
                        return e.getTargetBounds()
                    }),
                    h = d.height,
                    p = d.width,
                    f = [this.getClass("pinned"), this.getClass("out-of-bounds")];
                this.options.constraints.forEach(function (t) {
                    var e = t.outOfBoundsClass,
                        i = t.pinnedClass;
                    e && f.push(e), i && f.push(i)
                }), f.forEach(function (t) {
                    ["left", "top", "right", "bottom"].forEach(function (e) {
                        f.push(t + "-" + e)
                    })
                });
                var g = [],
                    y = c({}, n),
                    v = c({}, this.attachment);
                return this.options.constraints.forEach(function (t) {
                    var o = t.to,
                        s = t.attachment,
                        u = t.pin;
                    void 0 === s && (s = "");
                    var c = void 0,
                        d = void 0;
                    if (s.indexOf(" ") >= 0) {
                        var f = s.split(" "),
                            m = B(f, 2);
                        d = m[0], c = m[1]
                    } else c = d = s;
                    var j = b(e, o);
                    ("target" === d || "both" === d) && (i < j[1] && "top" === y.top && (i += h, y.top = "bottom"), i + r > j[3] && "bottom" === y.top && (i -= h, y.top = "top")), "together" === d && ("top" === y.top && ("bottom" === v.top && i < j[1] ? (i += h, y.top = "bottom", i += r, v.top = "top") : "top" === v.top && i + r > j[3] && i - (r - h) >= j[1] && (i -= r - h, y.top = "bottom", v.top = "bottom")), "bottom" === y.top && ("top" === v.top && i + r > j[3] ? (i -= h, y.top = "top", i -= r, v.top = "bottom") : "bottom" === v.top && i < j[1] && i + (2 * r - h) <= j[3] && (i += r - h, y.top = "top", v.top = "top")), "middle" === y.top && (i + r > j[3] && "top" === v.top ? (i -= r, v.top = "bottom") : i < j[1] && "bottom" === v.top && (i += r, v.top = "top"))), ("target" === c || "both" === c) && (a < j[0] && "left" === y.left && (a += p, y.left = "right"), a + l > j[2] && "right" === y.left && (a -= p, y.left = "left")), "together" === c && (a < j[0] && "left" === y.left ? "right" === v.left ? (a += p, y.left = "right", a += l, v.left = "left") : "left" === v.left && (a += p, y.left = "right", a -= l, v.left = "right") : a + l > j[2] && "right" === y.left ? "left" === v.left ? (a -= p, y.left = "left", a -= l, v.left = "right") : "right" === v.left && (a -= p, y.left = "left", a += l, v.left = "left") : "center" === y.left && (a + l > j[2] && "left" === v.left ? (a -= l, v.left = "right") : a < j[0] && "right" === v.left && (a += l, v.left = "left"))), ("element" === d || "both" === d) && (i < j[1] && "bottom" === v.top && (i += r, v.top = "top"), i + r > j[3] && "top" === v.top && (i -= r, v.top = "bottom")), ("element" === c || "both" === c) && (a < j[0] && ("right" === v.left ? (a += l, v.left = "left") : "center" === v.left && (a += l / 2, v.left = "left")), a + l > j[2] && ("left" === v.left ? (a -= l, v.left = "right") : "center" === v.left && (a -= l / 2, v.left = "right"))), "string" == typeof u ? u = u.split(",").map(function (t) {
                        return t.trim()
                    }) : !0 === u && (u = ["top", "left", "right", "bottom"]), u = u || [];
                    var w = [],
                        Q = [];
                    i < j[1] && (u.indexOf("top") >= 0 ? (i = j[1], w.push("top")) : Q.push("top")), i + r > j[3] && (u.indexOf("bottom") >= 0 ? (i = j[3] - r, w.push("bottom")) : Q.push("bottom")), a < j[0] && (u.indexOf("left") >= 0 ? (a = j[0], w.push("left")) : Q.push("left")), a + l > j[2] && (u.indexOf("right") >= 0 ? (a = j[2] - l, w.push("right")) : Q.push("right")), w.length && function () {
                        var t = void 0;
                        t = void 0 !== e.options.pinnedClass ? e.options.pinnedClass : e.getClass("pinned"), g.push(t), w.forEach(function (e) {
                            g.push(t + "-" + e)
                        })
                    }(), Q.length && function () {
                        var t = void 0;
                        t = void 0 !== e.options.outOfBoundsClass ? e.options.outOfBoundsClass : e.getClass("out-of-bounds"), g.push(t), Q.forEach(function (e) {
                            g.push(t + "-" + e)
                        })
                    }(), (w.indexOf("left") >= 0 || w.indexOf("right") >= 0) && (v.left = y.left = !1), (w.indexOf("top") >= 0 || w.indexOf("bottom") >= 0) && (v.top = y.top = !1), (y.top !== n.top || y.left !== n.left || v.top !== e.attachment.top || v.left !== e.attachment.left) && (e.updateAttachClasses(v, y), e.trigger("update", {
                        attachment: v,
                        targetAttachment: y
                    }))
                }), O(function () {
                    !1 !== e.options.addTargetClasses && m(e.target, g, f), m(e.element, g, f)
                }), {
                    top: i,
                    left: a
                }
            }
        });
        var s = (D = C.Utils).getBounds,
            m = D.updateClasses,
            O = D.defer;
        C.modules.push({
            position: function (t) {
                var e = this,
                    i = t.top,
                    a = t.left,
                    n = this.cache("element-bounds", function () {
                        return s(e.element)
                    }),
                    o = n.height,
                    r = n.width,
                    l = this.getTargetBounds(),
                    u = i + o,
                    c = a + r,
                    d = [];
                i <= l.bottom && u >= l.top && ["left", "right"].forEach(function (t) {
                    var e = l[t];
                    (e === a || e === c) && d.push(t)
                }), a <= l.right && c >= l.left && ["top", "bottom"].forEach(function (t) {
                    var e = l[t];
                    (e === i || e === u) && d.push(t)
                });
                var h = [],
                    p = [],
                    f = ["left", "top", "right", "bottom"];
                return h.push(this.getClass("abutted")), f.forEach(function (t) {
                    h.push(e.getClass("abutted") + "-" + t)
                }), d.length && p.push(this.getClass("abutted")), d.forEach(function (t) {
                    p.push(e.getClass("abutted") + "-" + t)
                }), O(function () {
                    !1 !== e.options.addTargetClasses && m(e.target, p, h), m(e.element, p, h)
                }), !0
            }
        });
        B = function () {
            function t(t, e) {
                var i = [],
                    a = !0,
                    n = !1,
                    o = void 0;
                try {
                    for (var r, s = t[Symbol.iterator](); !(a = (r = s.next()).done) && (i.push(r.value), !e || i.length !== e); a = !0);
                } catch (t) {
                    n = !0, o = t
                } finally {
                    try {
                        !a && s.return && s.return()
                    } finally {
                        if (n) throw o
                    }
                }
                return i
            }
            return function (e, i) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        return C.modules.push({
            position: function (t) {
                var e = t.top,
                    i = t.left;
                if (this.options.shift) {
                    var a = this.options.shift;
                    "function" == typeof this.options.shift && (a = this.options.shift.call(this, {
                        top: e,
                        left: i
                    }));
                    var n = void 0,
                        o = void 0;
                    if ("string" == typeof a) {
                        (a = a.split(" "))[1] = a[1] || a[0];
                        var r = B(a, 2);
                        n = r[0], o = r[1], n = parseFloat(n, 10), o = parseFloat(o, 10)
                    } else n = a.top, o = a.left;
                    return e += n, i += o, {
                        top: e,
                        left: i
                    }
                }
            }
        }), Y
    })
}
window.width = jQuery(window).width(), window.height = jQuery(window).height(), jQuery(window).ready(function () {
    jQuery.fn.extend({
        size: function () {
            return this.length
        }
    }), _loadTetherBS4(), loadScript(plugin_path + "bootstrap/js/bootstrap.min.js", function () {
        jQuery("body").hasClass("enable-materialdesign") && loadScript(plugin_path + "mdl/material.min.js"), Init(!1)
    }), jQuery("html").hasClass("chrome") && jQuery("body").hasClass("smoothscroll") && navigator.platform.indexOf("Mac") < 0 && loadScript(plugin_path + "smoothscroll.js", function () {
        jQuery.smoothScroll()
    })
}), jQuery("#preloader").length > 0 && jQuery(window).on("load", function () {
    jQuery("#preloader").fadeOut(1e3, function () {
        jQuery("#preloader").remove()
    })
});
var _arr = {},
    isMobile = {
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Android: function () {
            return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i)
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i)
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i)
        },
        any: function () {
            return isMobile.iOS() || isMobile.Android() || isMobile.BlackBerry() || isMobile.Opera() || isMobile.Windows()
        }
    };
Number.prototype.formatMoney = function (t, e, i) {
        var a = this,
            t = isNaN(t = Math.abs(t)) ? 2 : t,
            e = void 0 == e ? "." : e,
            i = void 0 == i ? "," : i,
            n = a < 0 ? "-" : "",
            o = String(parseInt(a = Math.abs(Number(a) || 0).toFixed(t))),
            r = (r = o.length) > 3 ? r % 3 : 0;
        return n + (r ? o.substr(0, r) + i : "") + o.substr(r).replace(/(\d{3})(?=\d)/g, "$1" + i) + (t ? e + Math.abs(a - o).toFixed(t).slice(2) : "")
    },
    function (t) {
        function e(t, e) {
            return t.toFixed(e.decimals)
        }
        t.fn.countTo = function (e) {
            return e = e || {}, jQuery(this).each(function () {
                function i() {
                    u++, a(c += r), "function" == typeof n.onUpdate && n.onUpdate.call(s, c), u >= o && (l.removeData("countTo"), clearInterval(d.interval), c = n.to, "function" == typeof n.onComplete && n.onComplete.call(s, c))
                }

                function a(t) {
                    var e = n.formatter.call(s, t, n);
                    l.html(e)
                }
                var n = jQuery.extend({}, t.fn.countTo.defaults, {
                        from: jQuery(this).data("from"),
                        to: jQuery(this).data("to"),
                        speed: jQuery(this).data("speed"),
                        refreshInterval: jQuery(this).data("refresh-interval"),
                        decimals: jQuery(this).data("decimals")
                    }, e),
                    o = Math.ceil(n.speed / n.refreshInterval),
                    r = (n.to - n.from) / o,
                    s = this,
                    l = jQuery(this),
                    u = 0,
                    c = n.from,
                    d = l.data("countTo") || {};
                l.data("countTo", d), d.interval && clearInterval(d.interval), d.interval = setInterval(i, n.refreshInterval), a(c)
            })
        }, t.fn.countTo.defaults = {
            from: 0,
            to: 0,
            speed: 1e3,
            refreshInterval: 100,
            decimals: 0,
            formatter: e,
            onUpdate: null,
            onComplete: null
        }
    }(jQuery),
    function (t) {
        t.fn.appear = function (e, i) {
            var a = t.extend({
                data: void 0,
                one: !0,
                accX: 0,
                accY: 0
            }, i);
            return this.each(function () {
                var i = t(this);
                if (i.appeared = !1, e) {
                    var n = t(window),
                        o = function () {
                            if (i.is(":visible")) {
                                var t = n.scrollLeft(),
                                    e = n.scrollTop(),
                                    o = i.offset(),
                                    r = o.left,
                                    s = o.top,
                                    l = a.accX,
                                    u = a.accY,
                                    c = i.height(),
                                    d = n.height(),
                                    h = i.width(),
                                    p = n.width();
                                s + c + u >= e && s <= e + d + u && r + h + l >= t && r <= t + p + l ? i.appeared || i.trigger("appear", a.data) : i.appeared = !1
                            } else i.appeared = !1
                        },
                        r = function () {
                            if (i.appeared = !0, a.one) {
                                n.unbind("scroll", o);
                                var r = t.inArray(o, t.fn.appear.checks);
                                r >= 0 && t.fn.appear.checks.splice(r, 1)
                            }
                            e.apply(this, arguments)
                        };
                    a.one ? i.one("appear", a.data, r) : i.bind("appear", a.data, r), n.scroll(o), t.fn.appear.checks.push(o), o()
                } else i.trigger("appear", a.data)
            })
        }, t.extend(t.fn.appear, {
            checks: [],
            timeout: null,
            checkAll: function () {
                var e = t.fn.appear.checks.length;
                if (e > 0)
                    for (; e--;) t.fn.appear.checks[e]()
            },
            run: function () {
                t.fn.appear.timeout && clearTimeout(t.fn.appear.timeout), t.fn.appear.timeout = setTimeout(t.fn.appear.checkAll, 20)
            }
        }), t.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function (e, i) {
            var a = t.fn[i];
            a && (t.fn[i] = function () {
                var e = a.apply(this, arguments);
                return t.fn.appear.run(), e
            })
        })
    }(jQuery), /rbits/.test(self.location.href),
    function (t) {
        t.fn.parallax = function (t, e, i) {
            function a() {
                var a = jQuery(window).scrollTop();
                n = i ? function (t) {
                    return t.outerHeight(!0)
                } : function (t) {
                    return t.height()
                }, r.each(function () {
                    var i = jQuery(this),
                        r = i.offset().top,
                        s = n(i);
                    if (!(a > r + s || r > a + window.height)) {
                        var l = Math.round((o - a) * e);
                        i.css("backgroundPosition", t + " " + l + "px")
                    }
                })
            }
            var n, o, r = jQuery(this);
            (arguments.length < 1 || null === t) && (t = "50%"), (arguments.length < 2 || null === e) && (e = .1), (arguments.length < 3 || null === i) && (i = !0), r.each(function () {
                (o = r.offset().top) < window.height && (o = 0)
            }), jQuery(window).bind("scroll", a).resize(a), a()
        }
    }(jQuery), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function (t, e, i, a, n) {
            return jQuery.easing[jQuery.easing.def](t, e, i, a, n)
        },
        easeInQuad: function (t, e, i, a, n) {
            return a * (e /= n) * e + i
        },
        easeOutQuad: function (t, e, i, a, n) {
            return -a * (e /= n) * (e - 2) + i
        },
        easeInOutQuad: function (t, e, i, a, n) {
            return (e /= n / 2) < 1 ? a / 2 * e * e + i : -a / 2 * (--e * (e - 2) - 1) + i
        },
        easeInCubic: function (t, e, i, a, n) {
            return a * (e /= n) * e * e + i
        },
        easeOutCubic: function (t, e, i, a, n) {
            return a * ((e = e / n - 1) * e * e + 1) + i
        },
        easeInOutCubic: function (t, e, i, a, n) {
            return (e /= n / 2) < 1 ? a / 2 * e * e * e + i : a / 2 * ((e -= 2) * e * e + 2) + i
        },
        easeInQuart: function (t, e, i, a, n) {
            return a * (e /= n) * e * e * e + i
        },
        easeOutQuart: function (t, e, i, a, n) {
            return -a * ((e = e / n - 1) * e * e * e - 1) + i
        },
        easeInOutQuart: function (t, e, i, a, n) {
            return (e /= n / 2) < 1 ? a / 2 * e * e * e * e + i : -a / 2 * ((e -= 2) * e * e * e - 2) + i
        },
        easeInQuint: function (t, e, i, a, n) {
            return a * (e /= n) * e * e * e * e + i
        },
        easeOutQuint: function (t, e, i, a, n) {
            return a * ((e = e / n - 1) * e * e * e * e + 1) + i
        },
        easeInOutQuint: function (t, e, i, a, n) {
            return (e /= n / 2) < 1 ? a / 2 * e * e * e * e * e + i : a / 2 * ((e -= 2) * e * e * e * e + 2) + i
        },
        easeInSine: function (t, e, i, a, n) {
            return -a * Math.cos(e / n * (Math.PI / 2)) + a + i
        },
        easeOutSine: function (t, e, i, a, n) {
            return a * Math.sin(e / n * (Math.PI / 2)) + i
        },
        easeInOutSine: function (t, e, i, a, n) {
            return -a / 2 * (Math.cos(Math.PI * e / n) - 1) + i
        },
        easeInExpo: function (t, e, i, a, n) {
            return 0 == e ? i : a * Math.pow(2, 10 * (e / n - 1)) + i
        },
        easeOutExpo: function (t, e, i, a, n) {
            return e == n ? i + a : a * (1 - Math.pow(2, -10 * e / n)) + i
        },
        easeInOutExpo: function (t, e, i, a, n) {
            return 0 == e ? i : e == n ? i + a : (e /= n / 2) < 1 ? a / 2 * Math.pow(2, 10 * (e - 1)) + i : a / 2 * (2 - Math.pow(2, -10 * --e)) + i
        },
        easeInCirc: function (t, e, i, a, n) {
            return -a * (Math.sqrt(1 - (e /= n) * e) - 1) + i
        },
        easeOutCirc: function (t, e, i, a, n) {
            return a * Math.sqrt(1 - (e = e / n - 1) * e) + i
        },
        easeInOutCirc: function (t, e, i, a, n) {
            return (e /= n / 2) < 1 ? -a / 2 * (Math.sqrt(1 - e * e) - 1) + i : a / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + i
        },
        easeInElastic: function (t, e, i, a, n) {
            var o = 1.70158,
                r = 0,
                s = a;
            if (0 == e) return i;
            if (1 == (e /= n)) return i + a;
            if (r || (r = .3 * n), s < Math.abs(a)) {
                s = a;
                o = r / 4
            } else o = r / (2 * Math.PI) * Math.asin(a / s);
            return -s * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * n - o) * (2 * Math.PI) / r) + i
        },
        easeOutElastic: function (t, e, i, a, n) {
            var o = 1.70158,
                r = 0,
                s = a;
            if (0 == e) return i;
            if (1 == (e /= n)) return i + a;
            if (r || (r = .3 * n), s < Math.abs(a)) {
                s = a;
                o = r / 4
            } else o = r / (2 * Math.PI) * Math.asin(a / s);
            return s * Math.pow(2, -10 * e) * Math.sin((e * n - o) * (2 * Math.PI) / r) + a + i
        },
        easeInOutElastic: function (t, e, i, a, n) {
            var o = 1.70158,
                r = 0,
                s = a;
            if (0 == e) return i;
            if (2 == (e /= n / 2)) return i + a;
            if (r || (r = n * (.3 * 1.5)), s < Math.abs(a)) {
                s = a;
                o = r / 4
            } else o = r / (2 * Math.PI) * Math.asin(a / s);
            return e < 1 ? s * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * n - o) * (2 * Math.PI) / r) * -.5 + i : s * Math.pow(2, -10 * (e -= 1)) * Math.sin((e * n - o) * (2 * Math.PI) / r) * .5 + a + i
        },
        easeInBack: function (t, e, i, a, n, o) {
            return void 0 == o && (o = 1.70158), a * (e /= n) * e * ((o + 1) * e - o) + i
        },
        easeOutBack: function (t, e, i, a, n, o) {
            return void 0 == o && (o = 1.70158), a * ((e = e / n - 1) * e * ((o + 1) * e + o) + 1) + i
        },
        easeInOutBack: function (t, e, i, a, n, o) {
            return void 0 == o && (o = 1.70158), (e /= n / 2) < 1 ? a / 2 * (e * e * ((1 + (o *= 1.525)) * e - o)) + i : a / 2 * ((e -= 2) * e * ((1 + (o *= 1.525)) * e + o) + 2) + i
        },
        easeInBounce: function (t, e, i, a, n) {
            return a - jQuery.easing.easeOutBounce(t, n - e, 0, a, n) + i
        },
        easeOutBounce: function (t, e, i, a, n) {
            return (e /= n) < 1 / 2.75 ? a * (7.5625 * e * e) + i : e < 2 / 2.75 ? a * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + i : e < 2.5 / 2.75 ? a * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + i : a * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + i
        },
        easeInOutBounce: function (t, e, i, a, n) {
            return e < n / 2 ? .5 * jQuery.easing.easeInBounce(t, 2 * e, 0, a, n) + i : .5 * jQuery.easing.easeOutBounce(t, 2 * e - n, 0, a, n) + .5 * a + i
        }
    }),
    function () {
        var t, e, i, a, n, o = function (t, e) {
                return function () {
                    return t.apply(e, arguments)
                }
            },
            r = [].indexOf || function (t) {
                for (var e = 0, i = this.length; i > e; e++)
                    if (e in this && this[e] === t) return e;
                return -1
            };
        e = function () {
            function t() {}
            return t.prototype.extend = function (t, e) {
                var i, a;
                for (i in e) a = e[i], null == t[i] && (t[i] = a);
                return t
            }, t.prototype.isMobile = function (t) {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
            }, t.prototype.addEvent = function (t, e, i) {
                return null != t.addEventListener ? t.addEventListener(e, i, !1) : null != t.attachEvent ? t.attachEvent("on" + e, i) : t[e] = i
            }, t.prototype.removeEvent = function (t, e, i) {
                return null != t.removeEventListener ? t.removeEventListener(e, i, !1) : null != t.detachEvent ? t.detachEvent("on" + e, i) : delete t[e]
            }, t.prototype.innerHeight = function () {
                return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
            }, t
        }(), i = this.WeakMap || this.MozWeakMap || (i = function () {
            function t() {
                this.keys = [], this.values = []
            }
            return t.prototype.get = function (t) {
                var e, i, a, n;
                for (e = i = 0, a = (n = this.keys).length; a > i; e = ++i)
                    if (n[e] === t) return this.values[e]
            }, t.prototype.set = function (t, e) {
                var i, a, n, o;
                for (i = a = 0, n = (o = this.keys).length; n > a; i = ++a)
                    if (o[i] === t) return void(this.values[i] = e);
                return this.keys.push(t), this.values.push(e)
            }, t
        }()), t = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (t = function () {
            function t() {
                "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
            }
            return t.notSupported = !0, t.prototype.observe = function () {}, t
        }()), a = this.getComputedStyle || function (t) {
            return this.getPropertyValue = function (e) {
                var i;
                return "float" === e && (e = "styleFloat"), n.test(e) && e.replace(n, function (t, e) {
                    return e.toUpperCase()
                }), (null != (i = t.currentStyle) ? i[e] : void 0) || null
            }, this
        }, n = /(\-([a-z]){1})/g, this.WOW = function () {
            function n(t) {
                null == t && (t = {}), this.scrollCallback = o(this.scrollCallback, this), this.scrollHandler = o(this.scrollHandler, this), this.start = o(this.start, this), this.scrolled = !0, this.config = this.util().extend(t, this.defaults), this.animationNameCache = new i
            }
            return n.prototype.defaults = {
                boxClass: "wow",
                animateClass: "animated",
                offset: 0,
                mobile: !0,
                live: !0,
                callback: null
            }, n.prototype.init = function () {
                var t;
                return this.element = window.document.documentElement, "interactive" === (t = document.readyState) || "complete" === t ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
            }, n.prototype.start = function () {
                var e, i, a, n;
                if (this.stopped = !1, this.boxes = function () {
                        var t, i, a, n;
                        for (n = [], t = 0, i = (a = this.element.querySelectorAll("." + this.config.boxClass)).length; i > t; t++) e = a[t], n.push(e);
                        return n
                    }.call(this), this.all = function () {
                        var t, i, a, n;
                        for (n = [], t = 0, i = (a = this.boxes).length; i > t; t++) e = a[t], n.push(e);
                        return n
                    }.call(this), this.boxes.length)
                    if (this.disabled()) this.resetStyle();
                    else
                        for (n = this.boxes, i = 0, a = n.length; a > i; i++) e = n[i], this.applyStyle(e, !0);
                return this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new t(function (t) {
                    return function (e) {
                        var i, a, n, o, r;
                        for (r = [], n = 0, o = e.length; o > n; n++) a = e[n], r.push(function () {
                            var t, e, n, o;
                            for (o = [], t = 0, e = (n = a.addedNodes || []).length; e > t; t++) i = n[t], o.push(this.doSync(i));
                            return o
                        }.call(t));
                        return r
                    }
                }(this)).observe(document.body, {
                    childList: !0,
                    subtree: !0
                }) : void 0
            }, n.prototype.stop = function () {
                return this.stopped = !0, this.util().removeEvent(window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
            }, n.prototype.sync = function () {
                return t.notSupported ? this.doSync(this.element) : void 0
            }, n.prototype.doSync = function (t) {
                var e, i, a, n, o;
                if (null == t && (t = this.element), 1 === t.nodeType) {
                    for (o = [], i = 0, a = (n = (t = t.parentNode || t).querySelectorAll("." + this.config.boxClass)).length; a > i; i++) e = n[i], r.call(this.all, e) < 0 ? (this.boxes.push(e), this.all.push(e), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0), o.push(this.scrolled = !0)) : o.push(void 0);
                    return o
                }
            }, n.prototype.show = function (t) {
                return this.applyStyle(t), t.className = t.className + " " + this.config.animateClass, null != this.config.callback ? this.config.callback(t) : void 0
            }, n.prototype.applyStyle = function (t, e) {
                var i, a, n;
                return a = t.getAttribute("data-wow-duration"), i = t.getAttribute("data-wow-delay"), n = t.getAttribute("data-wow-iteration"), this.animate(function (o) {
                    return function () {
                        return o.customStyle(t, e, a, i, n)
                    }
                }(this))
            }, n.prototype.animate = function () {
                return "requestAnimationFrame" in window ? function (t) {
                    return window.requestAnimationFrame(t)
                } : function (t) {
                    return t()
                }
            }(), n.prototype.resetStyle = function () {
                var t, e, i, a, n;
                for (n = [], e = 0, i = (a = this.boxes).length; i > e; e++) t = a[e], n.push(t.style.visibility = "visible");
                return n
            }, n.prototype.customStyle = function (t, e, i, a, n) {
                return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", i && this.vendorSet(t.style, {
                    animationDuration: i
                }), a && this.vendorSet(t.style, {
                    animationDelay: a
                }), n && this.vendorSet(t.style, {
                    animationIterationCount: n
                }), this.vendorSet(t.style, {
                    animationName: e ? "none" : this.cachedAnimationName(t)
                }), t
            }, n.prototype.vendors = ["moz", "webkit"], n.prototype.vendorSet = function (t, e) {
                var i, a, n, o;
                o = [];
                for (i in e) a = e[i], t["" + i] = a, o.push(function () {
                    var e, o, r, s;
                    for (s = [], e = 0, o = (r = this.vendors).length; o > e; e++) n = r[e], s.push(t["" + n + i.charAt(0).toUpperCase() + i.substr(1)] = a);
                    return s
                }.call(this));
                return o
            }, n.prototype.vendorCSS = function (t, e) {
                var i, n, o, r, s, l;
                for (i = (n = a(t)).getPropertyCSSValue(e), r = 0, s = (l = this.vendors).length; s > r; r++) o = l[r], i = i || n.getPropertyCSSValue("-" + o + "-" + e);
                return i
            }, n.prototype.animationName = function (t) {
                var e;
                try {
                    e = this.vendorCSS(t, "animation-name").cssText
                } catch (i) {
                    e = a(t).getPropertyValue("animation-name")
                }
                return "none" === e ? "" : e
            }, n.prototype.cacheAnimationName = function (t) {
                return this.animationNameCache.set(t, this.animationName(t))
            }, n.prototype.cachedAnimationName = function (t) {
                return this.animationNameCache.get(t)
            }, n.prototype.scrollHandler = function () {
                return this.scrolled = !0
            }, n.prototype.scrollCallback = function () {
                var t;
                return !this.scrolled || (this.scrolled = !1, this.boxes = function () {
                    var e, i, a, n;
                    for (n = [], e = 0, i = (a = this.boxes).length; i > e; e++)(t = a[e]) && (this.isVisible(t) ? this.show(t) : n.push(t));
                    return n
                }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
            }, n.prototype.offsetTop = function (t) {
                for (var e; void 0 === t.offsetTop;) t = t.parentNode;
                for (e = t.offsetTop; t = t.offsetParent;) e += t.offsetTop;
                return e
            }, n.prototype.isVisible = function (t) {
                var e, i, a, n, o;
                return i = t.getAttribute("data-wow-offset") || this.config.offset, o = window.pageYOffset, n = o + Math.min(this.element.clientHeight, this.util().innerHeight()) - i, a = this.offsetTop(t), e = a + t.clientHeight, n >= a && e >= o
            }, n.prototype.util = function () {
                return null != this._util ? this._util : this._util = new e
            }, n.prototype.disabled = function () {
                return !this.config.mobile && this.util().isMobile(navigator.userAgent)
            }, n
        }()
    }.call(this),
    function (t, e, i) {
        function a(t, e) {
            return typeof t === e
        }

        function n(t) {
            var e = _.className,
                i = Q._config.classPrefix || "";
            if (C && (e = e.baseVal), Q._config.enableJSClass) {
                var a = new RegExp("(^|\\s)" + i + "no-js(\\s|$)");
                e = e.replace(a, "$1" + i + "js$2")
            }
            Q._config.enableClasses && (e += " " + i + t.join(" " + i), C ? _.className.baseVal = e : _.className = e)
        }

        function o() {
            return "function" != typeof e.createElement ? e.createElement(arguments[0]) : C ? e.createElementNS.call(e, "http://www.w3.org/2000/svg", arguments[0]) : e.createElement.apply(e, arguments)
        }

        function r(t, e) {
            if ("object" == typeof t)
                for (var i in t) S(t, i) && r(i, t[i]);
            else {
                var a = (t = t.toLowerCase()).split("."),
                    o = Q[a[0]];
                if (2 == a.length && (o = o[a[1]]), void 0 !== o) return Q;
                e = "function" == typeof e ? e() : e, 1 == a.length ? Q[a[0]] = e : (!Q[a[0]] || Q[a[0]] instanceof Boolean || (Q[a[0]] = new Boolean(Q[a[0]])), Q[a[0]][a[1]] = e), n([(e && 0 != e ? "" : "no-") + a.join("-")]), Q._trigger(t, e)
            }
            return Q
        }

        function s(t) {
            return t.replace(/([a-z])-([a-z])/g, function (t, e, i) {
                return e + i.toUpperCase()
            }).replace(/^-/, "")
        }

        function l(t, e) {
            return !!~("" + t).indexOf(e)
        }

        function u() {
            var t = e.body;
            return t || (t = o(C ? "svg" : "body"), t.fake = !0), t
        }

        function c(t, i, a, n) {
            var r, s, l, c, d = "modernizr",
                h = o("div"),
                p = u();
            if (parseInt(a, 10))
                for (; a--;) l = o("div"), l.id = n ? n[a] : d + (a + 1), h.appendChild(l);
            return r = o("style"), r.type = "text/css", r.id = "s" + d, (p.fake ? p : h).appendChild(r), p.appendChild(h), r.styleSheet ? r.styleSheet.cssText = t : r.appendChild(e.createTextNode(t)), h.id = d, p.fake && (p.style.background = "", p.style.overflow = "hidden", c = _.style.overflow, _.style.overflow = "hidden", _.appendChild(p)), s = i(h, t), p.fake ? (p.parentNode.removeChild(p), _.style.overflow = c, _.offsetHeight) : h.parentNode.removeChild(h), !!s
        }

        function d(t, e) {
            return function () {
                return t.apply(e, arguments)
            }
        }

        function h(t, e, i) {
            var n;
            for (var o in t)
                if (t[o] in e) return !1 === i ? t[o] : (n = e[t[o]], a(n, "function") ? d(n, i || e) : n);
            return !1
        }

        function p(t) {
            return t.replace(/([A-Z])/g, function (t, e) {
                return "-" + e.toLowerCase()
            }).replace(/^ms-/, "-ms-")
        }

        function f(e, a) {
            var n = e.length;
            if ("CSS" in t && "supports" in t.CSS) {
                for (; n--;)
                    if (t.CSS.supports(p(e[n]), a)) return !0;
                return !1
            }
            if ("CSSSupportsRule" in t) {
                for (var o = []; n--;) o.push("(" + p(e[n]) + ":" + a + ")");
                return o = o.join(" or "), c("@supports (" + o + ") { #modernizr { position: absolute; } }", function (t) {
                    return "absolute" == getComputedStyle(t, null).position
                })
            }
            return i
        }

        function g(t, e, n, r) {
            function u() {
                d && (delete D.style, delete D.modElem)
            }
            if (r = !a(r, "undefined") && r, !a(n, "undefined")) {
                var c = f(t, n);
                if (!a(c, "undefined")) return c
            }
            for (var d, h, p, g, m, y = ["modernizr", "tspan", "samp"]; !D.style && y.length;) d = !0, D.modElem = o(y.shift()), D.style = D.modElem.style;
            for (p = t.length, h = 0; p > h; h++)
                if (g = t[h], m = D.style[g], l(g, "-") && (g = s(g)), D.style[g] !== i) {
                    if (r || a(n, "undefined")) return u(), "pfx" != e || g;
                    try {
                        D.style[g] = n
                    } catch (t) {}
                    if (D.style[g] != m) return u(), "pfx" != e || g
                }
            return u(), !1
        }

        function m(t, e, i, n, o) {
            var r = t.charAt(0).toUpperCase() + t.slice(1),
                s = (t + " " + T.join(r + " ") + r).split(" ");
            return a(e, "string") || a(e, "undefined") ? g(s, e, n, o) : (s = (t + " " + x.join(r + " ") + r).split(" "), h(s, e, i))
        }

        function y(t, e, a) {
            return m(t, i, i, e, a)
        }
        var v = [],
            j = [],
            w = {
                _version: "3.3.1",
                _config: {
                    classPrefix: "",
                    enableClasses: !0,
                    enableJSClass: !0,
                    usePrefixes: !0
                },
                _q: [],
                on: function (t, e) {
                    var i = this;
                    setTimeout(function () {
                        e(i[t])
                    }, 0)
                },
                addTest: function (t, e, i) {
                    j.push({
                        name: t,
                        fn: e,
                        options: i
                    })
                },
                addAsyncTest: function (t) {
                    j.push({
                        name: null,
                        fn: t
                    })
                }
            },
            Q = function () {};
        Q.prototype = w, Q = new Q;
        var b = w._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
        w._prefixes = b;
        var _ = e.documentElement,
            C = "svg" === _.nodeName.toLowerCase();
        C || function (t, e) {
            function i(t, e) {
                var i = t.createElement("p"),
                    a = t.getElementsByTagName("head")[0] || t.documentElement;
                return i.innerHTML = "x<style>" + e + "</style>", a.insertBefore(i.lastChild, a.firstChild)
            }

            function a() {
                var t = v.elements;
                return "string" == typeof t ? t.split(" ") : t
            }

            function n(t, e) {
                var i = v.elements;
                "string" != typeof i && (i = i.join(" ")), "string" != typeof t && (t = t.join(" ")), v.elements = i + " " + t, u(e)
            }

            function o(t) {
                var e = y[t[g]];
                return e || (e = {}, m++, t[g] = m, y[m] = e), e
            }

            function r(t, i, a) {
                if (i || (i = e), d) return i.createElement(t);
                a || (a = o(i));
                var n;
                return n = a.cache[t] ? a.cache[t].cloneNode() : f.test(t) ? (a.cache[t] = a.createElem(t)).cloneNode() : a.createElem(t), !n.canHaveChildren || p.test(t) || n.tagUrn ? n : a.frag.appendChild(n)
            }

            function s(t, i) {
                if (t || (t = e), d) return t.createDocumentFragment();
                for (var n = (i = i || o(t)).frag.cloneNode(), r = 0, s = a(), l = s.length; l > r; r++) n.createElement(s[r]);
                return n
            }

            function l(t, e) {
                e.cache || (e.cache = {}, e.createElem = t.createElement, e.createFrag = t.createDocumentFragment, e.frag = e.createFrag()), t.createElement = function (i) {
                    return v.shivMethods ? r(i, t, e) : e.createElem(i)
                }, t.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + a().join().replace(/[\w\-:]+/g, function (t) {
                    return e.createElem(t), e.frag.createElement(t), 'c("' + t + '")'
                }) + ");return n}")(v, e.frag)
            }

            function u(t) {
                t || (t = e);
                var a = o(t);
                return !v.shivCSS || c || a.hasCSS || (a.hasCSS = !!i(t, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), d || l(t, a), t
            }
            var c, d, h = t.html5 || {},
                p = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                g = "_html5shiv",
                m = 0,
                y = {};
            ! function () {
                try {
                    var t = e.createElement("a");
                    t.innerHTML = "<xyz></xyz>", c = "hidden" in t, d = 1 == t.childNodes.length || function () {
                        e.createElement("a");
                        var t = e.createDocumentFragment();
                        return void 0 === t.cloneNode || void 0 === t.createDocumentFragment || void 0 === t.createElement
                    }()
                } catch (t) {
                    c = !0, d = !0
                }
            }();
            var v = {
                elements: h.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
                version: "3.7.3",
                shivCSS: !1 !== h.shivCSS,
                supportsUnknownElements: d,
                shivMethods: !1 !== h.shivMethods,
                type: "default",
                shivDocument: u,
                createElement: r,
                createDocumentFragment: s,
                addElements: n
            };
            t.html5 = v, u(e), "object" == typeof module && module.exports && (module.exports = v)
        }(void 0 !== t ? t : this, e);
        var A = "Moz O ms Webkit",
            x = w._config.usePrefixes ? A.toLowerCase().split(" ") : [];
        w._domPrefixes = x;
        var k = function () {
            function t(t, e) {
                var n;
                return !!t && (e && "string" != typeof e || (e = o(e || "div")), t = "on" + t, !(n = t in e) && a && (e.setAttribute || (e = o("div")), e.setAttribute(t, ""), n = "function" == typeof e[t], e[t] !== i && (e[t] = i), e.removeAttribute(t)), n)
            }
            var a = !("onblur" in e.documentElement);
            return t
        }();
        w.hasEvent = k, Q.addTest("video", function () {
            var t = o("video"),
                e = !1;
            try {
                (e = !!t.canPlayType) && (e = new Boolean(e), e.ogg = t.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), e.h264 = t.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), e.webm = t.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""), e.vp9 = t.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""), e.hls = t.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ""))
            } catch (t) {}
            return e
        });
        var S;
        ! function () {
            var t = {}.hasOwnProperty;
            S = a(t, "undefined") || a(t.call, "undefined") ? function (t, e) {
                return e in t && a(t.constructor.prototype[e], "undefined")
            } : function (e, i) {
                return t.call(e, i)
            }
        }(), w._l = {}, w.on = function (t, e) {
            this._l[t] || (this._l[t] = []), this._l[t].push(e), Q.hasOwnProperty(t) && setTimeout(function () {
                Q._trigger(t, Q[t])
            }, 0)
        }, w._trigger = function (t, e) {
            if (this._l[t]) {
                var i = this._l[t];
                setTimeout(function () {
                    var t;
                    for (t = 0; t < i.length; t++)(0, i[t])(e)
                }, 0), delete this._l[t]
            }
        }, Q._q.push(function () {
            w.addTest = r
        });
        var E = "CSS" in t && "supports" in t.CSS,
            O = "supportsCSS" in t;
        Q.addTest("supports", E || O);
        var T = w._config.usePrefixes ? A.split(" ") : [];
        w._cssomPrefixes = T;
        var I = function (e) {
            var a, n = b.length,
                o = t.CSSRule;
            if (void 0 === o) return i;
            if (!e) return !1;
            if (e = e.replace(/^@/, ""), (a = e.replace(/-/g, "_").toUpperCase() + "_RULE") in o) return "@" + e;
            for (var r = 0; n > r; r++) {
                var s = b[r];
                if (s.toUpperCase() + "_" + a in o) return "@-" + s.toLowerCase() + "-" + e
            }
            return !1
        };
        w.atRule = I;
        var B = w.testStyles = c,
            M = {
                elem: o("modernizr")
            };
        Q._q.push(function () {
            delete M.elem
        });
        var D = {
            style: M.elem.style
        };
        Q._q.unshift(function () {
                delete D.style
            }), w.testProp = function (t, e, a) {
                return g([t], i, e, a)
            }, w.testAllProps = m, w.prefixed = function (t, e, i) {
                return 0 === t.indexOf("@") ? I(t) : (-1 != t.indexOf("-") && (t = s(t)), e ? m(t, e, i) : m(t, "pfx"))
            }, w.testAllProps = y, Q.addTest("csstransitions", y("transition", "all", !0)), Q.addTest("csstransforms3d", function () {
                var t = !!y("perspective", "1px", !0),
                    e = Q._config.usePrefixes;
                if (t && (!e || "webkitPerspective" in _.style)) {
                    var i;
                    Q.supports ? i = "@supports (perspective: 1px)" : (i = "@media (transform-3d)", e && (i += ",(-webkit-transform-3d)")), B("#modernizr{width:0;height:0}" + (i += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}"), function (e) {
                        t = 7 === e.offsetWidth && 18 === e.offsetHeight
                    })
                }
                return t
            }),
            function () {
                var t, e, i, n, o, r, s;
                for (var l in j)
                    if (j.hasOwnProperty(l)) {
                        if (t = [], (e = j[l]).name && (t.push(e.name.toLowerCase()), e.options && e.options.aliases && e.options.aliases.length))
                            for (i = 0; i < e.options.aliases.length; i++) t.push(e.options.aliases[i].toLowerCase());
                        for (n = a(e.fn, "function") ? e.fn() : e.fn, o = 0; o < t.length; o++) r = t[o], s = r.split("."), 1 === s.length ? Q[s[0]] = n : (!Q[s[0]] || Q[s[0]] instanceof Boolean || (Q[s[0]] = new Boolean(Q[s[0]])), Q[s[0]][s[1]] = n), v.push((n ? "" : "no-") + s.join("-"))
                    }
            }(), n(v), delete w.addTest, delete w.addAsyncTest;
        for (var H = 0; H < Q._q.length; H++) Q._q[H]();
        t.Modernizr = Q
    }(window, document);
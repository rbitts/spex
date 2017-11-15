! function (a) {
    "object" == typeof exports ? module.exports = a() : "function" == typeof define && define.amd ? define(a) : "undefined" != typeof window ? window.storage = a() : "undefined" != typeof global ? global.storage = a() : "undefined" != typeof self && (self.storage = a())
}(function () {
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    throw new Error("Cannot find module '" + g + "'")
                }
                var j = c[g] = {
                    exports: {}
                };
                b[g][0].call(j.exports, function (a) {
                    var c = b[g][1][a];
                    return e(c ? c : a)
                }, j, j.exports, a, b, c, d)
            }
            return c[g].exports
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e
    }({
        1: [function (a, b) {
            /*!
            Copyright (c) 2013 Derek Petersen https://github.com/tuxracer/simple-storage MIT Licensed
            */
            var c, d, e, f, g;
            try {
                window.localStorage.setItem("simple-storage-test", !0), window.localStorage.removeItem("simple-storage-test"), d = !0
            } catch (h) {
                c = h, d = !1
            }
            d ? f = window : (g = {
                local: {},
                session: {}
            }, f = {
                localStorage: {
                    setItem: function (a, b) {
                        return g.local[a] = b
                    },
                    getItem: function (a) {
                        return g.local[a]
                    },
                    removeItem: function (a) {
                        return delete g.local[a]
                    },
                    clear: function () {
                        return g.local = {}
                    }
                },
                sessionStorage: {
                    setItem: function (a, b) {
                        return g.session[a] = b
                    },
                    getItem: function (a) {
                        return g.session[a]
                    },
                    removeItem: function (a) {
                        return delete g.session[a]
                    },
                    clear: function () {
                        return g.session = {}
                    }
                }
            }), e = function (a) {
                return "session" !== a && (a = "local"), f[a + "Storage"]
            }, b.exports = {
                nativeStorage: d,
                set: function (a, b, c) {
                    if ("function" == typeof b) throw new TypeError("Cannot store functions");
                    return "object" == typeof b && (b = JSON.stringify(b)), e(c).setItem(a, b)
                },
                get: function (a, b) {
                    var d;
                    if (null == a) return null;
                    d = e(b).getItem(a);
                    try {
                        return JSON.parse(d)
                    } catch (f) {
                        return c = f, d
                    }
                },
                remove: function (a, b) {
                    if (null == a) throw new Error("Not enough arguments");
                    return e(b).removeItem(a)
                },
                clear: function (a) {
                    return e(a).clear()
                }
            }
        }, {}]
    }, {}, [1])(1)
});


(function () {
    `use strict`;

    $ = window.jQuery || window.$ || (window.$ = {});

    String.prototype.format = function () {
        var formatted = this;
        for (var i = 0; i < arguments.length; i++) {
            var regexp = new RegExp('\\{' + i + '\\}', 'gi');
            formatted = formatted.replace(regexp, arguments[i]);
        }
        return formatted;
    };

    var _storage_keys = {
        ID: 'user_id',
        LEVEL: 'user_level',
        ICON: 'user_avatar',
        TOKEN: 'user_token',
        UPDATED: 'last_updated',
    }

    function _loadSpexStorage() {
        try {
            return storage.get('spexStorage') || storage.get('spexStorage', 'session');
        } catch (E) {
            return null;
        }
    }

    function _saveSpexStorage(value, isLocalStorage) {
        if (isLocalStorage) {
            storage.set('spexStorage', value);
        } else {
            storage.set('spexStorage', value, 'session');
        }
    }

    function _clearSpexStorage() {
        storage.clear();
        storage.clear('session');
    }

    $.sessionStorage = {
        hasSession: function () {
            // migration
            return _loadSpexStorage() === null || !(_loadSpexStorage()[_storage_keys.TOKEN]) ? false : true;
        },

        getLevel: function () {
            var l = _loadSpexStorage();
            try {
                return l[_storage_keys.LEVEL];
            } catch (E) {
                return 0;
            }
        },

        getIcon: function () {
            var l = _loadSpexStorage();
            try {
                return l[_storage_keys.ICON];
            } catch (E) {
                return null;
            }
        },

        getID: function () {
            var l = _loadSpexStorage();
            try {
                return l[_storage_keys.ID];
            } catch (E) {
                return null;
            }
        },

        getToken: function () {
            var l = _loadSpexStorage();
            try {
                return l[_storage_keys.TOKEN];
            } catch (E) {
                return null;
            }
        },

        isExpired: function () {
            var l = _loadSpexStorage();
            try {
                // expired 1day
                var du = Math.floor((new Date().getTime() - new Date(l[_storage_keys.UPDATED]).getTime()) / 1000 / 60 / 60 / 24);
                return Boolean(du);
                // return true;
            } catch (E) {
                return true;
            }
        },

        login: function (id, icon, level, token) {
            _clearSpexStorage();
            var w = {};
            w[_storage_keys.ID] = id;
            w[_storage_keys.ICON] = icon;
            w[_storage_keys.LEVEL] = level;
            w[_storage_keys.TOKEN] = token;
            w[_storage_keys.UPDATED] = new Date();

            _saveSpexStorage(w, false);
        },

        loginWithSave: function (id, icon, level, token) {
            _clearSpexStorage();
            var w = {};
            w[_storage_keys.ID] = id;
            w[_storage_keys.ICON] = icon;
            w[_storage_keys.LEVEL] = level;
            w[_storage_keys.TOKEN] = token;
            w[_storage_keys.UPDATED] = new Date();

            _saveSpexStorage(w, true);
        },

        fillNvElement: function () {
            if (!this.hasSession()) {
                $(location).attr('href', '/s2/signin');
                return;
            }
            // $("#navbar_avatar").css("background-image", "url(" + this.getIcon() + ")");
            // $("#navbar_id").text(this.getID().toDisplayID());

            // $("#nav_setting").attr('href', '/s2/setting/' + this.getID().toRequestID());

            // user level view
            $('.spex-level-{0}'.format(this.getLevel())).removeClass('g-show-check');

        },

        logout: function () {
            _clearSpexStorage();
        },

        toString: function () {
            return this.getID() + "/" + this.getLevel() + "/" + this.getIcon();
        }

    }

})();

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
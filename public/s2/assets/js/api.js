function toggleStylesheet(href, onoff, media) {
    var existingNode = 0 //get existing stylesheet node if it already exists:
    for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].href && document.styleSheets[i].href.indexOf(href) > -1) existingNode =
            document.styleSheets[i].ownerNode
    }
    if (onoff == undefined) onoff = !existingNode //toggle on or off if undefined
    if (onoff) { //TURN ON:
        if (existingNode) return onoff //already exists so cancel now
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        if (media !== undefined) {
            link.media = media;
        }
        var head = document.getElementsByTagName('head')[0]
        head.insertBefore(link, head.childNodes[0]);
    } else { //TURN OFF:
        if (existingNode) existingNode.parentNode.removeChild(existingNode)
    }
    return onoff
}

String.prototype.format = function () {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

// API1 reset password
(function ($, window, document, undefined) {
    'use strict';

    $('form[name="api1"]').on("submit", function (event) {
        var $self = $(this),
            $battletag = $(this).find('input[name="battletag"]'),
            $requestID = $(this).find('input[name="requestID"]');

        event.preventDefault();
        var tag = $battletag.val();

        if (!/\S+[\#|\-]\d+$/g.test(tag)) {
            alert('올바른 배틀태그를 입력하세요.');
            return;
        }
        tag = tag.replace("#", "-");

        $.get('/api/reset/{0}'.format(tag), {
                requestID: $requestID.val()
            },
            function (response, status) {
                $.alert(response.message);
            });
    });


})(jQuery, window, document);

// API2 score
(function ($, window, document, undefined) {
    'use strict';

    var appendToChosen = function (value, text) {
        var $select = $('#apiModal_member_select');
        $select.append($('<option value="{0}">{1}</option>'.format(value, text)))
        $select.trigger('chosen:updated');
    }

    $('#apiModal').on('shown.bs.modal', function () {
        if (!$.sessionStorage.hasSession()) {
            alert('정상적인 경로로 접근해주세요.');
            return;
        }
        $('.navbar-toggler').trigger('click');

        $.get('/api/info/myteam/member/{0}'.format($.sessionStorage.getID().toRequestID()), {}, function (response, status) {
            if (response.success) {
                var members = response.info;
                members.forEach(function (m, i) {
                    appendToChosen(m.id, m.id.toDisplayID());
                });
                // $('.spex-team-member-select').trigger('chosen:updated');
            }
        });

    });

    $('form[name="api2"]').on("submit", function (event) {
        var $self = $(this),
            $battletag = $(this).find('select[name="battletag"]'),
            $score = $(this).find('input[name="score"]');

        event.preventDefault();
        var tag = $battletag.val();

        if (!/\S+[\#|\-]\d+$/g.test(tag)) {
            alert('올바른 배틀태그를 입력하세요.');
            return;
        }
        tag = tag.replace("#", "-");

        $.post('/api/modify/member/{0}'.format(tag), {
                score: $score.val()
            },
            function (response, status) {
                if (response.success) {
                    alert('변경하였습니다');
                } else {
                    alert('실패하였습니다.');
                    // 3545
                    console.log(response.message);
                }
            });
    });

})(jQuery, window, document);



// API3 FCM
(function ($, window, document, undefined) {
    'use strict';

    $('form[name="api3"]').on("submit", function (event) {
        var $self = $(this),
            $title = $(this).find('input[name="title"]'),
            $content = $(this).find('input[name="title"]');

        event.preventDefault();

        var title = $title.val(),
            content = $content.val();

        $.post('/system/fcm/send', {
                title: title,
                content: content
            },
            function (response, status) {
                if (response.success) {
                    $.alert({
                        title: '노티전송',
                        content: '전송을 완료하였습니다.'
                    });
                } else {
                    $.alert({
                        title: '노티전송',
                        content: '전송을 실패하였습니다. {0}'.format(JSON.stringify(response.info.results))
                    });
                }
            });
    });


})(jQuery, window, document);



// API4 League average score
(function ($, window, document, undefined) {
    'use strict';

    $('form[name="api4"]').on("submit", function (event) {
        var $self = $(this),
            $score = $(this).find('input[name="score"]');

        event.preventDefault();

        $.get('/api/info/league/score', {},
            function (response, status) {
                if (response.success) {
                    let score = Math.round(response.info.score / response.info.count);
                    $score.val(score);
                } else {
                    $.alert({
                        title: '조회실패',
                        content: '조회에 실패했습니다.'
                    });
                }
            });
    });


})(jQuery, window, document);



// API5 팀 코멘트 변경
(function ($, window, document, undefined) {
    'use strict';

    $('form[name="api5"]').on("submit", function (event) {
        var $self = $(this),
            $teamid = $(this).find('input[name="teamid"]'),
            $comment = $(this).find('input[name="comment"]');

        event.preventDefault();

        $.post('/api/update/team', {
                teamid: $teamid.val(),
                comment: $comment.val()
            },
            function (response, status) {
                if (response.success) {
                    $.alert('변경하였습니다.');
                } else {
                    $.alert({
                        title: '조회실패',
                        content: '조회에 실패했습니다.'
                    });
                }
            });
    });


})(jQuery, window, document);
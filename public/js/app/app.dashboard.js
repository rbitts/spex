//    Full Calendar

// ladda
$('head').append('<script src=\'/js/plugins/ladda/spin.min.js\'><\/script>');
$('head').append('<script src=\'/js/plugins/ladda/ladda.min.js\'><\/script>');
$('head').append('<script src=\'/js/plugins/ladda/ladda.jquery.min.js\'><\/script>');
// $('head').append(' <script src = \'/js/plugins/video/responsible-video.js\'> <\/script>');

$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function (e) {
    $('body').hasClass('fullscreen-video') ? $('body').removeClass('fullscreen-video') : $(
        'body').addClass('fullscreen-video')
});

toggleStylesheet('/css/plugins/ladda/ladda-themeless.min.css', 1);


// <!-- jQuery UI  -->

// $('head').append('<script src=\'/js/plugins/jquery-ui/jquery-ui.min.js\'><\/script>');

// $('head').append('<script src=\'/js/plugins/fullcalendar/moment.min.js\'><\/script>');
// $('head').append('<script src=\'/js/plugins/fullcalendar/fullcalendar.min.js\'><\/script>');
// toggleStylesheet('/css/plugins/fullcalendar/fullcalendar.css', 1);
// toggleStylesheet('/css/plugins/fullcalendar/fullcalendar.print.css', 1, 'print');

$(document).ready(function () {

    var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='https://www.youtube.com'],iframe[src^='https://player.twitch.tv'], object, embed"),
        $fluidEl = $("figure");

    $allVideos.each(function () {
        $(this)
            // jQuery .data does not work on object/embed elements
            .attr('data-aspectRatio', this.height / this.width)
            .removeAttr('height')
            .removeAttr('width');
    });
    $(window).resize(function () {
        var newWidth = $fluidEl.width();
        $allVideos.each(function () {
            var $el = $(this);
            $el
                .width(newWidth)
                .height(newWidth * $el.attr('data-aspectRatio'));
        });
    }).resize();

    Ladda.bind('.ladda-button', {
        timeout: 2000
    });

    var user_id = getSessionUser();
    if (user_id === 'guest' || user_id === undefined) {
        $('.ladda-button-accept').attr("disabled", true);
        $('.ladda-button-accept').text("로그인필요");
    }

    var l = $('.ladda-button-accept').ladda();

    l.click(function () {
        // Start loading
        l.ladda('start');
        $.get("/poll/commit", {
            user_id: getSessionUser(),
            poll_id: 1,
        }, function (response, status) {
            l.ladda('stop');
            $(location).attr('href', '/league/team');
        });

        // Timeout example
        // Do something in backend and then stop ladda
        setTimeout(function () {
            l.ladda('stop');
        }, 12000)
    });

    // $('#league-dashboard-join-footer').hide();
    if (user_id !== 'guest' && user_id !== undefined) {
        console.log(user_id + '리그상태');
        $.get("/league/userteam", {
            user_id: getSessionUser(),
        }, function (response, status) {
            if (response === undefined) return;

            if (!response.hasTeam) {
                // 리그 참여 상태가 아닐때 스크롤
                $('html, body').animate({
                    scrollTop: $('.footer').offset().top
                }, 'fast');

                $('.league-dashboard-join-footer').removeClass('collapse');

                console.log(response);
            }
        });
    }
    // 팀장일 때 
    if (getSessionUserRole() == 2) {
        /*
        $.get("/league/search_activity", {
            user_id: getSessionUser(),
            team_id: getSessionUserTeam()
        }, function (response, status) {
            if (response === undefined) return;

            if (response.hasRequest) {
                $(location).attr('href', '/league/join_request?team_id=' + getSessionUserTeam());
            }
        });
*/

    }

    // youtube 비동기 로드
    var youtube = document.querySelectorAll(".youtube");
    for (var i = 0; i < youtube.length; i++) {

        //https://clips-media-assets.twitch.tv/vod-107049351-offset-26-preview-480x272.jpg
        if (youtube[i].dataset.streamming == "youtube") {
            var source = "https://img.youtube.com/vi/" + youtube[i].dataset.embed + "/sddefault.jpg";

            // Load the image asynchronously
            var image = new Image();        
            image.src = source;        
            image.addEventListener("load", function () {            
                youtube[i].appendChild(image);        
            }(i));

            youtube[i].addEventListener("click", function () {
                var iframe = document.createElement("iframe");             
                iframe.setAttribute("frameborder", "0");            
                iframe.setAttribute("allowfullscreen", "");            
                iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.dataset.embed + "?rel=0&showinfo=0&autoplay=1");             
                this.innerHTML = "";            
                this.appendChild(iframe);    
            });
        }
    }
});
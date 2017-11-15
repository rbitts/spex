$(document).ready(function () {

    if (getSessionUser() === 'guest') {
        $(location).attr('href', '/users');
    }
    // ladda
    $('head').append('<script src=\'/js/plugins/ladda/spin.min.js\'><\/script>');
    $('head').append('<script src=\'/js/plugins/ladda/ladda.min.js\'><\/script>');
    $('head').append('<script src=\'/js/plugins/ladda/ladda.jquery.min.js\'><\/script>');

    toggleStylesheet('/css/plugins/ladda/ladda-themeless.min.css', 1);

    // Bind normal buttons
    Ladda.bind('.ladda-button', {
        timeout: 2000
    });

    // Bind progress buttons and simulate loading progress
    // Ladda.bind('.progress-demo .ladda-button', {
    //     callback: function (instance) {
    //         $.get("/poll/commit", {
    //             poll_id: 1,
    //         }, function (response, status) {
    //             console.log(response);
    //             instance.stop();
    //         });


    //         // var progress = 0;
    //         // var interval = setInterval(function () {
    //         //     progress = Math.min(progress + Math.random() * 0.1, 1);
    //         //     instance.setProgress(progress);

    //         //     if (progress === 1) {
    //         //         instance.stop();
    //         //         clearInterval(interval);
    //         //     }
    //         // }, 200);
    //     }
    // });


    var accept_l = $('.ladda-button-accept').ladda();

    accept_l.click(function () {

        // Start loading
        accept_l.ladda('start');
        $.get("/poll/commit", {
            user_id: getSessionUser(),
            poll_id: 1,
        }, function (response, status) {
            console.log(response);
            accept_l.ladda('stop');
            $(location).attr('href', '/poll/poll_result');
        });

        // Timeout example
        // Do something in backend and then stop ladda
        setTimeout(function () {
            accept_l.ladda('stop');
        }, 12000)
    });

    var reject_l = $('.ladda-button-reject').ladda();

    reject_l.click(function () {
        // Start loading
        reject_l.ladda('start');

        $.get("/poll/commit", {
            user_id: getSessionUser(),
            poll_id: 2,
        }, function (response, status) {
            console.log(response);
            reject_l.ladda('stop');
            $(location).attr('href', '/poll/poll_result');
        });

        // Timeout example
        // Do something in backend and then stop ladda
        setTimeout(function () {
            reject_l.ladda('stop');
        }, 12000)
    });
});
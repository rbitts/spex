$(document).ready(function () {
    $('head').append('<link href=\'/css/plugins/morris/morris-0.4.3.min.css\' ref=\'stylesheet\'>');
    $('head').append('<script src=\'/js/plugins/morris/raphael-2.1.0.min.js\'><\/script>');
    $('head').append('<script src=\'/js/plugins/morris/morris.js\'><\/script>');

    $.get("/poll/data", {}, function (response, status) {
        let vote_yet = 0;
        let vote_accept = 0;
        let vote_reject = 0;
        for (var i = 0; i < response.length; i++) {
            if (response[i].poll == 0) {
                vote_yet++;
            } else if (response[i].poll == 1) {
                vote_accept++;
            } else {
                vote_reject++;
            }
        }

        $("#vote-bar-chart").empty();

        Morris.Donut({
            element: 'vote-bar-chart',
            data: [{
                    label: "미투표",
                    value: vote_yet
                },

                {
                    label: "불참",
                    value: vote_reject
                },
                {
                    label: "참여",
                    value: vote_accept
                }
            ],
            resize: true,
            colors: ['#ed5565', '#f8ac59', '#1ab394'],
        });

    });
});
$('head').append('<script src=\'/js/plugins/iCheck/icheck.min.js\'><\/script>');

toggleStylesheet('/css/plugins/iCheck/custom.css', 1);
toggleStylesheet('/css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css', 1);

$(document).ready(function () {
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });

    $('select').on('change', function () {
        console.log(this.value);

        $('.my-poster-image').attr("src", "/img/poster/" + this.value + ".jpg");
        // $(".my-avatar-bg").css("background-image", "url(/img/poster/" + this.value + ".jpg");

    })
});
function getSessionUser() {
    if (localStorageSupport()) {
        var user_id = localStorage.getItem("store_user_id");
        if (user_id) return user_id;
    }
    return sessionStorage.getItem("user_id");
}

var index_page = '/s2';

$(document).ready(function () {

    // 게스트로그인
    // $("#guest-login").click(function () {
    //     sessionStorage.setItem("user_id", "guest");
    //     $(location).attr('href', index_page);
    // });

    // 사용자 정보 저장 팝업
    $('#input-pin-save-check').on('ifChecked', function (event) {
        swal({
            title: "<small><i class='fa fa-info-circle'></i>주의하세요</small>",
            text: "사용자 정보를 저장하시겠습니까?<br><small>(개인용 PC나 모바일 장치에서만 사용하세요)</small>",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonColor: "#DD6B55",
            html: true
        }, function (isConfirm) {
            if (!isConfirm) {
                console.log("dddd");
                $("#input-pin-save-check").iCheck('uncheck');
            }
        });
        // }
    });

    if ($.sessionStorage.hasSession()) {
        console.log($.sessionStorage.getID());
        $(location).attr('href', index_page);
    }


    // load from localStorage
    if (localStorageSupport()) {
        var user_id = localStorage.getItem("store_user_id");
        if (user_id) {
            $.get("/session", {
                user_id: user_id,
            }, function (response, status) {
                $("#avatar").attr("src", response.avatar);
                if (response.avatar) {
                    $("#avatar").addClass("circle-border");
                }
                $("#input-battle-tag").val(response.user_id);
                $(".validate").removeAttr("disabled");
                $("#pin").focus();

                if (!response.signup) {
                    $(".signup").hide();
                }
                console.log(response);
                return;
            });
        }
    }

    // load from sessionStroage    
    if (sessionStorage.getItem("user_id")) {
        $.get("/session", {
            user_id: sessionStorage.getItem("user_id"),
        }, function (response, status) {
            $("#avatar").attr("src", response.avatar);
            if (response.avatar) {
                $("#avatar").addClass("circle-border");
            }
            $("#input-battle-tag").val(response.user_id);
            $(".validate").removeAttr("disabled");
            $("#pin").focus();

            if (!response.signup) {
                $(".signup").hide();
            }
            console.log(response);
            return;
        });
    }
});

$("form").on("submit", function (event) {
    event.preventDefault();

    var check_pin = $("#input-pin-enter-check").is(":visible");
    if (check_pin) {
        if ($("#pin").val() != $("#pin-recheck").val()) {
            console.log(check_pin);
            swal({
                title: "<small>핀번호 확인</small>",
                text: "<small><i class='fa fa-key'></i>핀번호가 다름니다. 핀번호를 확인해주세요</small>",
                type: "warning",
                closeOnConfirm: true,
                html: true
            });
            return;
        }
    }
    var user = $(this).find('input[name="user"]').val();
    var pin_number = $(this).find('input[name="password1"]').val();
    var pin_number2 = $(this).find('input[name="password2"]').val();
    var signup = $(this).find('input[name="signup"]').val();
    var save = $(this).find('input[name="save"]').prop('checked');

    $.post("/login", {
        user: user,
        password1: pin_number,
        password2: pin_number2,
        signup: signup,
        save: save
    }, function (response, status) {

        console.log(response);

        if (response.accept) {
            if (response.save) {
                // console.log('localstorage');
                $.sessionStorage.loginWithSave(response.info.id, response.info.icon, response.info.level);
            } else {
                // console.log('sessionstorage');
                $.sessionStorage.login(response.info.id, response.info.icon, response.info.level);
            }

            console.log($.sessionStorage.getID());
            $(location).attr('href', index_page);
            // console.log(target);
        } else {

            $("#pin").val("");
            $("#pin").focus();
        }

    });

});



// check if browser support HTML5 local storage
function localStorageSupport() {
    return (('localStorage' in window) && window['localStorage'] !== null)
}
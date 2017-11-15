$(document).ready(function () {
    $(".signout").click(function () {
        removeSession();
        console.log("signout");
        $(location).attr('href', '/');
    });
});


function removeSession() {
    if (localStorageSupport()) {
        localStorage.removeItem("store_user_id");
        localStorage.removeItem("store_user_role");
        localStorage.removeItem("store_user_team");
    }

    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("user_role");
    sessionStorage.removeItem("user_team");
    sessionStorage.removeItem("login");

    sessionStorage.removeItem("login");

}
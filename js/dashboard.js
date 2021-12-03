

$(document).ready(function () {

    var token = localStorage.getItem('token');
    var role = localStorage.getItem('role');

    if (token && role) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Ești logat',
            showConfirmButton: false,
            timer: 2500
        });

    } else {
        window.location.href = "../html/index.html";
    }

    if (role == '"student"') {

        var menutop = '';
        menutop += '<a id="enroll" href="../html/inrolari.html">';
        menutop += '<h3>Înrolări</h3>';
        menutop += '</a>';
        menutop += '<a id="lessons" href="../html/meditatii.html">';
        menutop += '<h3>Meditații</h3>';
        menutop += '</a>';
        menutop += '<a id = "logout" href="#">';
        menutop += '<h3>Deconectează-te</h3>';
        menutop += '</a>';
        $('#menu').append(menutop);

        var menurow = '';
        menurow += '<button id="enrollmenu" ';
        menurow += 'class="btn btn-primary d-grid gap-2 col-4 mx-auto responsive-width align-items-center menu_rectangle">';
        menurow += '<h3>Înrolări</h3>'
        menurow += '</button>'
        menurow += '<button id="lessonsmenu" '
        menurow += 'class="btn btn-primary d-grid gap-2 col-4 mx-auto responsive-width align-items-center menu_rectangle">'
        menurow += '<h3>Meditații</h3>'
        menurow += '</button>'
        menurow += '<button id ="logoutmenu" '
        menurow += 'class="btn btn-primary d-grid gap-2 col-4 mx-auto responsive-width align-items-center menu_rectangle">'
        menurow += '<h3>Deconectează-te</h3>'
        menurow += '</button>'
        $('#menu_row').append(menurow);


    } else if (role == '"teacher"') {

        var menutop = '';
        menutop += '<a id = "lesson" href="../html/meditatie.html">';
        menutop += '<h3>Meditație</h3>';
        menutop += '</a>';
        menutop += '<a id = "logout" href="#">';
        menutop += '<h3>Deconectează-te</h3>';
        menutop += '</a>';
        $('#menu').append(menutop);

        var menurow = '';
        menurow += '<button id ="lessonmenu" '
        menurow += 'class="btn btn-primary d-grid gap-2 col-4 mx-auto responsive-width align-items-center menu_rectangle">'
        menurow += '<h3>Meditație</h3>'
        menurow += '</button>'
        menurow += '<button id ="logoutmenu" '
        menurow += 'class="btn btn-primary d-grid gap-2 col-4 mx-auto responsive-width align-items-center menu_rectangle">'
        menurow += '<h3>Deconectează-te</h3>'
        menurow += '</button>'
        $('#menu_row').append(menurow);
    }

    // CLICK FUNCTIONS
    // LOGOUT 
    $('#logoutmenu').click(function () { logout(); return false; });
    $('#logout').click(function (e) { e.preventDefault(); logout(); return false; });


    // STUDENT
    $('#enrollmenu').click(function () { window.location.href = "#"; return false; });
    $('#lessonsmenu').click(function () { window.location.href = "../html/meditatii.html"; return false; });




    // TEACHER
    //TODO
    $('#lessonmenu').click(function () { window.location.href = "#"; return false; });



});
// LOGOUT

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = "../html/index.html";
}


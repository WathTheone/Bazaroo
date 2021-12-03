

$(document).ready(function () {

    var token = localStorage.getItem('token');
    var role = localStorage.getItem('role');

    if (!token && role != '"student"') {
        window.location.href = "../html/dashboard.html";
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
    }

    // CLICK FUNCTIONS
    // LOGOUT 
    $('#logoutmenu').click(function () { logout(); return false; });
    $('#logout').click(function (e) { e.preventDefault(); logout(); return false; });


    // STUDENT
    $('#enrollmenu').click(function () { window.location.href = "#"; return false; });
    $('#lessonsmenu').click(function () { window.location.href = "../html/meditatii.html"; return false; });

        // MEDITATII
    
        let url = 'https://proba2021.lsacbucuresti.ro/tutoring-classes';

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'boboc-token': bobocToken
            },
            contentType: 'application/json',
            success: function
                (data) {
                var student = '';
                console.log(data);
                // ITERATING THROUGH OBJECTS
                $.each(data, function (key, value) {
    
                    //CONSTRUCTION OF COMPONENTS
                    // DATA FROM JSON OBJECT
                student += '<div class="row meditatii_rectangle">';
                    student += '<div class="col-6 align-self-center">';
                        student += '<div class="row">';
                            student += '<div class="col-12">';
                                student += '<h2>' + 
                                value.subject['title'] + '</h2>';
                                student += '</div>';
                            student += '<div class="col-12">';
                                student += '<h3>' +
                                value.description + '</h3>'
                            student += '</div>';
                        student += '</div>';
                    student += '<div>';
                        student += '<div class="col-6 align-self-center">'
                            student += '<div class="row">';
                                student += '<div class="col-12 d-flex flex-row-reverse">';
                                    student += '<h3>' + 
                                    value.teacher['firstname'] + ' ' + 
                                    value.teacher['lastname'] + '</h3>';
                                student += '</div>'
                            student += '<div class="col-12 d-flex flex-row-reverse">'
                                student +='<button type="button" onclick="applylesson(' + value.id + ')"'
                                student +='class="btn btn-primary col-4 responsive-width align-items-center menu_rectangle">'
                                student +='<h3>Aplică</h3>'
                            student +='</button>'
                        student +='</div>'
                    student +='</div>'
                student +='</div>'
            student +='</div>'
                });
    
                //INSERTING COMPONENTS
                $('#meditation').append(student);
            },
            error: function (error) {
                console.log(error)
            }
        });
});
// LOGOUT

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = "../html/index.html";
}


function applylesson(id) {
    const url = 'https://proba2021.lsacbucuresti.ro//tutoring-classes/'+ id + '/enrol';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'boboc-token': bobocToken
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            regResponse(data);
        })
        .catch(e => myError(e));
};

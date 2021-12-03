

$(document).ready(function () {

    // REVIEWS

    let url = 'https://proba2021.lsacbucuresti.ro/reviews';

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json',
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
                student += '<div class="swiper-slide">';
                student += '<div class="review">';
                student += '<div class="row d-flex flex-row">';
                student += '<div class="col-3 align-self-end review_margin">';
                student += '<img id="asset1_10" class="review_margin" src="../img/Asset 1 10.svg" alt="asset_1_10">';
                student += '</div>';
                student += '<div class="col align-self-end">';
                student += '<h2>' +
                    value.user['firstname'] + ' ' + value.user['lastname'] + '</h2>';
                student += '</div>';
                student += '</div>';
                student += '<div class="row">';
                student += '<h3 class="col review_margin">' +
                    value.message + '</h3>'
                student += '</div>';
                student += '</div>';
                student += '</div>';
            });

            //INSERTING COMPONENTS
            $('#reviewcarousel').append(student);

            // Setting Carousel
            var swiper = new Swiper(".mySwiper", {
                slidesPerGroup: 1,
                loop: true,
                loopFillGroupWithBlank: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: -100,
                    }
                }
            });
        },
        error: function (error) {
            console.log(error)
        }
    });

    // REVIEWS END

});




function regSucces(data) {
    console.log(data);
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Operațiunea a fost de succes',
        showConfirmButton: false,
        timer: 3500
    });
    document.getElementById("contactform").reset();
};
function myError(err) {
    console.log('Ceva nu a mers bine', err);
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: err,
        showConfirmButton: false,
        timer: 2500
    })
};

function regResponse(data) {
    if (data['statusCode']) {
        myError(data['message']);
    }
    else {
        regSucces(data);
    }
}




function loginSucces(data) {
    console.log(data);
    localStorage.removeItem('role');
    localStorage.setItem('role', JSON.stringify(data['role']['title']));
    localStorage.removeItem('token');
    localStorage.setItem('token', JSON.stringify(data['token']));
    window.location.href = "../html/dashboard.html";
};

function loginResponse(data) {
    if (data['statusCode']) {
        myError(data['message']);
    }
    else {
        loginSucces(data);
    }
}

function isEmpty(obj) {
    for (var key in obj) {
        if (obj[key] === null || obj[key] == "") {
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Completează toate câmpurile',
                showConfirmButton: false,
                timer: 2500
            })
            return true;
        }
    }
    return false;
}



// REGISTER
function regSubmit() {
    event.preventDefault();
    let data = {};
    data['email'] = document.querySelector('#RegEmail').value;
    data['firstname'] = document.querySelector('#RegFName').value;
    data['lastname'] = document.querySelector('#RegSName').value;
    data['password'] = document.querySelector('#RegPw').value;
    data['confirmation_password'] = document.querySelector('#RegConfirmPw').value;
    data['role'] = document.querySelector('#regchoice').value;

    if (isEmpty(data)) {
        return;
    }

    if (data['password'] != data['confirmation_password']) {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Parola trebuie să coincidă',
            showConfirmButton: false,
            timer: 2500
        })
        return;
    }
    if (data['password'].length < 8) {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Parola trebuie să fie de minimum 8 caractere',
            showConfirmButton: false,
            timer: 2500
        })
        return;
    }
    var emailregex = /([a-zA-Z0-9]+[\.|_|\-]*)*@stud\.upb\.ro/;
    if (data['role'] == 'student' && (emailregex.test(data['email']) == false)) {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Email-ul nu este de forma potrivită',
            showConfirmButton: false,
            timer: 2500
        })
        return;
    }
    var emailregex = /([a-zA-Z0-9]+[\.|_|\-]*)*@onmicrosoft\.upb\.ro/;
    if (data['role'] == 'teacher' && (emailregex.test(data['email']) == false)) {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Email-ul nu este de forma potrivită',
            showConfirmButton: false,
            timer: 2500
        })
        return;
    }
    {
        const url = 'https://proba2021.lsacbucuresti.ro/auth/register';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'boboc-token': bobocToken
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                regResponse(data)
                document.getElementById("signup").reset()
            })
            .catch(e => myError(e));
    };
};

// REGISTER END


// LOGIN

function logSubmit() {
    event.preventDefault();
    let data = {};
    data['email'] = document.querySelector('#LoginEmail').value;
    data['password'] = document.querySelector('#LoginPw').value;

    if (isEmpty(data)) {
        return;
    }
    const url = 'https://proba2021.lsacbucuresti.ro/auth/login';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'boboc-token': bobocToken
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => loginResponse(data))
        .catch(e => myError(e));
};



// LOGIN END


// Contact
function contactSubmit() {
    event.preventDefault();
    let data = {};
    data['name'] = document.querySelector('#ContactName').value;
    data['email'] = document.querySelector('#ContactEmail').value;
    data['message'] = document.querySelector('#ContactText').value;

    if (isEmpty(data)) {
        return;
    }

    var emailregex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailregex.test(data['email'])) {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Completează cu un email valid',
            showConfirmButton: false,
            timer: 2500
        })
        return;
    }

    const url = 'https://proba2021.lsacbucuresti.ro/contact-requests';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'boboc-token': bobocToken
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            regResponse(data)
            document.getElementById("signup").reset();
        })
        .catch(e => myError(e));
};

//CONTACT END
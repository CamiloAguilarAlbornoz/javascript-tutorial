'use strict'

window.addEventListener('load', ()=> {
    let form = objectFromModel('#formInscription');
    form.addEventListener('submit', validateForm());
});

function validateForm() {
    let btnSend = objectFromModel('#send');
    btnSend.addEventListener('click', () => {
        if (confirm('Are you sure to send the form?')) {
            validateName();
        }
    });
    let btnReset = objectFromModel('#reset');
    btnReset.addEventListener('click', () => {
        reset();
    });
}

function validateName() {
    let nameInput = objectFromModel('#myName');
    let name = nameInput.value;
    if (name.length > 0) {
        nameInput.classList.remove('inputError');
        valideateEmail(name);
    } else {
        nameInput.classList.add('inputError');
    }
}

function valideateEmail(name) {
    let emailInput = objectFromModel('#myEmail');
    let email = emailInput.value;
    if (email.length > 0 && /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email)) {
        emailInput.classList.remove('inputError');
        validatePhoneNumber(name, email);
    } else {
        emailInput.classList.add('inputError');
    }
}

function validatePhoneNumber(name, email) {
    let phoneInput = objectFromModel('#myPhone');
    let phone = phoneInput.value;
    if (phone.length == 10) {
        phone = Number.parseInt(phone);
        if (!isNaN(phone)) {
            phoneInput.classList.remove('inputError');
            validateCourses(name, email, phone);
        }
    } else {
        phoneInput.classList.add('inputError');
    }
}

function validateCourses(name, email, phone) {
    let coursesList = new Array();
    for (let i = 0; i < 4; i++) {
        testAndAdd(i, coursesList);
    }
    let coursesFieldSheet = objectFromModel('.allCourses');
    if (coursesList.length > 0) {
        coursesFieldSheet.classList.remove('errorCourses');
        showDatas(name, email, phone, coursesList);
    } else {
        coursesFieldSheet.classList.add('errorCourses');
    }
}

function showDatas(name, email, phone, coursesList) {
    var table = objectFromModel('#mytable');
    var row = document.createElement('tr');
    var columnName = document.createElement('td');
    columnName.classList.add('show');
    columnName.append(name);
    row.append(columnName);
    var columnEmail = document.createElement('td');
    columnEmail.classList.add('show');
    columnEmail.append(email);
    row.append(columnEmail);
    var columnPhone = document.createElement('td');
    columnPhone.classList.add('show');
    columnPhone.append(phone);
    row.append(columnPhone);
    var columnCourses = document.createElement('td');
    columnCourses.classList.add('show');
    columnCourses.append(coursesList);
    row.append(columnCourses);
    table.append(row);
    reset();
    alert('Your form has been send satisfactorily');
}

function reset() {
    objectFromModel('#myName').value = '';
    objectFromModel('#myEmail').value = '';
    objectFromModel('#myPhone').value = '';
    for (let i = 0; i < 4; i++) {
        document.getElementsByClassName('course')[i].checked = false;
    }
}

function testAndAdd(index, coursesList) {
    let coursesInput = document.getElementsByClassName('course')[index];
    let value = coursesInput.value;
    if (coursesInput.checked) {
        if (value != 'Other') {
            coursesList.push(value);   
        } else {
            let otherInput = objectFromModel('#myOther');
            let other = otherInput.value;
            if (other.length > 0) {
                coursesList.push(other);
                otherInput.classList.remove('inputError');
            } else {
                otherInput.classList.add('inputError');
            }
        }
    }
}

function objectFromModel(selector) {
    return document.querySelector(selector);
}
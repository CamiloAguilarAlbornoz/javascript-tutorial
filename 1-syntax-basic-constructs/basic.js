'use strict';

const message_adult = "you're an adult!";
const message_not_adult = "you're not an adult";

giveMeYourDate();

function giveMeYourDate() {
    let date = prompt('Give me your age');
    let message = date > 18 ? message_adult : message_not_adult;
    alert(message);
}
'use strict';

window.addEventListener('load', ()=> {
    fetch('https://api.github.com/repos/push-dev/frontend-roadmap/commits').
    then(data => data.json()).
    then(object => showName(object[0].author));
});

function showName(object) {
    console.log(object);
    let table = document.querySelector('#commiter');
    let row = document.createElement('tr');
    let columnImage = document.createElement('td');
    let image = document.createElement('img');
    image.src = object.avatar_url;
    image.width = '100';
    columnImage.append(image);
    row.append(columnImage);
    let columnName = document.createElement('td');
    columnName.append(object.login);
    row.append(columnName);
    table.append(columnImage);
    table.append(columnName);
}
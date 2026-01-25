const title = document.querySelector('h1');
console.log(title);

title.textContent = 'Web Page Components';

document.querySelector('#topics').style.color = 'red';

document.getElementById('topics').style.color = 'purple';

let list = document.querySelector('.list');

list.style.border = '3px solid black';

let paragraph = document.querySelector('p');

paragraph.style.backgroundColor = 'lightblue';
// Doing the same thing (diff colors) using css and just applying the class.
paragraph.classList.add('background');

//document.querySelector('body').classList.add('background');

const image = document.querySelector('img');

image.setAttribute('src', 'web.jpg');
image.setAttribute('alt', 'computer code on a black screen');


let selectElem = document.getElementById('webdevlist');
selectElem.addEventListener('change', function(){
    let codeValue = selectElem.value;
    console.log(codeValue);
})
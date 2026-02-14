const steps = ['one', 'two', 'three'];

const words = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];

const students = [
    {last: 'Andrus', first: 'Aaron'},
    {last: 'Masa', first:'Manny'},
    {last: 'Tanda', first: 'Tamanda'}
];

let myList = document.querySelector('#myList');

const stepsHtml = steps.map(listTemplate);

function listTemplate(item) {
    return `<li>${item}</li>`;
};

myList.innerHTML = stepsHtml.join('');

steps.forEach(function(item) {
    console.log(item);
});

steps.forEach(showStep);

function showStep(item) {
    console.log(item);
};


function convert(grade) {
    switch (grade){
        case 'A':
            points = 4;
            break;
        case 'B':
            points = 3;
            break;
        case 'C':
            points = 2;
            break;
        case 'D':
            points = 1;
            break;
        case 'F':
            points = 0;
            break;
        default:
            alert('not a valid grade');
    }
    return points;
}

let grades = ['A', 'B', 'C', 'D', 'F'];
let points;

let gpaPoints = grades.map(convert);

console.log(gpaPoints);


let totalPoints = gpaPoints.reduce(getTotal);

function getTotal(total, item) {
    return total + item;
};

console.log(totalPoints);

let gpaAverage = totalPoints / grades.length;

console.log(gpaAverage);

const shortWords = words.filter(function(word) {
    return word.length < 6;
});

console.log(shortWords);

const myArray = [12, 34, 21, 54];

const luckyNumber = 21;
let luckyIndex = myArray.indexOf(luckyNumber);
console.log(luckyIndex);

// Dynamic content
let container = document.querySelector('#studentContainer');
students.forEach(function(item){
    let name = document.createElement('div');
    name.className = 'format';
    let html = `<span>${item.first}</span>
                <span>${item.last}</span>
                <hr>`;
    name.innerHTML = html;
    container.appendChild(name);
})
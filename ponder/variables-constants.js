const PI = 3.14;
let radius = 3;

let area = PI * radius ** 2;
console.log(`The area of a circle with radius ${radius} is ${area}.`);

radius = 20;
area = PI * radius ** 2;
console.log(`The area of a circle with radius ${radius} is ${area}.`);

// type coersion. js assumes the string is a number and converts it to a number before multiplying
const one = 1;
const two = '2';

let result = one * two;
console.log(`The result of multiplying ${one} and ${two} is ${result}.`);

// type coersion does not work here, it concatonates the values
result = one + two;
console.log(`The result of adding ${one} and ${two} is ${result}.`);

// this fixes the issue by converting the string to a number before adding
result = one + Number(two);
console.log(`The result of adding ${one} and ${two} is ${result}.`);

// scope

let course = "CSE131"; //global scope
if (true) {
    let student = "John";
    console.log(course);  //works just fine, course is global
    console.log(student); //works just fine, it's being accessed within the block
}
console.log(course); //works fine, course is global
console.log(student); //does not work, can't access a block variable outside the block

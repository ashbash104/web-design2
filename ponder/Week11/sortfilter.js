nums = [12, 10, 8, 3]


const simpleList = ["oranges", "grapes", "lemons", "apples", "Bananas", "watermelons", "coconuts", "broccoli", "mango"];


const products = [
  {
    productName: "Wireless Mouse",
    price: 29.99
  },
  {
    productName: "Bluetooth Keyboard",
    price: 49.99
  },
  {
    productName: "Laptop Stand",
    price: 39.99
  }
];

const animals = [
  {
    name: "Lion",
    traits: ["brave", "strong", "fierce", "wild"]
  },
  {
    name: "Elephant",
    traits: ["large", "gentle", "smart", "wild"]
  },
  {
    name: "Fox",
    traits: ["sly", "quick", "clever", "wild"]
  },
  {
    name: "Dog",
    traits: ["loyal", "friendly", "playful", "cuddly"]
  },
  {
    name: "Cat",
    traits: ["quiet", "independent", "curious", "cuddly"]
  }
];


console.log(nums.sort(compareFn));

// This fn is needed to properly sort numbers in an array.
function compareFn(a,b) {
  if (a.price < b.price) {
    return -1;
  } else if (a.price > b.price) {
    return 1;
  }
 return 0;
}

// Without changing the first letters to lowercase, uppercase letters will be sorted before lowercase letters. This is because of the way the Unicode values are assigned to characters. In Unicode, uppercase letters have lower values than lowercase letters, so they are sorted first when using the default sort method.
let simpleSort = simpleList.sort();
console.log(simpleSort);

// This is how to properly sort words.
let lowerList = simpleList.map(item => item.toLowerCase());
let lowerSort = lowerList.sort();
console.log(lowerSort);

// Filter the properly sorted arrray of lowercase words.
let searchTerm = 'an';
let filterFruit = lowerSort.filter(searchFruit);

// .includes() is a method that checks if a string contains a specified substring. It returns true if the substring is found and false if it is not found. In this case, it checks if each item in the lowerSort array includes the searchTerm 'an'. If it does, it will be included in the filterFruit array.
function searchFruit(item) {
    return item.includes(searchTerm);
}

console.log(filterFruit);

// For the assignment this week:
// Will need to use the compare function above.

let productSort = products.sort(compareFn);
console.log(productSort);
// By adding the .key, that lets js know which item to sort by.
// function compareFn(a,b) {
//   if (a.price < b.price) {
//     return -1;
//   } else if (a.price > b.price) {
//     return 1;
//   }
//  return 0;
// }


let query = 'dog';
let filteredList = animals.filter(searchList);

function searchList(item) {
    return item.name.toLowerCase().includes(query.toLowerCase());
}

console.log(filteredList);


let queryTrait = 'wild';
let filteredTraits = animals.filter(searchTraits);

function searchTraits(item) {
    return item.traits.find(trait => trait.toLowerCase().includes(queryTrait.toLowerCase()));
}

console.log(filteredTraits);
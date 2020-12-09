// const name = "Moha"; // Constante varaibal can't change
// let age = 29; // Variabal can be change
// let hasHobbies = true;

// age = 32;

// const summarizeUser = (username, userAge, userHasHobbies) => {
//   return (
//     "Name is " +
//     username +
//     ", age is " +
//     userAge +
//     ", and " +
//     username +
//     " has hobbies: " +
//     userHasHobbies
//   );
// }; // Arrow function

// const add = (a, b) => a + b;
// const add = (a, b) => {
//   return a + b;
// };
// console.log(add(2, 4));

// const addOne = (a) => a + 1;
// console.log(addOne(3));

// const addRandom = () => 1 + 2;
// console.log(addRandom());

// function summarizeUser(username, userAge, userHasHobbies) {
//   return (
//     "Name is " +
//     username +
//     ", age is " +
//     userAge +
//     ", and " +
//     username +
//     " has hobbies: " +
//     userHasHobbies
//   );
// }

// console.log(summarizeUser(name, age, hasHobbies));
/////////////////////////////////////////////////////////////

// const person = {
//   name: "Moha",
//   age: 32,
//   greet() {
// console.log("Hello, I am " + this.name + "my age is " + this.age);
// console.log(`Hello, I am ${this.name} my age is ${this.age}`);
//   },
// };

// console.log(person);
// person.greet();

// const copiePerson = { ...person };
// console.log(copiePerson);
/////////////////////////////   Spread operator  ////////////////////////////////

// const hobbies = ["Sport", "Cooking", "Lecture", "Gaming"];
// console.log(hobbies.length);
// for (let hobby of hobbies) {
//   console.log(hobby);
//   console.log(hobby.length);
// }
// console.log(hobbies.map((hobby) => "Hobby: " + hobby));
// hobbies.push("Programming");
// const copieArray = hobbies.slice();
// const copieArray = [...hobbies];
// console.log(copieArray);
// console.log(hobbies);

// const toArray = (...args) => {
//   return args;
// };
// console.log(toArray(1, 2, 3, 4));
/////////////////////////////    Destructuring      ///////////////////////////////
// const person = {
//   name: "Moha",
//   age: 32,
//   greet() {
//     console.log("Hello, I am " + this.name + "my age is " + this.age);
//   },
// };

// const printName = ({ name }) => {
//   console.log(name);
// };

// printName(person);

// const { name, age } = person;
// console.log(name, age);

// const hobbies = ["Sport", "Cooking", "Lecture", "Gaming"];
// const [hobby1, hobby2, hobby3, hobby4] = hobbies;
// console.log(hobby1, hobby2, hobby3, hobby4);
////////////////////////////////////  Async & Promise  ////////////////////////////
const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      //   callback("Done");
      resolve("Done!");
    }, 1500);
  });
  return promise;
};

setTimeout(() => {
  console.log("Timer is done!");
  //   fetchData((text) => {
  //     console.log(text);
  //   });
  fetchData().then((text) => {
    console.log(text);
    return fetchData();
  });
}, 2000);

console.log("Hello!");
console.log("Hi!");

'use strict';

// ! only difference between constructor function & a normal function that we call the first one with the new keyword
// * only function declarations and expressions can work as constructor function
// ? constructor functions can't be created using arrow function since they lack of This keyword

const Student = function (id, major, gpa) {
  this.id = id; // initialization for class members
  this.major = major;
  this.gpa = gpa;

  // never initialize methods like this since every object will carray these method therefore performace will be affected instead we can use prototypes

  /*   this.greet = () => {
    return `student number ${this.id}, ${this.major} and ${this.gpa}`;
  }; */
};

const othman = new Student(410870, 'Statistics & Computer Science', 2.54);
const omer = new Student(410342, 'Mechanical Eng', 3.2);

// what exactly happens when we call a function using the new key word :
/*
    4 Steps : 
       1 - a new empty object {} is created
       2 - function is called and this key word will be set to this newley created object {}
       3 - newley created object linked to prototype
       4 - Function automatically returned object from the beginning
*/

console.log(othman);

// ? Prototypes :

// each and every function automatically has property called prototype, that include constructor functions.Every object that will be created by a certain constructor function will get access to all methods and properties that been define on the constructor prototype property

Student.prototype.greet = function () {
  // ! be aware not to use arrow function in these cases
  console.log(`student number ${this.id}, ${this.major} and ${this.gpa}`);
};

othman.greet();
omer.greet();
console.log(othman);

// ! any object always has access to the methods and properties from its prototype

console.log(othman.__proto__); // prototype of othman object

console.log(othman.__proto__ === Student.prototype); // ? Student.prototype is actually not the prototype of student instead it's what's gonna be used as the prototype of all the objects that are created with the student constructor function

console.log(Student.prototype.isPrototypeOf(othman));
console.log(Student.prototype.isPrototypeOf(Student));

// we can also set properties on the proptotype
Student.prototype.school = 'KTU';

console.log(othman.school);
console.log(omer.school);

console.log(othman.hasOwnProperty('gpa'));
console.log(othman.hasOwnProperty('school'));

console.log(othman.__proto__ === Student.prototype);
console.log(othman.__proto__);
console.log(othman.__proto__.__proto__);
console.log(othman.__proto__.__proto__.__proto__);

// let's see for arrays :
const arr = [1, 2, 4, 3, 2, 3];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

console.log(arr.__proto__.constructor);

// bad practice don't do that
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1.__proto__);
console.dir(h1.__proto__.__proto__);
console.dir(h1.__proto__.__proto__.__proto__);
console.dir(h1.__proto__.__proto__.__proto__.__proto__);
console.dir(h1.__proto__.__proto__.__proto__.__proto__.__proto__);
console.dir(h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__);
console.dir(
  h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
);

// Coding Challenge #1
/* 
DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h
GOOD LUCK 😀
*/

//? 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

//? 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

//? 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};
//? 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

const bmw = new Car('BMW', 120);
const mercedes = new Car('MERCEDES', 95);

bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();
bmw.brake();
bmw.accelerate();

// classes in js are just syntactic sugar

//* 1. Classes are not hoisted
//* 2. Classes are first class citizens
//* 3. Classes are executed in strict mode
class Player {
  constructor(name, lives, score = 0, health = 100) {
    this.name = name;
    this.health = health;
    this.lives = lives;
    this.score = score;
  }

  // methods define here will be created automatically on the prototype of the object
  defend = function () {
    this.score += this.randomNumber();
    this.health -= this.randomNumber();

    console.log(
      `Player defend within remain health ${this.health} and score : ${this.score}`
    );
  };

  attack = function () {
    this.score += this.randomNumber();
    this.health -= this.randomNumber();

    console.log(
      `Player defend within remain health ${this.health} and score : ${this.score}`
    );
  };

  randomNumber = () => {
    return Math.floor(Math.random() * 30) + 1;
  };

  set name(name) {
    if (name.includes(' ')) {
      this._name = name;
    } else {
      alert(`${this.name} is not a full name`);
    }
  }

  get name() {
    this.name = _name;
  }

  static hey() {
    console.log('hey bitch 😆');
  }
}

const ali = new Player('Ali ghandour', 3);
console.log(ali);

ali.attack();
ali.defend();

// setters and getters (features common in all objects in js)
// every object in js can have setter and getter properties we call these accessor properties while more normal properties are called data property

const account = {
  owner: 'Othman',
  movements: [200, 54, 239, 1200],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

account.latest = 12250;
console.log(account.latest);

/*
  ! Static Methods  :
 * Static methods are methods defined on the constructor function itself, not on the prototype.
 * They are not inherited by instances of the constructor.
 * They are often used for utility functions or methods that don't depend on the state of individual instances.
 */

Player.hey = function () {
  console.log(`👋👋👋👋`);
};

Player.hey();
// ali.hey(); there is no way that ali object could inherit hey method since it's not on the prototype

//* 3rd way of implementing prototypal inheritance using Object.create()

// Object.create() creates a new object and the prototype of that object will be the object we passed in

const PersonProto = {
  clacAge() {
    console.log(2023 - this.birthYear);
  },

  init: function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const ahmad = Object.create(PersonProto);
ahmad.name = 'Ahmad';
ahmad.birthYear = 2000;

console.log(ahmad);
ahmad.clacAge();

const matilda = Object.create(PersonProto);
console.log(matilda.__proto__ === PersonProto);

matilda.init('Matilda', 1995);
matilda.clacAge();

// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class CarC2 {
  constructor(make, speed) {
    this.make = make;
    this._speed = speed;
  }

  // instance methods
  accelerate = function () {
    this._speed += 10;
    console.log(`${this.make} is going at ${this._speed} km/h`);
  };

  brake() {
    this._speed -= 5;
    console.log(`${this.make} is going at ${this._speed} km/h`);
  }

  get speed() {
    return this._speed / 1.6;
  }

  set speed(speed) {
    this._speed = speed * 1.6;
  }
}

const ford = new CarC2('Ford', 120);
console.log(ford.speed);
ford.accelerate();
ford.accelerate();
ford.brake();
ford.speed = 50;
console.log(ford);

const PersonInherit = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonInherit.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

const StudentInherit = function (firstName, birthYear, course) {
  /*   this.firstName = firstName;
  this.birthYear = birthYear; */
  // let's use inheritance :
  PersonInherit.call(this, firstName, birthYear); //? since we're calling the constructor function within a normal call (without using new key word) the this keyword will set to undefined to fix that we may use call, bind, apply methods
  this.course = course;
};

StudentInherit.prototype = Object.create(PersonInherit.prototype);

StudentInherit.prototype.introduceMe = function () {
  console.log(`Hello my name is ${this.firstName} and I study ${this.course}`);
};

const jack = new StudentInherit(
  'Jack',
  2000,
  'JavaScript the Complete Course - 2023'
);

jack.introduceMe();
jack.calcAge();
console.dir(jack.__proto__);
console.dir(jack.__proto__.__proto__);

console.log(jack instanceof StudentInherit);
console.log(jack instanceof PersonInherit);

StudentInherit.prototype.constructor = StudentInherit;
console.dir(StudentInherit.prototype.constructor);

/* 

  *Usage of call and bind methods : 
In summary, if you need to change the context of a function and immediately execute it with that new context, use call. If you want to create a new function with a fixed context that can be called later, use bind. */

/* 


GOOD LUCK 😀
*/
const Car3 = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car3.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car3.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

/* 1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
 */

const EV = function (make, speed, charge) {
  Car3.call(this, make, speed);
  this.charge;
};
// Linking prototype :
EV.prototype = Object.create(Car3.prototype);

/* 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
 */

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

/* 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
 */

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed}, with a charge of ${this.charge}`
  );
};

/* 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉
 */

//DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

const tesla = new EV('Tesla', 120);
tesla.chargeBattery(90);
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.brake();
tesla.accelerate();

EV.prototype.constructor = EV;

console.log(tesla instanceof EV);
console.log(tesla instanceof Car3);

console.log(tesla.__proto__);
console.log(tesla.__proto__.__proto__);

//? To implement inheritance between es6 classes we need extends key word and super function

class PersonInh {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods :
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2023 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static Method :
  static key() {
    console.log('Hey there 👋');
  }
}

// class syntax hide alot of details that happens behined the scence

class StudentInh extends PersonInh {
  constructor(fullName, birthYear, major) {
    // essential to call super func first since it will set the this keyword
    super(fullName, birthYear);
    this.major = major;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.major}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2023 - this.birthYear
      } years old, but as a student I feel more like ${
        2023 - this.birthYear + 10
      }`
    );
  }
}

const jacob = new StudentInh('Jacob rodri', 2008, 'CS');
jacob.introduce();
jacob.calcAge();

//? Inheritace using Object.create :

const PersonProto2 = {
  calcAge() {
    console.log(2023 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto2);
const StudentProto2 = Object.create(PersonProto2);

StudentProto2.init = function (firstName, birthYear, course) {
  PersonProto2.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto2.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto2);

jay.init('Jay', 2012, 'CS');
jay.introduce();
jay.calcAge();

/*
! The Object.create() static method creates a new object, using an existing object as the prototype of the newly created object.
*/

// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  // private property
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} going at ${this.speed}, with a charge of ${this.#charge}`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
// console.log(rivian.#charge);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log(rivian.speedUS);

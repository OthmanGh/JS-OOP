const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

const Student = function (firstName, birthYear, major) {
  Person.call(this, firstName, birthYear);
  this.major = major;
};
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.introduce = function () {
  console.log(`Hello my name is ${this.firstName} and I study ${this.major} `);
};

const mahmoud = new Student('Mahmoud', 1995, 'Minning Eng');

console.log(mahmoud instanceof Student);
console.log(mahmoud instanceof Person);
console.log(mahmoud instanceof Object);

mahmoud.introduce();
mahmoud.calcAge();

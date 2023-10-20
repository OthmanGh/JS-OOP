// 1 - Public Fields
// 2 - Private Fields
// 3 - Public Methods
// 4 - Private Methods

// * we can think of a field as a property that will be on all instances

class Account {
  // 1) Public Fields (available on instances) :
  local = navigator.language;

  // 2) Private Fields (available on instances) :
  #movements = [];
  #pin;

  constructor(owner, currencey, pin) {
    this.owner = owner;
    this.currencey = currencey;
    // praivate property
    this.#pin = pin;
    /*     this._movements = [];
    this.local = navigator.local; */
  }

  get showMovements() {
    return this.#movements;
  }

  // 3) Public Methods ;

  deposite = function (value) {
    this.#movements.push(value);
  };

  withdraw(value) {
    this.deposite(-value);
  }

  calcMovementsSum() {
    return this.#movements.reduce((accum, money) => accum + money);
  }

  requestLoan(value) {
    if (this._approveLoan(value)) {
      this.#movements.push(value);
      console.log('Loan Approved');
    } else {
      console.log("Unfortunatly we can't processd with loan process");
    }
  }

  // 4) private Methods :
  // #approveLoan (not available for now)
  _approveLoan(value) {
    return this.calcMovementsSum() - value > 0 ? true : false;
  }
}

const acc1 = new Account('Othman', 'EUR', 1111);

acc1.deposite(250);
acc1.withdraw(140);
acc1.requestLoan(100);
//acc1._approveLoan(100);

console.log(acc1);
console.log(acc1.showMovements);

// ! acc1.#movements;

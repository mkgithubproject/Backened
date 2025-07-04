class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // Instance method — for one user
  sayHello() {
    console.log(`Hi, I'm ${this.name}`);
  }

  // Static method — for all users
  static isAdult(age) {
    return age >= 18;
  }
}

// Instance usage
const u1 = new User('Mohit', 25);
u1.sayHello(); // ✅ works
// u1.isAdult(25); // ❌ Error

// Static usage
console.log(User.isAdult(25)); // ✅ true

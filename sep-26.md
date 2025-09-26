# 📝 JavaScript Assignment – Shallow copy, deep copy, Prototypes, Destructuring, this keyword, class, function constructor 

---

## 🟢 Easy Level

### 1. Shallow vs Deep Copy
```js
let obj = { x: 1, y: { z: 2 } };
let copy1 = { ...obj };
let copy2 = structuredClone(obj);

copy1.y.z = 50;
copy2.y.z = 100;

console.log(obj.y.z); 
// Predict the output?
```
```js
50 // because spread operator do a shallow copy and it take refrence of inner object and change in obj1 will refelect to the original one.
```

---

### 2. Array Destructuring
```js
const nums = [5];
const [a=1, b=2, c=3] = nums;
console.log(a, b, c); 
// What will be logged?
```
```js
5 2 3 // it take the default value when it does not in a array
```



### 3. Object Destructuring
```js
const student = { id: 1, name: "Ravi" };
const { id, name, grade="A" } = student;
console.log(id, name, grade);
// What is grade value?
```
```js
A // it take the default value
```

---

### 4. String Reverse
- Implement a function that reverses `"JavaScript"` using the custom `.reverse()` method.  
```js
const str = "JavaScript";

String.prototype.reverse = () =>{
  return str.split('').reverse().join('');
}

console.log(str.reverse())

```


---

### 5. String Methods
```js
console.log("  hello world  ".trim().toUpperCase().slice(0,5));
// What will be the output?
```

```js
HELLO // because trim will remove the extra spcaes from it and toUpperCase will convert it into uppercase
```

---

## 🟡 Medium Level  

### 6. Prototype Inheritance
```js
function Animal(type) {
  this.type = type;
}
Animal.prototype.speak = function() {
  console.log(this.type + " makes a sound");
};

const dog = new Animal("Dog");
dog.speak();
```

- What will be logged?  
- Add another method `eat()` in prototype that logs `"Dog is eating"` and call it.  

```js
Dog Makes a sound // It will take the proto of Animal function and use in it

function Animal(type) {
  this.type = type;
}
Animal.prototype.speak = function() {
  console.log(this.type + " makes a sound";
};

Animal.protoype.eat = function(){
  console.log(this.type + " is eating")
}

const dog = new Animal("Dog");
dog.speak();
dog.eat();
```

---

### 7. `this` Keyword
```js
const person = {
  name: "Amit",
  greet: function() {
    console.log("Hello " + this.name);
  }
};

const greetFn = person.greet;
greetFn(); 
```

- Why does this print `undefined`?  
- Fix it using `.bind()`.  

```js
// It will show undefined because we are calling greatFn variable as a function it does not take this.name in it scope for fixing it we have to use a bind method.

const greetFn = person.greet.bind(person);
greetFn();
```

---

### 8. Class vs Constructor
- Write a **constructor function** and a **class** for `Book` with properties: `title`, `author`.  
- Add a method `getDetails()` in both which returns `"title by author"`.  
- Create 2 objects and call the method.  
```js
class Book {
    constructor(title, author){
        this.title = title,
        this.author = author
    }
    
    getDetails (){
        console.log(`${this.title} Written by ${this.author}`)
    }
}

let obj1 = new Book("JavaScript CookBook","Abhishek")
let obj2 = new Book("React CookBook","JaiRaj")

obj1.getDetails()
obj2.getDetails()
```

---

### 9. Array Functions
- Write code using:
  - `map()` → multiply every element in `[1,2,3,4]` by 3.  
  - `filter()` → keep only even numbers.  
  - `reduce()` → find sum of all elements. 
```js
const arr = [1,2,3,4];

console.log(arr.map(i => i*3)
               .filter(n => n%2===0)
               .reduce((acc,num)=> acc +num))
``` 

---

### 10. Ways to Create Objects
- Create an object representing a `Laptop` using all **5 ways** (Literal, `new Object()`, Constructor, Class, `Object.create()`).  
- Each object should have a property `brand` = `"HP"`. 

```js
// Using literals
let Laptop = {
    brand:"HP"
}
console.log(Laptop)

// Using new Object()
let Laptop2 = new Object()
Laptop2.brand ="HP"
console.log(Laptop2)

// Using Constructor
function Laptop3 (){
    this.brand = "HP";
}
let LaptopObj = new Laptop3()
console.log(LaptopObj)

// Using Class
class Laptop4 {
    constructor(){
        this.brand = "HP"
    }
}
let LpObje =  new Laptop4()
console.log(LpObje)

// Using Object.create
let laptop5 = Object.create(Laptop)
laptop5.brand = "HP"
console.log(laptop5)
```

---

✅ Attempt all the questions. Later, a solution sheet will be provided for verification.  
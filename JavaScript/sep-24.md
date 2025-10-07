# JavaScript Fundamentals - Assignments

## 1. Block Scope (`var`, `let`, `const`)

**Code:**
```js
{
  var x = 1;
  let y = 2;
  const z = 3;
}

console.log(x); 
console.log(y); 
console.log(z);
```

**Questions:**
- Which lines will throw errors? Why?
- Rewrite the code so all variables are accessible outside the block without errors.

**Answer:**
-Let y = 2 and const z = 3 gives an reference error because they are blocked scope which are are unable to use outside the scope
```js
  var x = 1;
  let y = 2;
  const z = 3;

console.log(x); 
console.log(y); 
console.log(z);
```

---

## 2. Temporal Dead Zone (TDZ)

**Code:**
```js
console.log(a);
console.log(b);
console.log(c);

var a = 1;
let b = 2;
const c = 3;
```

**Questions:**
- What will be logged?
- Explain why `b` and `c` behave differently than `a`.

**Answer:**
- undefined for var a and reference error for b and c.
- b and c are behave differently from a because they go to temporal dead zone when we use before intilization.

---

## 3. Closures

**Code:**
```js
function counter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const c1 = counter();
console.log(c1()); // ?
console.log(c1()); // ?
const c2 = counter();
console.log(c2()); // ?
```

**Questions:**
- What’s the output?
- Why does `c1` keep its own state separately from `c2`?

**Answer:**
- 1 2 1
- Because they store in a different variable which have different address to store their value.

---

## 4. Pass by Value vs Pass by Reference

**Code:**
```js
let num = 10;
let obj = {value: 10};

function changePrimitive(x) {
  x = 20;
}

function changeObject(y) {
  y.value = 20;
}

changePrimitive(num);
changeObject(obj);

console.log(num); // ?
console.log(obj); // ?
```

**Questions:**
- Which value changes and why?


**Answer:**
- num does not change because its value because it does not change the num value.
- obj will be chnage because it change the value by it refrence.

---

## 5. Type Coercion

**Code:**
```js
console.log(1 + "2");   
console.log("2" * 3);   
console.log(0 == false);  
console.log(0 === false); 
console.log([] == false);
console.log([] === false);
```

**Questions:**
- Predict outputs before running.
- Which ones use coercion, and which don’t?

**Answer:**
- 12 6 true false true false
- console.log(1 + "2");  use the coercion because in which + operator work as string operator so it convert the number to string.
- console.log("2" * 3);  use the coercion because in which * operator work as Mathematical operator so it convert the string to number.
- console.log(0 == false);  use the coercion because it take 0 as false value.
- console.log(0 === false); It does not use the coercion because it check the data type also.
- console.log([] == false); In which it take the blank array as a false value to compare it to the boolean value.
- console.log([] === false); It does not use the coercion becaus eit check the data type.

---

## 6. Hoisting

**Code:**
```js
sayHello();
console.log(x);

function sayHello() {
  console.log("Hello!");
}

var x = 5;
let y = 10;
```

**Questions:**
- What happens with `sayHello()`?
- What gets logged for `x`?
- What if you also add `console.log(y)` before declaration?

**Answer:**
- sayHello() will log the Hello because it function will declare the whole array at the time of hoisting.
- It will show undefined because it does not go the tbz.
- It will show reference error because it will go to the tbz when we use before intializing.



---

## 7. Objects & References

**Code:**
```js
const obj1 = { name: "Alice" };
const obj2 = obj1;
obj2.name = "Bob";

console.log(obj1.name); 
console.log(obj2.name); 

console.log(obj1 === obj2); 
```

**Questions:**
- Why does changing `obj2` also change `obj1`?

**Answer:**
- Because it has the same reference value.

---

## 8. Array Mutation vs Non-Mutation

**Code:**
```js
const arr = [1, 2, 3, 4, 5];
const a = arr.sort();
const b = arr.slice(0, 3);
console.log(a === arr); 
console.log(b === arr);
```

**Questions:**
- Which array methods mutate and which don’t?
- Why does `a === arr` return true, but `b === arr` doesn’t?


**Answer:**
- sort method it mutate because it does not return a new array it will change in the givven one.
- Because it has the same reference value and the slice will return a array and does not change the actual one.
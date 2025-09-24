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
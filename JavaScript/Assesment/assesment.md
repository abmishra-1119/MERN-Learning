
# 🧠 JavaScript 2-Hour Assessment

**Total Time:** 2 Hours  
**Total Marks:** 100  
**Format:** MCQs + Short Code + Practical Coding

---

## 🟡 Section A – MCQs & Conceptual Questions (30 Marks → 15 × 2 marks)  
**Time:** 25 minutes

1. Which of the following is **not** a valid JavaScript data type?  
   a) String b) Number c) Character d) Boolean

Answer: Character

2. What will the following code log?
```js
let x = 10;
x += "5";
console.log(typeof x);
```
a) number b) string c) undefined d) object

Answer: String

3. What is the difference between `let` and `const`? (1 line)

Answer: we can reassign a `let` but not reaasign a `const`

4. Which operator is used for **spread syntax** in JavaScript?  
a) `...` b) `??` c) `=>` d) `**`

Amswer: `...`

1. What will this code output?
```js
console.log([1, 2, 3].map(n => n * 2));
```
a) `[2, 4, 6]` b) `2,4,6` c) `undefined` d) `null`

Answer: [2,4,6]
1. Which of the following is true about arrow functions?  
a) They have their own `this`  
b) They cannot be anonymous  
c) They don’t have their own `this`  
d) They must always return explicitly

Answer: C (They don't have their own this)
1. Identify the DOM method used to select elements by class name:  
a) `querySelector('#className')`  
b) `getElementById('className')`  
c) `querySelector('.className')`  
d) `getElementsByTagName('className')`

Answer: C (querySelector('.className'))
1. What is the output?
```js
console.log(typeof null);
```
a) "null" b) "object" c) "undefined" d) "string"

Answer: "object"
1. Which string method removes whitespace from both ends?  
a) `slice()` b) `trim()` c) `split()` d) `substring()`

Answer: trim()
1.  What does `event.preventDefault()` do?

Answer: stop the default behaviour of event

2.  Which method can be used to **iterate over arrays** without creating a new array?  
a) map b) filter c) forEach d) reduce

Answer: forEach

1.  What will be the output?
```js
const arr = [1,2,3];
const newArr = [...arr, 4];
console.log(newArr);
```
a) `[1,2,3,4]` b) `[4,1,2,3]` c) `[1,[2,3],4]` d) error

Answer: [1,2,3,4]

1.  What is the difference between **synchronous** and **asynchronous** code in JS? (1-2 lines)

Answer: synchrous code run line by line and asynchronus code depends on different mothod or promises to run first and wait to execute it first.

2.  Which of the following executes first in the event loop?  
a) setTimeout callback b) Promise `.then()` c) fetch response d) DOMContentLoaded

Amswer: Promise `.then()`

1.  What is the **purpose of destructuring** in JavaScript? (1 line)

Answer: To get the particular value method of array and object without storing whole value in variable

---

## 🟢 Section B – Short Code Questions (30 Marks → 6 × 5 marks)  
**Time:** 35 minutes

1. **Conditional:**  
Write a function `checkNumber(num)` that logs:
- "Positive" if num > 0  
- "Negative" if num < 0  
- "Zero" otherwise.

Code: 
```js
function checkNumber(num) {
    if (num > 0) {
        return "Possitive"
    } else if (num < 0) {
        return 'Negative'
    } else {
        return "zero"
    }
}

console.log(checkNumber(0)) // Zero
console.log(checkNumber(15)) // Possitive
console.log(checkNumber(-15)) // Negative
```

1. **Loop & Arrow Function:**  
Write a function that takes an array of numbers and returns a **new array with each number doubled** using a `forEach` loop and arrow function.

Code:
```js
function numberDouble(arr) {
    let result = []
    arr.forEach((el) => {
        result.push(el * 2)
    })
    return result
}

console.log(numberDouble([1, 2, 3, 4, 5]))
```

1. **Object Destructuring & Template Literals:**  
```js
const user = { name: "John", age: 25 };
// Use destructuring and template literals to log:
// "John is 25 years old."
```
Code:
```js
const user = { name: "John", age: 25 };

let { name, age } = user

console.log(`${name} is ${age} years old `)
```

1. **DOM Manipulation:**  
Write code to select a button with ID `#btn` and a paragraph with class `.msg`. When the button is clicked, change the paragraph text to **“Button Clicked!”**

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Assesment</title>
</head>

<body>

    <p class="msg"> This is p Tag</p>
    <button id="btn">Click me</button>
    <script>
        const Button = document.querySelector('#btn');
        const ParaTag = document.querySelector('.msg')

        Button.addEventListener('click', () => {
            ParaTag.innerText = "Button Clicked!"
        })
    </script>
</body>

</html>
```

1. **Array Methods:**  
Given:
```js
const numbers = [1, 2, 3, 4, 5];
```
- Use `filter` to get even numbers.  
- Use `reduce` to get the sum of numbers.  
- Log both results.

Code: 
```js
const numbers = [1, 2, 3, 4, 5];

console.log(numbers.filter((el) => el % 2 === 0)) // [2,4]

console.log(numbers.reduce((acc, el) => acc + el)) // 15
```

1. **Async/Await:**  
Write a function that fetches data from `https://jsonplaceholder.typicode.com/todos/1` using **async/await** and logs the JSON response.

Code: 
```js
async function fethData() {
    try {
        let res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        return res.json()
    } catch (e) {
        console.error(e)
    }
}

const fetchedData = await fethData()
console.log(fetchedData);
```

---

## 🔵 Section C – Practical Coding Questions (40 Marks → 2 × 20 marks)  
**Time:** 60 minutes

### 1. DOM + Callbacks + Array Methods (20 Marks)

Implement a small webpage that:
- Has an input field and a button “Add Task”.  
- When the user enters a string and clicks the button → the string should be added to a list below.  
- Use `querySelector`, `addEventListener`, and `createElement`.  
- Use `map` or `forEach` to render the list after each addition.

**Marking Scheme:**
- DOM selection & event listener → 5  
- Correct rendering logic → 5  
- Array method usage → 5  
- Clean code & readability → 5

### 2. Async + Event Loop + Fetch (20 Marks)

Write a script that:
- Logs “Start”  
- Uses `setTimeout` with 0 ms to log “Timeout”  
- Uses a Promise that resolves immediately to log “Promise resolved”  
- Fetches `https://jsonplaceholder.typicode.com/todos/1` and logs `"Data fetched"`.  
- Logs “End” at the end.

**Marking Scheme:**
- Correct order of console logs → 10  
- Correct usage of Promise + setTimeout + async → 5  
- Fetch usage and error handling → 5

Code:
```js
console.log("start");

setTimeout(() => {
    console.log("TimeOut")
}, 0)

setTimeout(() => {
    Promise.resolve(console.log("promise Resolved"))
}, 0);

// Promise.resolve(console.log("Promise Resolved"))

async function fethData() {
    try {
        let res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        console.log("Data Fetched")
        return res.json()
    } catch (e) {
        console.error(e)
    }
}
const fetchedData = await fethData()
console.log(fetchedData);

console.log("End")

Output: 
start
TimeOut
promise
Data Fetched
{ userId: 1, id: 1, title: 'delectus aut autem', completed: false }
End

```

---

## 🧾 Mark Distribution

| Section | Type             | Marks | Time    |
| ------- | ---------------- | ----- | ------- |
| A       | MCQ / Conceptual | 30    | 25 min  |
| B       | Short Code       | 30    | 35 min  |
| C       | Practical Coding | 40    | 60 min  |
|         | **Total**        | 100   | 120 min |
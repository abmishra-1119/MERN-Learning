# 🚀 JavaScript Async & Event Loop -- Assignment

This assignment will help you understand how the **JavaScript Event
Loop** works and how asynchronous tasks like `setTimeout`, `Promise`,
and `fetch()` are handled. You will also build a small project with
**loading states** and **skeleton UI**.

------------------------------------------------------------------------

## 📌 Part 1: Event Loop & Execution Order

1.  Predict the output of the following code **before running it**:

``` js
console.log('1');

setTimeout(() => console.log('timeout 1'), 0);

Promise.resolve().then(() => console.log('promise 1'));

console.log('2');

setTimeout(() => console.log('timeout 2'), 0);

Promise.resolve().then(() => console.log('promise 2'));

console.log('3');

Output:
1
2
3
promise 1
promise 2
timeout 1
timeout 2
```

-   Question: Why do promises run before `setTimeout`?
-   Answer: Because promises go on the microtask which has higher priority than the setTimeout which are in macrotask so basically promises will run first beacause it run all microtasks and go to the macrotask.

------------------------------------------------------------------------

2.  Analyze this code and explain the exact order of execution:

``` js
async function test() {
  console.log('A');
  await Promise.resolve();
  console.log('B');
}
test();
console.log('C');

Output:
A
C
B

First it declare the fnction and then call it when we call it. It trigger the log "A" first then see the await keyword then send it to the microtasks and then it wait there at that time it will log the "C" and after all execution end it get the resolved promise in main stack then it log the "B"
```

-   Question: What happens inside the **microtask queue** when `await`
    is used?
-   Answer: When await is used it send the promise to the microstack and hold the all process of their scope and wait until to resolve the promise first then the remaining process of their scope.

------------------------------------------------------------------------

## 📌 Part 2: Timers & Blocking

1.  Run this code and measure the delay:

``` js
console.time('timer');
setTimeout(() => {
  console.timeEnd('timer');
}, 2000);

for (let i = 0; i < 1e9; i++) {} // heavy loop

Output: It wil take 2 sec or greater than it depend upon a computer computation speed.

```

-   Question: Why does the `setTimeout` callback run **later than 2s**?
-   Answer: The setTimeout only insure that you function is not run before the given time then it's time depends upon the how much time take to empty the call stack(it will wait until all process are executed from call stack)

------------------------------------------------------------------------

## 📌 Part 3: Callbacks vs Promises vs Async/Await

1.  Write the same logic in 3 different ways:
    -   Using `setTimeout(callback)`
    -   Using `Promise.then`
    -   Using `async/await`

Logic: Wait for 2 seconds, then print `"Done!"`.
```js
setTimeout(()=>{
    console.log("TimeOut Done")
},2000)

Promise.resolve().then(()=>{
    console.log('Promise')
    setTimeout(()=>{
    console.log("Promise TimeOut Done")
},2000)
})

async function Done(){
    console.log("Async")
    await setTimeout(()=>{
    console.log("Async TimeOut Done")
},2000)
}

Done()

Output: 
Async
Promise
TimeOut Done
Async TimeOut Done
Promise TimeOut Done

```

------------------------------------------------------------------------

## 📌 Part 4: Mini Project -- Fetch with Loading & Skeleton

👉 Create an `index.html` file with: - A button `"Load Users"`. - A
container `<div id="users"></div>`.

When button is clicked: 1. Show **skeleton cards** (gray boxes). 2.
Fetch data from <https://jsonplaceholder.typicode.com/users>. 3. Replace
skeletons with actual user data (name, email, phone). 4. If fetch fails,
show an error message `"Failed to load data"`.

**Extra:** - Add a `"Reload"` button to refetch users. - Show a
`"Loading..."` text before skeletons appear.

------------------------------------------------------------------------

## 📌 Part 5: Debugging

Given this snippet, fix it so that it prints in the correct order:\
Expected: `1 → 2 → 3 → 4`

``` js
console.log(1);

setTimeout(() => console.log(2), 0);

Promise.resolve().then(() => console.log(3));

console.log(4);
```

Correct Order:
```js
console.log(1);// This will execute first 

setTimeout(() => console.log(4), 0); // This will go in the web Api (Macrotask) -> Then it will run fourth

Promise.resolve().then(() => console.log(3)); // This will go in the microtask -> Then it will execute Third

console.log(2); // This is will execute second
```

------------------------------------------------------------------------

## ✅ Deliverables

-   Write predictions **before running** each snippet.
-   Submit:
    -   One `index.html` + `script.js` for the mini-project.
    -   A `.md` or `.txt` file with answers/explanations.

------------------------------------------------------------------------

💡 **Hint:** Use [latentflip.com/loupe](http://latentflip.com/loupe) to
visualize the Event Loop.
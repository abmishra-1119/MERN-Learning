/**
 * Event loop
 * stack
 * Web api
 * Queue -> micro, macro
 * 
 * Example -> http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7CgoK!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D
 */
// console.log('1')
// async function fn(){
//     console.log(2) // 
//     setTimeout(() => console.log('timeout 2'), 0) // web api ->  async
//     await Promise.resolve().then(() => console.log(3)) // web api -> async -> priority
//     console.log(4)
// }

// fn()
// setTimeout(() => console.log('timeout'), 0) // web api -> async
// console.log(5)  12543t2t
// Vai -> 1, 2, 3, 5, 4
// Pra -> 1, 5, 2, 4, 3
// Gau -> 1, 5, 2, 4, 3
// Abhi -> 1, 5, 2, 3, 4
// jay -> 1, 5, 2, 4, 3
// Piu -> 1, 5, 2, 4, 3

// console.time('start')
// setTimeout(() => { // queue
//     console.log('Hey i am timout print after')
//     console.timeEnd('start')
// }, 2000)
// for(let i = 0; i< 10000000000; i++){} // call stack

// Promise.resolve().then(() => console.log('Promise'))
// setTimeout(() => {console.log('timeout')}, 0)
// setTimeout(() => {console.log('timeoutn 2')}, 0)
// Promise.resolve().then(() => console.log('Promise 2'))

// Syncrous not parallel
// Promise().resolve(() => {
// }).then((res) => {
//     const a = res
//     return a
// }).then((res) => {
//     const a = res
//     return a
// }).then(() => {

// }).then(() => {

// }).then(() => {

// }) // -> then chaining
// Resolution
// async function fn(r){ // return promise
//     const a = await r
//     const b = await a
//     const c = await b
//     // etc....

//     return c
// }

// const a = await fn(2) // await works in async fn 
// console.log(a)

// timers
// console.time('start')
// setTimeout(() => { // queue
//     console.log('Hey i am timout print after')
//     console.timeEnd('start')
// }, 2000)
// for(let i = 0; i< 10000000000; i++){} // call stack

// callbacks
// setTimeout(callback, 2000) // web api

// const setTimeout(fn, delay){
//     // code 
//     // wait dealy
//     fn()
// }
// function fn(fn1){
//     fn1()
// }
// fn(() => {console.log("1")})

// getFirstChild // parent -> callBack function
// getFirstChild(data){
//     return data[0]
// }
// handleClick(){ // child -> decleration
//     data.filter()
//     getFirstChild(data) // callback
// }

// const fetchBtn = document.querySelector('#fetchBtn')
// fetchBtn.addEventListener('click', async () => {
//     const res = await fetch('https://jsonplaceholder.typicode.com/todos');
//     const data = await res.json();

//     console.log('data', data)

   
// })

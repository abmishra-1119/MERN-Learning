// template literals
// addEventListener
// getElementBy | Id | Class | Tagname
const counter = document.getElementById('count')
const incBtn = document.getElementById('inc')
const decBtn = document.getElementById('dec')
incBtn.addEventListener('click', () => {
    const { innerText = "" } = counter
    // + => Number() => shorthand property
    // counter.innerText = +innerText + 1 // This is inceasing counter by 2
    counter.innerText = +innerText + 2 // It increases the value by 2.
})

decBtn.addEventListener('click', () => {
    const { innerText = "" } = counter
    // counter.innerText = +innerText - 1
    counter.innerText = +innerText - 2 // It decreses the value by 2
})

// removeEventListener
let id;
const timer = document.getElementById('timer')
const start = document.getElementById('timerStart')
const stop = document.getElementById('timerRemove')
const timerFunction = () => {
    if (id) clearInterval(id)
    id = setInterval(() => {
        const { innerText = "" } = timer
        // + => Number() => shorthand property
        timer.innerText = +innerText + 1
    }, 1000)
}
start.addEventListener('click', timerFunction)

stop.addEventListener('click', () => {
    if (id) clearInterval(id);
    // passing the ref of function
    start.removeEventListener('click', timerFunction)
})

// H.W
// Add a button to add the listener again and timer will continue where stops


// querySelector | querySelectorAll
// const lists = document.querySelectorAll('.list');
// lists.forEach(li => {
//     li.addEventListener('click', () => {
//         console.log(`clicked li: ${li.innerText}`)
//     })
// })

// Event Delegation
// dom light weight
const ul = document.querySelector('#parent-list')
ul.addEventListener('click', (e) => {
    const { target: { classList = [] } } = e
    // @TODO: why includes not working on classList
    if (classList[0] === 'list') {
        console.log(`clicked li: ${e.target.innerText}`)
    }
})

const myForm = document.querySelector('#myForm');
myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(`Your typed value is: ${e.target.input.value}`)
})

const outerBox = document.querySelector('#outer-box');
const innerBox = document.querySelector('#inner-box');
outerBox.addEventListener('click', () => {
    console.log("Clicked outerBox")
})
innerBox.addEventListener('click', (e) => {
    e.stopPropagation()
    console.log("Clicked innerBox box")
})

const toggleBtn = document.querySelector('#toggle-btn');
const toggleText = document.querySelector('#toggle-text');
toggleBtn.addEventListener('click', () => {
    if (toggleText.style.visibility === 'hidden') {
        toggleText.style.visibility = 'visible'
    } else {
        toggleText.style.visibility = 'hidden'
    }
})
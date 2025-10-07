const Input = document.querySelector('#input')
const Button = document.querySelector('#btn')
const Lists = document.querySelector('#lists')
const LiArr = []
Button.addEventListener('click', () => {
    const Li = document.createElement('li')
    Li.classList.add('liTag')
    Li.innerText = Input.value
    Lists.appendChild(Li)
    LiArr.push(Li)
    Input.value = ""
})

// Using Array Methods

Button.addEventListener('click', () => {
    LiArr.forEach((el) => {
        Lists.appendChild(el)
    })
})
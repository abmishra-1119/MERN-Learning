const FetchBtn = document.querySelector('#fetchBtn')
const Output = document.querySelector('#output')
const ReloadBtn = document.querySelector('#reloadBtn')

const ShowSkeleton = async() => {
    Output.innerHTML = ''
    for (let i = 0; i < 4; i++) {
        const card = document.createElement('div')
        card.classList.add('output')
        card.innerHTML = `<div class="card">
                            <div class="skeleton" style="width: 80%"></div>
                            <div class="skeleton" style="width: 60%"></div>
                            <div class="skeleton" style="width: 90%"></div>
                        </div>`
        Output.appendChild(card)
    }
}

const FetchData = async() => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        const OnlyTen = data.slice(0, 10)
        Output.innerHTML = ''
        OnlyTen.forEach((el, index) => {
            const card = document.createElement('div')
            card.classList.add('output')
            const { name, email, phone } = el
            card.innerHTML = `<div class="card" key = ${index}>
                                <div class= 'field'>Name: ${name}</div>
                                <div class="field">Email: ${email}</div>
                                <div class="field">Phone: ${phone}</div>
                            </div>`
            Output.appendChild(card)
            console.log(el, index)
        })
    } catch (e) {
        alert("Failed to load Data", e)
    }
}

FetchBtn.addEventListener('click', async() => {
    FetchData()
})

ReloadBtn.addEventListener('click', async() => {
    Output.innerHTML = 'Loading....'
    await ShowSkeleton()
    FetchData()
})
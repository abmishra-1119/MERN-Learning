const Counter = document.querySelector('#counter')
const Increment = document.querySelector('#inc')
const Decrement = document.querySelector('#dec')
const Reset = document.querySelector('#reset')

Increment.addEventListener('click', () => {
    const { innerText = "" } = Counter
    Counter.innerText = +innerText + 2
})

Decrement.addEventListener('click', () => {
    const { innerText = "" } = Counter
    Counter.innerText = +innerText - 2
})

Reset.addEventListener('click', () => {
    Counter.innerText = 0
})


const Timer = document.querySelector('#timer')
const TimerIncrement = document.querySelector('#timeInc')
const TimerDecrement = document.querySelector('#timeDec')
const TimerReset = document.querySelector('#timeReset')
const TimerStop = document.querySelector('#timeStop')
let TimerId;

const TimeInc = () => {
    if (TimerId) clearInterval(TimerId)

    TimerId = setInterval(() => {
        const { innerText } = Timer
        Timer.innerText = +innerText + 1
    }, 1000)
}

const TimeDec = () => {
    if (TimerId) clearInterval(TimerId)

    TimerId = setInterval(() => {
        const { innerText } = Timer
        Timer.innerText = +innerText - 1
    }, 1000)
}

TimerIncrement.addEventListener('click', TimeInc)

TimerDecrement.addEventListener('click', TimeDec)

TimerReset.addEventListener('click', () => {
    if (TimerId) clearInterval(TimerId)
    Timer.innerText = 0
})

TimerStop.addEventListener('click', () => {
    if (TimerId) clearInterval(TimerId)
})

let Lists = document.querySelector('#lists')
const AddInList = document.querySelector('#addInList')
    // const AllLi = document.querySelectorAll('.li')

AddInList.addEventListener('click', () => {
    const AllLi = document.querySelectorAll('.li')
    const newLi = document.createElement('li')
    newLi.innerText = AllLi.length + 1
    Lists.appendChild(newLi)
    Lists = document.querySelector('#lists')
})

Lists.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        console.log(e.target.innerText)
    }
})


const InputForm = document.querySelector('#input-form')
const FromMsg = document.querySelector('#form-msg')

InputForm.addEventListener('submit', (e) => {
    e.preventDefault()
    FromMsg.innerText = e.target.input.value
    console.log(e.target.input.value)
    e.target.input.value = ""
})

const ToggleButton = document.querySelector('#toggle-botton');
const Para = document.querySelector('#para')

ToggleButton.addEventListener('click', () => {
    if (Para.style.display !== 'none') {
        Para.style.display = 'none'
        ToggleButton.innerText = "Show"
    } else {
        Para.style.display = 'block'
        ToggleButton.innerText = "Hide"
    }
})


const OuterBox = document.querySelector('.outer-box')
const InnerBox = document.querySelector('.inner-box')
const InnerInerBox = document.querySelector('.inner-inner-box')


OuterBox.addEventListener('click', () => {
    console.log("outer box")
})

InnerBox.addEventListener('click', (e) => {
    e.stopPropagation()
    console.log("inner box")
})

InnerInerBox.addEventListener('click', (e) => {
    // e.stopPropagation()
    console.log("inner inner box")
})



const ParaLists = document.querySelector('#para-lists')
const AddParaBtn = document.querySelector('#add-para-btn')
const RemoveParaBtn = document.querySelector('#remove-para-btn')


AddParaBtn.addEventListener('click', () => {
    let = newPara = document.createElement('p')
    newPara.innerText = "Hello World"

    ParaLists.appendChild(newPara)
})

RemoveParaBtn.addEventListener('click', () => {
    ParaLists.removeChild(ParaLists.lastElementChild)
})


const ChangeColor = document.querySelector('#color-change')
const ChangeColorBtn = document.querySelector('.color-change-btn')
const ShowAfter = document.querySelector('#show-p-in-5-sec')


const ChangeIntervelId = setInterval(() => {
    if (ChangeColor.style.backgroundColor === 'yellow') {
        ChangeColor.style.backgroundColor = "red"
        console.log("Color-Change");

    } else {
        ChangeColor.style.backgroundColor = "yellow"
        console.log("Color-Change");
    }
}, 2000);


ChangeColorBtn.addEventListener('click', () => {
    clearInterval(ChangeIntervelId)
    console.log("Color-Change-Stop");
})

setTimeout(() => {
    let newp = document.createElement('p');
    newp.innerText = "Hello after 5 sec"
    ShowAfter.appendChild(newp)
    console.log("Hello after 5 sec");
}, 5000);


const BtnGreen = document.querySelector('#btn-green')
const BtnRed = document.querySelector('#btn-red')
const BtnBlue = document.querySelector('#btn-blue')
const BtnWhite = document.querySelector('#btn-white')


const BgColorChange = (element) => {
    let color = element.getAttribute("data-color");
    document.body.style.backgroundColor = color
}

BtnGreen.addEventListener('click', () => BgColorChange(BtnGreen))
BtnRed.addEventListener('click', () => BgColorChange(BtnRed))
BtnBlue.addEventListener('click', () => BgColorChange(BtnBlue))
BtnWhite.addEventListener('click', () => BgColorChange(BtnWhite))



const IncreaseSize = document.querySelector('#inc-size')
const DecreaseSize = document.querySelector('#dec-size')
const ParaTag = document.querySelector('#para-tag')

IncreaseSize.addEventListener('click', () => {
    const computedStyle = window.getComputedStyle(ParaTag);
    const fontSize = computedStyle.getPropertyValue('font-size')
        // console.log(parseInt(fontSize) + 2)
    ParaTag.style.fontSize = `${parseInt(fontSize) + 2}px`

})

DecreaseSize.addEventListener('click', () => {
    const computedStyle = window.getComputedStyle(ParaTag);
    const fontSize = computedStyle.getPropertyValue('font-size')
        // console.log(parseInt(fontSize) - 2)
    ParaTag.style.fontSize = `${parseInt(fontSize) - 2}px`

})

const AgeForm = document.querySelector('#age-form')
const AgeMsg = document.querySelector('#age-msg')

AgeForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (parseInt(e.target.input.value) > 1 && parseInt(e.target.input.value) < 100) {
        AgeMsg.innerText = `${e.target.input.value} is valid age`

    } else {
        AgeMsg.innerText = `${e.target.input.value} is Invalid age`

    }
    console.log(parseInt(e.target.input.value))
    e.target.input.value = ""
})


const PTag = document.querySelector('#p-tag')
const NewParaBtn = document.querySelector('#new-para')

NewParaBtn.addEventListener('click', () => {
    PTag.innerText = "This is new paragarph"
})



let Listx = document.querySelector('#listx')
const AddInListX = document.querySelector('#addInListX')
    // const AllLix = document.querySelectorAll('.list')

AddInListX.addEventListener('click', () => {
    let AllLix = document.getElementsByClassName('list')
    let newLix = document.createElement('li')
    newLix.innerText = `Item ${AllLix.length + 1}`
    console.log(AllLix);

    Listx.appendChild(newLix)
    Listx = document.querySelector('#lists')
})


const ToggleButton2 = document.querySelector('#toggle-botton2');
const Para2 = document.querySelector('#para2')

ToggleButton2.addEventListener('click', () => {
    if (Para2.style.display !== 'none') {
        Para2.style.display = 'none'
        ToggleButton2.innerText = "Show"
    } else {
        Para2.style.display = 'block'
        ToggleButton2.innerText = "Hide"
    }
})



const BtnGreen2 = document.querySelector('#btn-green2')
const BtnRed2 = document.querySelector('#btn-red2')
const BtnBlue2 = document.querySelector('#btn-blue2')
const BtnWhite2 = document.querySelector('#btn-white2')


const BgColorChange2 = (element) => {
    let color = element.getAttribute("data-color");
    document.body.style.backgroundColor = color
}

BtnGreen2.addEventListener('click', () => {
    document.body.style.backgroundColor = "green"
})
BtnRed2.addEventListener('click', () => document.body.style.backgroundColor = "red")
BtnBlue2.addEventListener('click', () => document.body.style.backgroundColor = "blue")
BtnWhite2.addEventListener('click', () => document.body.style.backgroundColor = "white")
// =================== Counter ===================
const Counter = document.querySelector("#counter");
const Increment = document.querySelector("#inc");
const Decrement = document.querySelector("#dec");
const Reset = document.querySelector("#reset");

// Increment counter by 2
Increment.addEventListener("click", () => {
    const { innerText = "" } = Counter;
    Counter.innerText = +innerText + 2;
});

// Decrement counter by 2
Decrement.addEventListener("click", () => {
    const { innerText = "" } = Counter;
    Counter.innerText = +innerText - 2;
});

// Reset counter to 0
Reset.addEventListener("click", () => {
    Counter.innerText = 0;
});

// =================== Timer ===================
const Timer = document.querySelector("#timer");
const TimerIncrement = document.querySelector("#timeInc");
const TimerDecrement = document.querySelector("#timeDec");
const TimerReset = document.querySelector("#timeReset");
const TimerStop = document.querySelector("#timeStop");
let TimerId;

// Start increasing timer every 1 second
const TimeInc = () => {
    if (TimerId) clearInterval(TimerId);
    TimerId = setInterval(() => {
        const { innerText } = Timer;
        Timer.innerText = +innerText + 1;
    }, 1000);
};

// Start decreasing timer every 1 second
const TimeDec = () => {
    if (TimerId) clearInterval(TimerId);
    TimerId = setInterval(() => {
        const { innerText } = Timer;
        Timer.innerText = +innerText - 1;
    }, 1000);
};

// Bind timer buttons
TimerIncrement.addEventListener("click", TimeInc);
TimerDecrement.addEventListener("click", TimeDec);

// Reset timer to 0
TimerReset.addEventListener("click", () => {
    if (TimerId) clearInterval(TimerId);
    Timer.innerText = 0;
});

// Stop timer without resetting
TimerStop.addEventListener("click", () => {
    if (TimerId) clearInterval(TimerId);
});

// =================== Event Delegation ===================
const Lists = document.querySelector("#lists");
const AddInList = document.querySelector("#addInList");
const whBoxClick = document.querySelector('#wh-box-click')

// Add new <li> dynamically
AddInList.addEventListener("click", () => {
    const AllLi = document.querySelectorAll(".li");
    const newLi = document.createElement("li");
    newLi.className = "li";
    newLi.innerText = AllLi.length + 1;
    Lists.appendChild(newLi);
});

// Event delegation -> click on any li prints its text
Lists.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        whBoxClick.innerText = e.target.innerText
        console.log(e.target.innerText);
    }
});

// =================== Form preventDefault ===================
const InputForm = document.querySelector("#input-form");
const FromMsg = document.querySelector("#form-msg");

// Prevent form reload, display input value
InputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    FromMsg.innerText = e.target.input.value;
    console.log(e.target.input.value);
    e.target.input.value = "";
});

// =================== Toggle Button ===================
const ToggleButton = document.querySelector("#toggle-botton");
const Para = document.querySelector("#para");

// Toggle show/hide paragraph
ToggleButton.addEventListener("click", () => {
    if (Para.style.display !== "none") {
        Para.style.display = "none";
        ToggleButton.innerText = "Show";
    } else {
        Para.style.display = "block";
        ToggleButton.innerText = "Hide";
    }
});

// =================== Stop Propagation ===================
const OuterBox = document.querySelector(".outer-box");
const InnerBox = document.querySelector(".inner-box");
const InnerInerBox = document.querySelector(".inner-inner-box");

// Parent box click
OuterBox.addEventListener("click", () => {
    console.log("outer box");
});

// Child box click (stops bubbling to parent)
InnerBox.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("inner box");
});

// Inner-most box click (no stopPropagation here)
InnerInerBox.addEventListener("click", (e) => {
    console.log("inner inner box");
});

// =================== Create & Remove DOM Elements ===================
const ParaLists = document.querySelector("#para-lists");
const AddParaBtn = document.querySelector("#add-para-btn");
const RemoveParaBtn = document.querySelector("#remove-para-btn");

// Add new <p>
AddParaBtn.addEventListener("click", () => {
    let newPara = document.createElement("p");
    newPara.innerText = "Hello World";
    ParaLists.appendChild(newPara);
});

// Remove last <p>
RemoveParaBtn.addEventListener("click", () => {
    ParaLists.removeChild(ParaLists.lastElementChild);
});

// =================== setTimeout vs setInterval ===================
const ChangeColor = document.querySelector("#color-change");
const ChangeColorBtn = document.querySelector(".color-change-btn");
const ShowAfter = document.querySelector("#show-p-in-5-sec");

// Array of colors to cycle through
const colors = ["yellow", "red", "green", "blue", "purple", "orange"];
let colorIndex = 0;

// Change color every 2 seconds
const ChangeIntervelId = setInterval(() => {
    ChangeColor.style.backgroundColor = colors[colorIndex];
    console.log("Color-Change:", colors[colorIndex]);

    // Move to next color (loop back to start when done)
    colorIndex = (colorIndex + 1) % colors.length;
}, 2000);

// Stop color change
ChangeColorBtn.addEventListener("click", () => {
    clearInterval(ChangeIntervelId);
    console.log("Color-Change-Stop");
});

// Show <p> after 5 seconds
setTimeout(() => {
    let newp = document.createElement("p");
    newp.innerText = "Hello after 5 sec";
    ShowAfter.appendChild(newp);
    console.log("Hello after 5 sec");
}, 5000);


// =================== Dataset Attributes ===================
const BtnGreen = document.querySelector("#btn-green");
const BtnRed = document.querySelector("#btn-red");
const BtnBlue = document.querySelector("#btn-blue");
const BtnWhite = document.querySelector("#btn-white");

// Change body background based on dataset color
const BgColorChange = (element) => {
    // let color = element.getAttribute("data-color");
    let color = element.dataset.color;
    console.log(color);

    document.body.style.backgroundColor = color;
};

BtnGreen.addEventListener("click", () => BgColorChange(BtnGreen));
BtnRed.addEventListener("click", () => BgColorChange(BtnRed));
BtnBlue.addEventListener("click", () => BgColorChange(BtnBlue));
BtnWhite.addEventListener("click", () => BgColorChange(BtnWhite));

// =================== Style Manipulation ===================
const IncreaseSize = document.querySelector("#inc-size");
const DecreaseSize = document.querySelector("#dec-size");
const ParaTag = document.querySelector("#para-tag");

// Increase font size
IncreaseSize.addEventListener("click", () => {
    const computedStyle = window.getComputedStyle(ParaTag);
    const fontSize = computedStyle.getPropertyValue("font-size");
    ParaTag.style.fontSize = `${parseInt(fontSize) + 2}px`;
});

// Decrease font size
DecreaseSize.addEventListener("click", () => {
    const computedStyle = window.getComputedStyle(ParaTag);
    const fontSize = computedStyle.getPropertyValue("font-size");
    ParaTag.style.fontSize = `${parseInt(fontSize) - 2}px`;
});

// =================== Input Validation ===================
const AgeForm = document.querySelector("#age-form");
const AgeMsg = document.querySelector("#age-msg");

// Validate age between 1 and 100
AgeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (
        parseInt(e.target.input.value) > 1 &&
        parseInt(e.target.input.value) < 100
    ) {
        AgeMsg.innerText = `${e.target.input.value} is valid age`;
    } else {
        AgeMsg.innerText = `${e.target.input.value} is Invalid age`;
    }
    console.log(parseInt(e.target.input.value));
    e.target.input.value = "";
});

// =================== Change Text Content ===================
const PTag = document.querySelector("#p-tag");
const NewParaBtn = document.querySelector("#new-para");

const paraArray = [
    "This is the first new paragraph.",
    "Here comes the second one with some extra text.",
    "Now showing the third paragraph for testing.",
    "Another paragraph appears here.",
    "Final one in the list — after this it will restart.",
];

let currentIndex = 0;

// Change existing paragraph text
NewParaBtn.addEventListener("click", () => {
    PTag.innerText = paraArray[currentIndex];
    currentIndex = (currentIndex + 1) % paraArray.length;
});

// =================== Add List Item ===================
let Listx = document.querySelector("#listx");
const AddInListX = document.querySelector("#addInListX");

// Add new list item dynamically
AddInListX.addEventListener("click", () => {
    let AllLix = document.getElementsByClassName("list");
    let newLix = document.createElement("li");
    newLix.className = "list";
    newLix.innerText = `Item ${AllLix.length + 1}`;
    Listx.appendChild(newLix);
});

// =================== Hide/Show Element ===================
const ToggleButton2 = document.querySelector("#toggle-botton2");
const Para2 = document.querySelector("#para2");

// Toggle paragraph visibility
ToggleButton2.addEventListener("click", () => {
    if (Para2.style.visibility === "hidden") {
        Para2.style.visibility = "visible";
        ToggleButton2.innerText = "Show";
    } else {
        Para2.style.visibility = "hidden";
        ToggleButton2.innerText = "Hide";
    }
});

// =================== Background Color Switcher ===================
const BtnGreen2 = document.querySelector("#btn-green2");
const BtnRed2 = document.querySelector("#btn-red2");
const BtnBlue2 = document.querySelector("#btn-blue2");
const BtnWhite2 = document.querySelector("#btn-white2");

// Change body background with direct colors
BtnGreen2.addEventListener("click", () => {
    document.body.style.backgroundColor = "green";
});
BtnRed2.addEventListener("click", () => (document.body.style.backgroundColor = "red"));
BtnBlue2.addEventListener("click", () => (document.body.style.backgroundColor = "blue"));
BtnWhite2.addEventListener("click", () => (document.body.style.backgroundColor = "white"));
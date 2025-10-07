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
let Lists = document.querySelector("#lists");
const AddInList = document.querySelector("#addInList");
const whBoxClick = document.querySelector("#wh-box-click");

// Helper to log messages
const logMsg2 = (msg) => {
    let p = document.createElement("p");
    p.innerText = msg;
    whBoxClick.appendChild(p);
};

// Add new list item
AddInList.addEventListener("click", () => {
    const AllLi = document.querySelectorAll("#lists li");
    const newLi = document.createElement("li");
    newLi.innerText = AllLi.length + 1;
    Lists.appendChild(newLi);
    logMsg2(`New list item added: ${newLi.innerText}`);
});

// Event delegation to detect which box clicked
Lists.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        // whBoxClick.innerText = `You clicked Box ${e.target.innerText}`;
        logMsg2(`Clicked on list box ${e.target.innerText}`);
        e.stopPropagation();
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

// Create a log container for stop propagation
const propagationLog = document.createElement("div");
propagationLog.id = "propagation-log";
OuterBox.parentElement.appendChild(propagationLog);

const logPropagation = (msg) => {
    let p = document.createElement("p");
    p.innerText = msg;
    propagationLog.appendChild(p);
};

// Parent box click
OuterBox.addEventListener("click", () => {
    logPropagation("Outer Box clicked (propagation reached here).");
});

// Child box click (stops bubbling to parent)
InnerBox.addEventListener("click", (e) => {
    e.stopPropagation();
    logPropagation("Inner Box clicked (propagation STOPPED here).");
});

// Inner-most box click
InnerInerBox.addEventListener("click", () => {
    logPropagation(
        "Inner Inner Box clicked (event handled here, will bubble unless stopped)."
    );
});

// =================== Create & Remove DOM Elements ===================
const ParaLists = document.querySelector("#para-lists");
const AddParaBtn = document.querySelector("#add-para-btn");
const RemoveParaBtn = document.querySelector("#remove-para-btn");

// Helper to re-number all paragraphs
function renumberParas() {
    const allParas = ParaLists.querySelectorAll("p");
    allParas.forEach((p, index) => {
        // keep only text (remove old button text)
        const btn = p.querySelector("button");
        p.firstChild.textContent = `Hello World ${index + 1} `;
        if (!btn) {
            const delBtn = document.createElement("button");
            delBtn.innerText = "Delete";
            delBtn.style.marginLeft = "10px";
            delBtn.addEventListener("click", () => {
                p.remove();
                // renumberParas(); // re-number after deletion
            });
            p.appendChild(delBtn);
        }
    });
}

// Add new <p> with delete button
AddParaBtn.addEventListener("click", () => {
    let newPara = document.createElement("p");
    newPara.innerText = `Hello World`; // number added later
    ParaLists.appendChild(newPara);
    renumberParas();
});

// Remove last <p>
RemoveParaBtn.addEventListener("click", () => {
    if (ParaLists.lastElementChild) {
        ParaLists.removeChild(ParaLists.lastElementChild);
        // renumberParas();
    }
});

// Initial renumber for the first <p>
renumberParas();

// =================== setTimeout vs setInterval ===================
const ChangeColor = document.querySelector("#color-change");
const StartColorBtn = document.querySelector("#start-color-btn");
const StopColorBtn = document.querySelector("#stop-color-btn");
const StartTimeoutBtn = document.querySelector("#start-timeout-btn");
const CancelTimeoutBtn = document.querySelector("#cancel-timeout-btn");
const ShowAfter = document.querySelector("#show-p-in-5-sec");
const IntervalTimeoutLog = document.querySelector("#interval-timeout-log");

// Array of colors to cycle through
const colors = ["red", "green", "blue", "purple", "orange", "yellow"];
let colorIndex = 0;
let ChangeIntervelId = null;
let TimeoutId = null;

// Helper to log messages
const logMsg = (msg) => {
    let p = document.createElement("p");
    p.innerText = msg;
    IntervalTimeoutLog.appendChild(p);
};

// Start color change
StartColorBtn.addEventListener("click", () => {
    if (ChangeIntervelId) {
        clearInterval(ChangeIntervelId);
    }
    ChangeIntervelId = setInterval(() => {
        ChangeColor.style.backgroundColor = colors[colorIndex];
        logMsg(`Color changed to: ${colors[colorIndex]}`);
        colorIndex = (colorIndex + 1) % colors.length;
    }, 2000);
    logMsg("Started color change interval");
});

// Stop color change
StopColorBtn.addEventListener("click", () => {
    if (ChangeIntervelId) {
        clearInterval(ChangeIntervelId);
        ChangeIntervelId = null;
        logMsg("Stopped color change interval");
    }
});

// Start timeout
StartTimeoutBtn.addEventListener("click", () => {
    if (TimeoutId) {
        clearTimeout(TimeoutId); // reset if already running
    }
    TimeoutId = setTimeout(() => {
        let newp = document.createElement("p");
        newp.innerText = "Hello after 5 sec";
        ShowAfter.appendChild(newp);
        logMsg("Timeout executed: Added 'Hello after 5 sec'");
        TimeoutId = null;
    }, 5000);
    logMsg("Timeout started (5 sec countdown)");
});

// Cancel timeout
CancelTimeoutBtn.addEventListener("click", () => {
    if (TimeoutId) {
        clearTimeout(TimeoutId);
        logMsg("Timeout cancelled before execution");
        TimeoutId = null;
    }
});

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


function ChangeColor2(color) {
    document.body.style.backgroundColor = color;
}
// Change body background with direct colors
BtnGreen2.addEventListener("click", () => ChangeColor2('green'));
BtnRed2.addEventListener("click", () => ChangeColor2('red'));
BtnBlue2.addEventListener("click", () => ChangeColor2('blue'));
BtnWhite2.addEventListener("click", () => ChangeColor2('white'));
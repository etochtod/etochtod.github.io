// quick access to the element by its Id
function $(v) {return document.getElementById(v)}

// RUN button pressed
function run() {
    execPython($("tArea").value).then(triggers.checkAll);
}

// RESET button pressed. Return to initial state
function reset() {
    $("tArea").value = initValueInTextArea;
    $("result").innerHTML = "";
}

// NEXT button. Goto next level
function next() {
    window.location.href = nextURL;
    if (nextLevel>Number(getCookie(cookieLevel)))
        setCookie(cookieLevel, nextLevel);
}

// create a new div with <py-script> inside. Then evaluate its content.
// I.e., execute python and send the result to div id="result".
async function execPython(pythonText) {
    $("result").innerHTML = "";
    const div = document.createElement("div");
    const HTML = `
<py-script output="result" style="display:none">
${pythonText}
</py-script>`;
    div.innerHTML = HTML;
    const myPyScript = div.firstElementChild;
    document.body.appendChild(myPyScript);
    await myPyScript.evaluate();
    myPyScript.remove();
}

// object for handling triggers
const triggers = {
    triggersList: [],  // don't forget to fill it lately
    triggerSuccess: false,
    allSuccess: false,

    // check all triggers. If all is correct, it unlocks NEXT button
    checkAll: async function() {
        // the mutex is required if the user pushes RUN button quickly. TODO
        let triggersHTML = "<br><hr>";
        triggers.allSuccess = true;
        for (const func of triggers.triggersList) {
            triggers.triggerSuccess = false;
            let returnedText = await func();  // execute the trigger
            triggers.allSuccess = triggers.allSuccess &&
                                  triggers.triggerSuccess;
            triggersHTML += triggers.triggerSuccess ?
                "<div class='green'>":
                "<div class='red'>";
            triggersHTML += returnedText + "</div>"
        }
        $("result").innerHTML += "<div id='triggers'></div>";
        $("triggers").innerHTML = triggersHTML;
        if (triggers.allSuccess) {
            if (nextLevel>Number(getCookie(cookieLevel)))
                setCookie(cookieLevel, nextLevel);
            $("next").style.display = "inline-block";
        } else {
            $("next").style.display = "none";
        }
    },
};

// object for resizing textArea
const dragger = {
    isMove: false,
    startHeight: 0,
    startY: 0,
    addEvent: function() {
        $("dragger").addEventListener("mousedown", (event) => {
            this.isMove = true;
            this.startY = event.clientY;
            this.startHeight = $("tArea").offsetHeight;
            document.body.addEventListener("mousemove", (event) => {
                if (this.isMove) {
                    $("tArea").style.height = (this.startHeight - this.startY + event.clientY-6) + "px";
                }
            });
            document.body.addEventListener("mouseup", (event) => {
                this.isMove = false;
                document.body.removeEventListener("mousemove", this);
                document.body.removeEventListener("mouseup", this);
            });
        });
    }
};

// on page loaded
function start() {
    reset();
    dragger.addEvent();
    if (getCookie(cookieLevel)==="") {setCookie(cookieLevel, "1")}
}

// get cookies
function getCookie(cookie) {
    return ('; '+document.cookie).split(`; ${cookie}=`).pop().split(';')[0];
}

// set cookies
function setCookie(cookieName, cookieValue) {
    const d = new Date();
    d.setTime(d.getTime() + (386*24*60*60*1000)); // expires date is 3 years
    const expires = "expires="+ d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}
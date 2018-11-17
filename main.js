const recognizeEvents = document.getElementById('recognizeEvents');
const recognizeWindow = document.getElementById('recognizeWindow');
const recognizeActionables = recognizeEvents.querySelectorAll('button, input, [tabindex="0"], [tabindex="-1"]');
for (let elem of recognizeActionables) {
    elem.addEventListener('focus', () => {
        recognizeWindow.innerText = `${document.activeElement.outerHTML}`;
    });
}
//heading stuff
const headingStrings = document.getElementById("headingStrings");
const sampleHeadings = document.querySelectorAll(".changeableHeading");
const stringChangers = document.querySelectorAll(".stringChanger");
let phrases = ["I like pie", "Chocolates is better than grapes", "Get to da choppa!", "You talking to ME?!?", "I'll call Sears. You call now. I'll call now.", "Hi, me Gritty!"];
let currPhrase = -1;

//return phrases 0 through however many you want to put in. Increments sequentially instead of at random so that it's easier to track what should be be next (and because Alex is bad at math)
function incrementPhrase() {
    if (currPhrase < phrases.length - 1) {
        currPhrase++;
    } else {
        currPhrase = 0;
    }
    return phrases[currPhrase];
}

//function for determining which heading text change type to use, based on data-changetype attr of the button clicked
function changeHeadings(techniqueType, el, ipt) {
    switch (techniqueType) {
        case "innerText":
            el.innerText = ipt;
            break;
        case "innerHTML":
            el.innerHTML = ipt;
            break;
        case "textContent":
            el.textContent = ipt;
            break;
        case "childNode":
            el.childNodes[0].nodeValue = el.childNodes[0].nodeValue.replace(el.childNodes[0].nodeValue, ipt);
            break;
        default:
            console.log("Invalid techniqueType value");
            break;
    }
}

//change the headings to a sample phrase when user clicks a button 

for (let elem of stringChangers) {

    elem.addEventListener("click", (evt) => {
        let tempHeadingText = incrementPhrase();
        let currTechnique = elem.dataset.changetype;
        console.log("currTechnique is ", currTechnique);
        for (let headingElem of sampleHeadings) {
            changeHeadings(currTechnique, headingElem, tempHeadingText);
        }
    });
}

//focus on div
const focusDivBtn = document.getElementById("focusOnDiv");
focusDivBtn.addEventListener("click", () => {
    document.getElementById("focusableTargetDiv").focus();
});

//switch aria-hidden between item 01 and 02
// const cards = [].slice.call(document.querySelectorAll(".card"));
const toggles = document.querySelectorAll(".toggle");
for (let toggleBtn of toggles) {
    toggleBtn.addEventListener("click", () => {
        let active = toggleBtn.parentElement.querySelector(".active");
        document.getElementById(active.dataset.other).classList.add("active");
        if (active.dataset.hasfalse !== undefined) {
            //need to verify this in Safari too
            document.getElementById(active.dataset.other).setAttribute("aria-hidden", "false");
        } else {
            document.getElementById(active.dataset.other).removeAttribute("aria-hidden");
        }
        active.classList.remove("active");
        active.setAttribute("aria-hidden", "true");

    });


}
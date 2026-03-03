let caps = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

let lowers = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

let nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

let chars = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]

let letters = caps.concat(lowers)
let numOrLetter = letters.concat(nums)
let symbolOrLetter = letters.concat(chars)

let type = [caps, lowers, nums, chars]

let passwordLength = 16

let passwordOptionOne = document.querySelector("#p1")
let passwordOptionTwo = document.querySelector("#p2")

function randType() {
    let index = Math.floor(Math.random()*type.length)
    return type[index]
}

function generate() {
    
    let password = ""
    
    for(let i = 0; i<passwordLength; i++) {
        let thisType = randType()
        password += thisType[Math.floor(Math.random()*thisType.length)]
    }
    console.log(password)
    return password
}

function assign() {
    
    passwordOptionOne.textContent = setOption()
    passwordOptionTwo.textContent = setOption()
    
}


function copy(event) {


    // Get the specific button that was clicked
    const clickedButton = event.target
    const passwordText = clickedButton.textContent

    if (passwordText !== "copied!" && passwordText !== "") {
        // Copy to clipboard
        navigator.clipboard.writeText(passwordText)
            .then(() => {
                console.log(`Copied: ${passwordText}`)
            })
            .catch(err => console.error("Copy failed: ", err))

        // return copied msg
        clickedButton.textContent = "copied!"
        return

    } else if (passwordText === "copied!" || passwordText === "") {
        // reset
        clickedButton.textContent = ""
        return
    }
}


// ability to set password length
let thisBtn = document.getElementById("default")
let lastBtn = ""
let backColorInactive = "#2F3E53"
let backColorActive = "#4ADF86"

thisBtn.style.backgroundColor = backColorActive

function getThisBtn(event) {
    thisBtn = event.target
}

function saveLastBtn() {
    lastBtn = thisBtn
    return lastBtn
}

function setLength(event) {

    let btnToChange = saveLastBtn()
    btnToChange.style.backgroundColor = backColorInactive

    getThisBtn(event)

    passwordLength = thisBtn.textContent

    thisBtn.style.backgroundColor = backColorActive
}

// toggle symbols/numbers on/off
let options = ["Letters/Numbers/Symbols" , "Letters/Symbols" , "Letters/Numbers" , "Letters"]
let posn = 0
let option = options[posn]
let toggleText = document.querySelector(".b4")

function toggle() {
    posn ++
    if (posn>3) {
        posn = 0
    }
    option = options[posn]
    
    if (option === "Letters/Numbers/Symbols") { 
        toggleText.textContent = option
    } else if (option === "Letters/Symbols") {
        toggleText.textContent = option
    } else if (option === "Letters/Numbers") {
        toggleText.textContent = option
    } else if (option === "Letters") {
        toggleText.textContent = option
    }
}

function getRandNumOrLetter() {
    let index = Math.floor(Math.random()*numOrLetter.length)
    return numOrLetter[index]
}

function getRandCharOrLetter() {
    let index = Math.floor(Math.random()*symbolOrLetter.length)
    return symbolOrLetter[index]
}

function getRandLetter() {
    let index = Math.floor(Math.random()*letters.length)
    return letters[index]
}

function setOption () {
    //let noSpaces = [...str].filter(char => char !== ' ').join('');
    
    let noSymbols = generate().replace(/[~`!@#$%^&*()_\-+={\[}\]|:;<>.,?/]/g, () => {
        return numOrLetter[Math.floor(Math.random()*numOrLetter.length)];
    })
    
    let noNums = generate().replace(/[0-9]/g, () => {
        return symbolOrLetter[Math.floor(Math.random()*symbolOrLetter.length)];
    })
    let onlyLetters = generate().replace(/[^a-zA-Z]/g, () => {
        return letters[Math.floor(Math.random()*letters.length)];
    }) 
    
    let all = generate()
    
    if (option === "Letters/Numbers/Symbols") {
        console.log(all) 
        return all
    } else if (option === "Letters/Symbols") {
        console.log(noNums)
        return noNums
    } else if (option === "Letters/Numbers") {
        console.log(noSymbols)
        return noSymbols
    } else if (option === "Letters") {
        console.log(onlyLetters)
        return onlyLetters
    }
}

// toggle darkmode on/off

// get elements
let body = document.getElementById("body")
let h3 = document.getElementById("msg")
let upper = document.getElementById("upper")
let pwdText1 = document.getElementById("p1")
let pwdText2 = document.getElementById("p2")

let modeBtn = document.getElementById("mode-btn")

//6B7280
let modes = ["Light","Dark"]
let mode = "Dark"

function switchMode() {
    
    if (mode === "Dark") {
        body.style.backgroundColor = "#ECFDF5"
        h3.style.color = "#6B7280"
        upper.style.color = "#1F2937"
        pwdText1.style.color = "#4ADF86"
        pwdText2.style.color = "#4ADF86"
        modeBtn.textContent = "Dark Mode"
        mode = modes[0]
        
    } else {
        body.style.backgroundColor = "#1F2937"
        h3.style.color = "#D5D4D8"
        upper.style.color = "whitesmoke"
        pwdText1.style.color = "#4ADF86"
        pwdText2.style.color = "#4ADF86"
        modeBtn.textContent = "Light Mode"
        mode = modes[1]
    }

}

document.querySelector(".b1").addEventListener("click", assign)
document.querySelector(".b4").addEventListener("click", toggle)
document.querySelectorAll(".b3").forEach(btn => btn.addEventListener("click", setLength))
document.getElementById("p1").addEventListener("click", copy)
document.getElementById("p2").addEventListener("click", copy)
document.getElementById("mode-btn").addEventListener("click", switchMode)

import { Queen } from './Queen.js'
import { queenData } from './data.js'

const queensArray = ["monet", "katya", "raja", "bob", "trixie", 
    "jinkx", "adore", "kandy", "jaida", "rajah", "shea", "alaska", "crystal", "cracker", "kylie", "jan", "jujubee", "kim", "tammie", "chichi", "rupaul", "tatianna", "alyssa", "peppermint"]

// init empty array, this will hold queens that are saved to user's big three with [0] = sun sign, [1] = moon, [2] = asc
let bigThree = []
// init currQueenData to be used globally - will use this to add selected queens to bigThree arr
let currQueenData
// render page on reload/initial load
render()

// OPEN + CLOSE ABOUT MODAL
document.getElementById('about-btn').addEventListener('click', () => {
    document.getElementById('about-modal').style.display = 'block'
})

document.getElementById('about-close').addEventListener('click', () => {
    document.getElementById('about-modal').style.display = 'none'
})

function getNewQueen() {
    let i = Math.floor(Math.random() * queensArray.length)
    currQueenData = queenData[queensArray[i]]
    return new Queen(currQueenData)
} 

function getControlsHtml() {
    const controlsHtml = `
        <p class="current-placement blue-bg" id="current-placement"> 
        </p>
        <div class="button-container">
            <button id="reject-btn" class="blue-bg reject-btn">
            <i class="fa-solid fa-xmark"></i>
            </button>
            <button id="accept-btn" class="blue-bg accept-btn">
            <i class="fa-solid fa-check"></i>
            </button>
        </div>`
    return controlsHtml
}

function getPlacementHtml() {
    let currPlacementHtml = !bigThree.length ? 
        `<i class="fa-solid fa-sun"></i> Sun Sign` 
        : bigThree.length === 1 ?
        `<i class="fa-solid fa-moon"></i> Moon Sign`
        : `<i class="fa-solid fa-arrow-up"></i> Ascendant`
    return currPlacementHtml
}

function render() {
    document.getElementById('queen-card').innerHTML = getNewQueen().getQueenHtml()
    document.getElementById('current-placement-container').innerHTML = getControlsHtml()
    document.getElementById('current-placement').innerHTML = getPlacementHtml()
}

document.getElementById('reject-btn').addEventListener('click', 
    function() {
        // close the about modal if open
        document.getElementById('about-modal').style.display = 'none'
        document.getElementById('queen-card').classList.add('rejected')
        setTimeout(() => {
           document.getElementById('queen-card').innerHTML = getNewQueen().getQueenHtml() 
           document.getElementById('queen-card').classList.remove('rejected')
        }, 800)        
    })

document.getElementById('accept-btn').addEventListener('click',
    function() {
        // close the about modal if open
        document.getElementById('about-modal').style.display = 'none'
        document.getElementById('queen-card').classList.add('accepted')
        setTimeout(() => {
            handleAcceptClick()
            document.getElementById('queen-card').classList.remove('accepted')
        }, 800)
    })

function handleAcceptClick() {
    if (bigThree.length < 3) {
        bigThree.push(new Queen(currQueenData))
        document.getElementById('queen-card').innerHTML = getNewQueen().getQueenHtml()
        document.getElementById('current-placement').innerHTML = getPlacementHtml() 
        }
    checkIfBigThree()
}


function checkIfBigThree() {
    if (bigThree.length === 3) {
        const iconsHtml = [ 
            `<i class="fa-solid fa-sun"></i>`,
            `<i class="fa-solid fa-moon"></i>`,
            `<i class="fa-solid fa-arrow-up"></i>`
            ]
        const avatarsHtml = bigThree.map(queen =>
                queen.getAvatarHtml())

        document.getElementById('queen-card').style.display = 'none'
        document.getElementById('current-placement-container').style.display = 'none'
        document.getElementById('results-container').innerHTML =  `
                <p>Your Big Three</p>
                <div class="all-avatars">
                    <br> 
                    <div class="avatar-container">
                        ${iconsHtml[0]} ${avatarsHtml[0]}
                    </div>
                    <br> 
                    <div class="avatar-container">
                        ${iconsHtml[1]} ${avatarsHtml[1]}
                    </div>
                    <br> 
                    <div class="avatar-container">
                        ${iconsHtml[2]} ${avatarsHtml[2]}
                    </div>
                </div>
                <a href="index.html" class="restart-btn">Restart</a>
            `
    }
}


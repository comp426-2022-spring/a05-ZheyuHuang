// Focus div based on nav button click
const home = document.getElementById("homenav");
home.addEventListener("click", activeHome);
function activeHome() {
    document.getElementById("home").className = "active";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
}

const single = document.getElementById("singlenav");
single.addEventListener("click", activeSingle);
function activeSingle() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "active";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
}

const multiple = document.getElementById("multinav");
multiple.addEventListener("click", activeMultiple);
function activeMultiple() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "active";
    document.getElementById("guess").className = "hidden";
}

const guess = document.getElementById("guessnav");
guess.addEventListener("click", activeGuess);
function activeGuess() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "active";
}

// Flip one coin and show coin image to match result when button clicked

// Event listener for whatever is being clicked 
//			document.addEventListener("click", activeNow);
// Replace text in anything with "active" id
			// function activeNow() {
			// 	const active_now = document.activeElement
			// 	document.getElementById("active").innerHTML = active_now;
			// 	console.log(active_now)
			// }
// Button coin flip element
const coin = document.getElementById("coin")
// Add event listener for coin button
			coin.addEventListener("click", flipCoin)
			function flipCoin() {
                fetch('http://localhost:5000/app/flip/', {mode: 'cors'})
  				.then(function(response) {
    			  return response.json();
  				})
				.then(function(result) {
					console.log(result);
					document.getElementById("result").innerHTML = result.flip;
					document.getElementById("quarter").setAttribute("src","./assets/img/"+ result.flip+".png");
					coin.disabled = true
				})
//				let flip = "FLIPPED"
//				document.getElementById("coin").innerHTML = flip;
//				console.log("Coin has been flipped. Result: "+ flip)
			}

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series

// Our flip many coins form
const coins = document.getElementById("coins")
// Add event listener for coins form
coins.addEventListener("submit", flipCoins)
// Create the submit handler
async function flipCoins(event) {
    event.preventDefault();

    const endpoint = "app/flip/coins/"
    const url = document.baseURI + endpoint

    const formEvent = event.currentTarget

    try {
        const formData = new FormData(formEvent);
        //console.log(formData)
        const flips = await sendFlips({ url, formData });

        console.log(flips);
        document.getElementById("heads").innerHTML = "Heads: " + flips.summary.heads;
        document.getElementById("tails").innerHTML = "Tails: " + flips.summary.tails;
        const par = document.getElementById("raw")
        while (par.firstChild) {
            par.removeChild(par.firstChild);
        }
        for(var i=0; i<flips.raw.length; i++) {
            var img = document.createElement("img")
            img.src = "./assets/img/" + flips.raw[i] + ".png"
            par.appendChild(img)
        }
        //document.getElementById("raw").innerHTML = "Actual Flips: " + flips.raw;
    } catch (error) {
        console.log(error);
    }
}
// Create a data sender
async function sendFlips({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(plainFormData);
    console.log(formDataJson);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: formDataJsonString
    };

    const response = await fetch(url, options);
    return response.json()
}
   

// Guess a flip by clicking either heads or tails button

const guess2 = document.getElementById('guessnav')
guess2.addEventListener('click', showGuess)
function showGuess() {
    hideDivs()
    document.getElementById('guess').setAttribute('class', 'active')
}

const guessForm = document.getElementById('call')
guessForm.addEventListener('submit', guessCoin)

async function guessCoin(event) {
    event.preventDefault()

    const url = document.baseURI + 'app/flip/call/'

    try {
        const formData = new FormData(event.currentTarget)
        const formDataJson = Object.fromEntries(formData)
        var input
        if (parseInt(formDataJson.input) == 1) {
            input = JSON.stringify({ 'guess': 'tails' })
        } else {
            input = JSON.stringify({ 'guess': 'heads'})
        }
        const options = {
            method: "POST",
            headers: {"Content-Type": 'application/json', Accept: 'application/json'},
            body: input
        }

        const result = await fetch(url, options).then(function(response) {
            return response.json()
        })

        console.log(result)
        document.getElementById('guessresult').setAttribute('class', 'visible')
        if (result.result == 'win') {
            document.getElementById('guessresult').innerHTML = `
            <p>Result: ` + result.flip +`</p>
            <p><span style="color:green">YOU WIN!</span></p>
            `
        } else {
            document.getElementById('guessresult').innerHTML = `
            <p>Result: ` + result.flip + `</p>
            <p><span style="color:red">you lose :(</span></p>
            `
        }
        
    } catch(error) {
        console.log(error)
    }
}

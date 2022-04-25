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

// Guess a flip by clicking either heads or tails button

//Github API - Credit to https://github.com/lukePeavey/quotable
const api_url = "https://api.quotable.io/random";

//Init global array to store quotes
const storeQuotes = [];

//Init quote placeholder
let quoteTarget = document.getElementById("parent__quoteTarget");

//Init author placeholder
let authorTarget = document.getElementById("parent__authorTarget");

//Init author placeholder
let historyTarget = document.getElementById("parent__historyTarget");

//Init button with event listener
document.getElementById("parent__button").addEventListener("click", fetchBt);

//Function to fetch API
function fetchBt() {
  //Fetch API
  const fetchQuote = fetch(api_url);

  fetchQuote
    //Convert the json to js object
    .then((apiResponse) => {
      return apiResponse.json();
    })

    //Handle the json data
    .then((apiQuotes) => {
      const newQuote = apiQuotes.content; //Grab content
      const newAuthor = apiQuotes.author; //Grab author
      const newID = apiQuotes._id; //Grab ID

      //Pass down a grabbed quote value to a function
      passQuote(newQuote);

      //Update DOM innerHTML
      quoteTarget.innerHTML = newQuote; //Quote
      authorTarget.innerHTML = newAuthor; //Author name
      historyTarget.innerHTML = storeQuotes.join("<br />"); //History
    })

    //Catch error
    .catch((error) => console.log("Error!"));
}

//Function to check if array is 4 and below
function passQuote(newQuote) {
  //If its less or equal than index 4
  if (storeQuotes.length <= 4) {
    //Add 1 item in front
    storeQuotes.unshift(newQuote);
  } else {
    //Remove 1 item behind
    storeQuotes.pop(newQuote);
    //Then add 1 item in front
    storeQuotes.unshift(newQuote);
  }
}

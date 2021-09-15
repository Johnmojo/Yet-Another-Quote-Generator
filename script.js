/*------------------------------------------------------------/

Yet Another Quote Generator - Johnny Chai
Quote API - Credit to https://github.com/lukePeavey/quotable 

/------------------------------------------------------------*/

const api_url = "https://api.quotable.io/random?maxLength=50";

//Init global array to store quotes & authors
let storeQuotes = [];
let storeAuthor = [];

//Init quote placeholder
const quoteTarget = document.querySelector(".parent__quoteTarget");

//Init author placeholder
const authorTarget = document.querySelector(".parent__authorTarget");

//Init author placeholder
const historyTarget = document.querySelector(".parent__historyTarget");

const parentTarget = document.querySelector(".parent__result");

//Init button with event listener
document.querySelector(".parent__button").addEventListener("click", fetchBt);

//Init history clear button
document.querySelector(".parent__clear").addEventListener("click", clearBt);

//Calling previous stored quotes for returned visitor
checkLocalQuotes();

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

      //Pass down a grabbed quote value to a function
      passQuote(newQuote, newAuthor);

      //Calling previous stored quotes
      checkLocalQuotes();
    })

    //Catch error
    .catch((error) => console.log("Error!"));
}

//Function to check if array is 4 and below, pass along parameter value newQuote & newAuthor.
function passQuote(newQuote, newAuthor) {
  //If its less or equal than index 4.
  //To ensure we do not exceed 5 saved quotes.
  if (storeQuotes.length <= 4) {
    //Add 1 item in front - quote
    storeQuotes.unshift(newQuote);
    //Add 1 item in front - author
    storeAuthor.unshift(newAuthor);
  } else {
    //Remove 1 item behind - quote
    storeQuotes.pop(newQuote);
    //Then add 1 item in front - quote
    storeQuotes.unshift(newQuote);
    //Remove 1 item behind - author
    storeAuthor.pop(newAuthor);
    //Then add 1 item in front - author
    storeAuthor.unshift(newAuthor);
  }

  //Pass stringtified storeQuotes array to localStorage
  localStorage.setItem("quotesLocalStorage", JSON.stringify(storeQuotes));

  //Pass stringtified storeAuthor array to localStorage
  localStorage.setItem("authorLocalStorage", JSON.stringify(storeAuthor));
}

//Function to display stored quotes from local storage
function checkLocalQuotes() {
  parentFade();

  //Retrieve parsed data from local storage
  retrivedQuotes = JSON.parse(localStorage.getItem("quotesLocalStorage"));

  //Retrieve parsed data from local storage
  retrivedAuthors = JSON.parse(localStorage.getItem("authorLocalStorage"));

  //If no key of "quotesLocalStorage" found in local storage
  if (localStorage.getItem("quotesLocalStorage") === null) {
    fetchBt(); //Call & give 1 quote when loaded
    console.log("Localstorage is empty");
  } else {
    storeQuotes = [...retrivedQuotes]; //Add retrivedQuotes into storeQuotes array
    storeAuthor = [...retrivedAuthors]; //Add retrivedAuthors into storeAuthor array
    console.log("Localstorage content found");
    document.querySelector(".parent__clear").classList.remove("hidden"); //Remove hidden class if there are quotes
  }

  //Update DOM innerHTML
  historyTarget.innerHTML = storeQuotes.join("<br />"); //Display updated history - Insert a single line break

  //Update DOM innerHTML
  quoteTarget.innerHTML = storeQuotes[0]; //Show last quote
  authorTarget.innerHTML = storeAuthor[0]; //Show last author

  //Delay so everyone doesn't spam it
  document.querySelector(".parent__button").setAttribute("disabled", "");
  setTimeout(function () {
    document.querySelector(".parent__button").setAttribute("enabled", "");
    document.querySelector(".parent__button").removeAttribute("disabled", "");
  }, 2000);
}

//Function to clear out quotes & authors
function clearBt() {
  parentFade();
  localStorage.clear(); //Clear local storage
  checkLocalQuotes();
  storeQuotes = []; //Clear storeQuotes array
  retrivedQuotes = []; //Clear retrivedQuotes array
  storeAuthor = []; //Clear storeAuthor array
  document.querySelector(".parent__clear").classList.add("hidden"); //Add hidden class to hide after click
  historyTarget.innerHTML = storeQuotes.join("<br />"); //Display updated history - Insert a single line break
  loadingFade();
}

//Set a delay + animation
function parentFade() {
  parentTarget.style.animation = "anim-repeat-top 1s";
  historyTarget.style.animation = "anim-repeat-bottom 2s";
  setTimeout(function () {
    parentTarget.style.animation = "none";
    historyTarget.style.animation = "none";
  }, 2000);
}

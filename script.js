let search = document.getElementById("searchBtn");
var container = document.getElementById("container");
let card = document.getElementById("card");
let cardImage = document.getElementById("image");
let res = document.getElementById("res");
let card404 = document.getElementById("not-found");
let image404 = document.getElementById("image404");
let movieTitle = document.getElementById("movie-title");
let movieYear = document.getElementById("movie-year");
let input = document.getElementById("movie-name");

let closeButton = document.getElementById("closeButton");
closeButton.addEventListener("click", closeModal);

let modalBG = document.getElementById("bg");


let cards = [];


bg.addEventListener("click", closeModal);

input.addEventListener("keypress", e => e.key === "Enter" ? addMovies() : null);
search.addEventListener("click", addMovies);

function addMovies() {
  let movieName = document.getElementById("movie-name").value;
  let uri = "https://www.omdbapi.com/?apikey=7ec3e319&s=" + movieName;
  document.getElementById("movie-name").value = "";
  if (movieName === "") return;

  fetch(uri)
    .then((response) => response.json())
    .then((json) => {
      

      res.innerHTML = "";
      if (json.Response == "False") {
        let radioContainer = document.getElementById("pages");
        radioContainer.innerHTML = "";
        let card404 = document.createElement("div");
        card404.className = "card404";
        card404.id = "not-found";

        let image404 = document.createElement("img");
        image404.src = "./images/404.png";
        image404.style.width = "300px";
        image404.id = "image404";

        card404.appendChild(image404);
        card404.classList.add("fadeIn");

        res.appendChild(card404);
        container.style.width = "400px";
        container.style.height = "450px";
        return;
      } 
      createPages(json);
      let page1 = document.getElementById("page1");
      page1.checked = true;
      json.Search = json.Search.sort((a, b) => a.Year - b.Year);
      card404.classList.remove("fadeIn");
      res.innerHTML = "";
      container.style.width = "40%";
      container.style.height = "528px";
      for (let i = 0; i < 3; i++) {
        let posterURL = json.Search[i].Poster;
    
        let card = document.createElement("div");
        card.className = "card";
        card.id = `card${i + 1}`;
    
        let cardImage = document.createElement("img");
        cardImage.style.width = "150px";
        cardImage.id = `image${i + 1}`;
    
        let movieInfo = document.createElement("div");
        movieInfo.className = "movie-info";
    
        let movieTitle = document.createElement("span");
        movieTitle.id = `movie-title${i + 1}`;
    
        let movieYear = document.createElement("span");
        movieYear.id = `movie-year${i + 1}`;
    
        movieInfo.appendChild(movieTitle);
        movieInfo.appendChild(movieYear);
        card.appendChild(cardImage);
        card.appendChild(movieInfo);
        res.appendChild(card);
    
        card.style.cursor = "pointer";
    
        card.addEventListener("mouseover", hoverCard);
        card.addEventListener("mouseout", unHoverCard);
    
        card.addEventListener("click", function () {
          openModal(json.Search[i].imdbID);
        });
    
        posterURL == "N/A"
          ? (cardImage.src = "./images/404.png")
          : (cardImage.src = `${posterURL}`);
        movieTitle.innerHTML = `<b>${json.Search[i].Title}</b>`;
        movieYear.innerHTML = `<b>${json.Search[i].Year}</b>`;
        card.classList.add("fadeIn");
      }
    });
}


function createPages(json) {
  let pagesCount = Math.ceil(json.Search.length / 3);
  let radioContainer = document.getElementById("pages");
  radioContainer.innerHTML = "";
  for (let i = 0; i < pagesCount; i++) {
    let radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.name = "page";
    radioButton.id = `page${i + 1}`;
    radioButton.value = i + 1;

    let label = document.createElement("label");
    label.htmlFor = `page${i + 1}`;
    label.textContent = i + 1;


    radioButton.addEventListener("change", function () {
      if (this.checked) {
        res.innerHTML = "";

        createCard(json, this.value);
      }
    });

    radioContainer.appendChild(radioButton);
    radioContainer.appendChild(label);
  }
}



function createCard(json, pageNumber) {
  let startIndex = (pageNumber - 1) * 3;
  let endIndex = Math.min(startIndex + 3, json.Search.length);

  json.Search = json.Search.sort((a, b) => a.Year - b.Year);
  card404.classList.remove("fadeIn");
  res.innerHTML = "";
  container.style.width = "40%";
  container.style.height = "528px";

  for (let i = startIndex; i < endIndex; i++) {
    let posterURL = json.Search[i].Poster;

    let card = document.createElement("div");
    card.className = "card";
    card.id = `card${i + 1}`;

    let cardImage = document.createElement("img");
    cardImage.style.width = "150px";
    cardImage.id = `image${i + 1}`;

    let movieInfo = document.createElement("div");
    movieInfo.className = "movie-info";

    let movieTitle = document.createElement("span");
    movieTitle.id = `movie-title${i + 1}`;

    let movieYear = document.createElement("span");
    movieYear.id = `movie-year${i + 1}`;

    movieInfo.appendChild(movieTitle);
    movieInfo.appendChild(movieYear);
    card.appendChild(cardImage);
    card.appendChild(movieInfo);
    res.appendChild(card);


    card.style.cursor = "pointer";

    card.addEventListener("mouseover", hoverCard);
    card.addEventListener("mouseout", unHoverCard);

    card.addEventListener("click", function () {
      openModal(json.Search[i].imdbID);
    });

    posterURL == "N/A"
      ? (cardImage.src = "./images/404.png")
      : (cardImage.src = `${posterURL}`);
    movieTitle.innerHTML = `<b>${json.Search[i].Title}</b>`;
    movieYear.innerHTML = `<b>${json.Search[i].Year}</b>`;
    card.classList.add("fadeIn");
  }
}

function hoverCard() {
  this.style.transform = "scale(1.45)";
  this.style.zIndex = "10";
}
function unHoverCard() {
  this.style.transform = "scale(1)";
  this.style.zIndex = "9";
}

function openModal(imdbID) {
  let modal = document.getElementById("myModal");
  let modalTitle = document.getElementById("modalTitle");
  let modalYear = document.getElementById("modalYear");
  let modalPoster = document.getElementById("modalPoster");
  let modalLength = document.getElementById("modalLength");
  let modalGenre = document.getElementById("modalGenre");
  let modalDirector = document.getElementById("modalDirector");
  let modalPlot = document.getElementById("modalPlot");
  let rating = document.getElementById("modalRating");
  
  let bg = document.getElementById("bg");

  fetch(`https://www.omdbapi.com/?apikey=7ec3e319&i=${imdbID}`)
    .then((response) => response.json())
    .then((json) => {
      rating.textContent = json.imdbRating;
      let a = document.createElement("a");
      a.href = `https://www.imdb.com/title/${imdbID}`;
      a.target = "_blank";
      rating.appendChild(a);
      modalTitle.textContent = json.Title;
      modalYear.textContent = json.Released;
      modalLength.textContent = json.Runtime;
      modalGenre.textContent = json.Genre;
      modalPlot.textContent = json.Plot;
      modalDirector.textContent = json.Director;
      modalPoster.src =
        json.Poster === "N/A" ? "./images/404.png" : json.Poster;
    });

  bg.style.opacity = "0.5";
  bg.style.display = "block";

  modal.style.opacity = "1";
  modal.style.scale = "1";
}

function closeModal() {
  let modal = document.getElementById("myModal");
  let container = document.getElementById("container");

  bg.style.opacity = "0";
  bg.style.display = "none";

  modal.style.opacity = "0";
  modal.style.scale = "0";
}

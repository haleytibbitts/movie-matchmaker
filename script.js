// 460ad8448635789cb7af9acdaa3d45f2
// https://www.themoviedb.org/settings/api/people

// Fetch genres from API and store within object
const genreList = {};
genreList.genres = [];
fetch(
  "https://api.themoviedb.org/3/genre/movie/list?api_key=460ad8448635789cb7af9acdaa3d45f2"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    genreList.genres = json.genres;
    genreList.listGenres();
  });

// Create function that populates the page with genre question and answers.
genreList.listGenres = () => {
  const questionForm = document.querySelector("form");
  const questionLegend = document.createElement("legend");
  questionLegend.innerText = "Which genres do you like?";
  questionForm.appendChild(questionLegend);

  // Loop through genres and populate form with labels and inputs with appropriate attributes for each option.
  genreList.genres.forEach((item) => {
    // console.log(item);
    const inputLabel = document.createElement("label");
    const inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = item.name;
    inputElement.value = item.name;
    inputLabel.htmlFor = item.name;
    inputLabel.innerText = item.name;
    questionForm.appendChild(inputLabel);
    questionForm.appendChild(inputElement);
  });

  // Create event listener that stores movie suggestions in an object on submit.
  const submitButton = document.querySelector("button");
  submitButton.addEventListener("submit", function (e) {
    e.preventDefault();
    const movieList = {};
    movieList.results = [];
    console.log("clicked");
    questionForm.children.forEach((genre) => {});
    const url = new URL(
      "https://api.themoviedb.org/3/discover/movie?api_key=460ad8448635789cb7af9acdaa3d45f2"
    );
    // url.search = new URLSearchParams(with_genres: genreSelection);
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        // console.log(json);
        movieList.results = json.results;
        movieList.displayMovies();
      });

    movieList.displayMovies = () => {
      const page = document.querySelector("body");

      movieList.results.forEach((item) => {
        const newPara = document.createElement("p");
        newPara.innerHTML = `<h3>${item.original_title}:</h3> ${item.overview}`;
        page.appendChild(newPara);
      });
    };
  });
};

// make namespace object for our app (movieRecApp)

// initialize API

// create an array of movie recs
// create questions to get user input
// eg fav genre, language, etc.
// put data from user selections into array
// fetch data from API based on user inputs/selections
// write a function that evaluates user selections...
// write function that displays a recommendation on the page
// ask user for input on whether or not they want to keep the given rec or ask for a new one.

// STRETCH: add recs to watchlist

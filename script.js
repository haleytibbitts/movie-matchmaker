// 460ad8448635789cb7af9acdaa3d45f2
// https://www.themoviedb.org/settings/api/people

// Fetch genres from API and store within object
// const genreList = {};
// genreList.genres = [];
// fetch(
//   "https://api.themoviedb.org/3/genre/movie/list?api_key=460ad8448635789cb7af9acdaa3d45f2"
// )
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (json) {
//     genreList.genres = json.genres;
//     genreList.listGenres();
//   });

// Create function that populates the page with genre question and answers.
// genreList.listGenres = () => {
//   const questionForm = document.querySelector("form");
//   const questionLegend = document.createElement("legend");
//   questionLegend.innerText = "Which genres do you like?";
//   questionForm.appendChild(questionLegend);

// Loop through genres and populate form with labels and inputs with appropriate attributes for each option.
// genreList.genres.forEach((item) => {
//   // console.log(item);
//   const inputLabel = document.createElement("label");
//   const inputElement = document.createElement("input");
//   inputElement.type = "checkbox";
//   inputElement.id = item.name;
//   inputElement.value = item.name;
//   inputLabel.htmlFor = item.name;
//   inputLabel.innerText = item.name;
//   questionForm.appendChild(inputLabel);
//   questionForm.appendChild(inputElement);
// });

// Create event listener that stores movie suggestions in an object on submit.
// const submitButton = document.querySelector("button");
// submitButton.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const movieList = {};
//   movieList.results = [];
//   console.log("clicked");
//   questionForm.children.forEach((genre) => {});
//   const url = new URL(
//     "https://api.themoviedb.org/3/discover/movie?api_key=460ad8448635789cb7af9acdaa3d45f2"
//   );
// url.search = new URLSearchParams(with_genres: genreSelection);
//     fetch(url)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (json) {
//         // console.log(json);
//         movieList.results = json.results;
//         movieList.displayMovies();
//       });

//     movieList.displayMovies = () => {
//       const page = document.querySelector("body");

//       movieList.results.forEach((item) => {
//         const newPara = document.createElement("p");
//         newPara.innerHTML = `<h3>${item.original_title}:</h3> ${item.overview}`;
//         page.appendChild(newPara);
//       });
//     };
//   });
// };

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

// movieRecApp {
//      recommendation {
//          genre
//          spoken language
//          release date
//          lead actor
//          supporting actor
//          director
//          runtime
//          critical rating
//          how to watch (ie. netflix, prime, hulu, somewhere for free, etc.)
//      }
//      list of genres (array)
//      list of spoken languages (array)
//      semi-random list of actors (primary & supporting)
//      semi-random list of directors
//      curOptions (array)
// }

//////////////////////////////////////////////////////////////////////////
// PSEUDO CODE!
//////////////////////////////////////////////////////////////////////////

// 1. make namespace object (movieRecApp)
const movieRecApp = {};

// Fetch parameters
movieRecApp.url = "https://api.themoviedb.org/3/";
movieRecApp.apiKey = "460ad8448635789cb7af9acdaa3d45f2";

// Object to populate with user info
// movieRecApp.recommendation = {
//   genre: userGenre,
//   lang: userLang,
//   release: userRelease,
//   rating: userRating,
//   runTime: userRunTime,
//   service: userService,
//   actor: userActor,
//   director: userDirector,
// };

// Arrays to store fetched data from api
movieRecApp.genreList = [];
movieRecApp.langList = [];
movieRecApp.actorList = [];
movieRecApp.directorList = [];

movieRecApp.getGenreData = () => {
  const url = new URL(`${movieRecApp.url}genre/movie/list`);
  url.search = new URLSearchParams({
    api_key: movieRecApp.apiKey,
  });
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      // console.log(jsonResponse);
      movieRecApp.genreList = jsonResponse.genres;
    });
};

movieRecApp.getActorData = () => {
  const url = new URL(`${movieRecApp.url}person/popular`);
  url.search = new URLSearchParams({
    api_key: movieRecApp.apiKey,
  });
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      jsonResponse.results.forEach((e) => {
        if (e.known_for_department === "Acting") {
          movieRecApp.actorList.push(e);
        }
      });
    });
};

movieRecApp.getDirectorData = () => {
  const url = new URL(`${movieRecApp.url}person/popular`);
  for (let i = 1; i <= 200; i++) {
    url.search = new URLSearchParams({
      api_key: movieRecApp.apiKey,
      page: i,
    });
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        jsonResponse.results.forEach((e) => {
          if (e.known_for_department === "Directing") {
            movieRecApp.directorList.push(e);
          }
        });
      });
    if (movieRecApp.directorList.length > 4) {
      break;
    }
  }
};

// Init function
movieRecApp.init = () => {
  movieRecApp.getGenreData();
  movieRecApp.getActorData();
  movieRecApp.getDirectorData();
  console.log(movieRecApp.directorList);
};

// 2. initialize API
// 3. fetch requests for data we want from API
//      3.1 genres
//      3.2 dozen random lead actor names
//      3.3 dozen random supporting actor names
//      3.4 dozen random director names
// 4. create init function
//      4.1 call welcome page (big ol' button: "Get Me My Recommendation, Robot Butler!")
//      4.2 call genre question page
//          4.2.1 display options
//              4.2.1.1 looks at curOptions
//              4.2.1.2 creates HTML for each option, iteratively
//              4.2.1.3 displays HTML (append to certain area of website)
//              4.2.1.4 add button response options
//              4.2.1.5 wait for response
//          4.2.2 capture response
//          4.2.3 store that in movieRecApp->recommendation object
//      4.3 call release date question page (Now Playing, Recent Release, Classic Film, etc)
//          4.3.1 display options
//          4.3.2 capture response
//          4.3.3 store that in movieRecApp->recommendation object
//      4.4 call spoken language question page
//          4.4.1 display options
//          4.4.2 capture response
//          4.4.3 store that in movieRecApp->recommendation object
//      4.5 call critical rating page
//          4.5.1 display options
//          4.5.2 capture response
//          4.5.3 store that in movieRecApp->recommendation object
//      4.6 call runtime page
//          4.6.1 display options
//          4.6.2 capture response
//          4.6.3 store that in movieRecApp->recommendation object
//      4.7 call how-to-watch page
//          4.7.1 display options
//          4.7.2 capture response
//          4.7.3 store that in movieRecApp->recommendation object
//      4.8 call lead actor page
//          4.8.1 display options
//          4.8.2 capture response
//          4.8.3 store that in movieRecApp->recommendation object
//      4.9 call director page
//          4.9.1 display options
//          4.9.2 capture response
//          4.9.3 store that in movieRecApp->recommendation object
//      4.10 call supporting actor page
//          4.10.1 display options
//          4.10.2 capture response
//          4.10.3 store that in movieRecApp->recommendation object
// 5. Fetch from Movie Recommendations API with user input data from movieRecApp->recommendation
// 6. Present: Title / Tag Line / Poster / Cast / Director / Rating / Overview / Streaming Service (or !IN THEATRES NOW!)
movieRecApp.init();

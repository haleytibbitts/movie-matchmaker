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

// MOVIES :)
// const getMovie = () => {
//   const url = new URL("https://api.themoviedb.org/3/discover/movie");
//   url.search = new URLSearchParams({
//     api_key: "460ad8448635789cb7af9acdaa3d45f2",
//     with_original_language: "hi",
//   });
//   fetch(url)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (json) {
//       // console.log(json);
//       console.log(json.results);
//     });
// };

// getMovie();

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

// Our "question page" object, which we use to update the HTML for each question
movieRecApp.page = document.querySelector("#page");

// Object to populate with user info
movieRecApp.recommendation = {
  genre: [],
  release: [],
  runtime: [],
  service: [],
  lead: [],
  lang: [],

};
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
// movieRecApp.genreList = [];
movieRecApp.langList = [];
movieRecApp.actorList = [];
movieRecApp.directorList = [];


// ********** GENRE QUESTION PAGE **************
// Function to retrieve genre data from our API
movieRecApp.getGenreData = () => {
  // Construct the URL to fetch genre data
  const url = new URL(`${movieRecApp.url}genre/movie/list`);
  url.search = new URLSearchParams({
    api_key: movieRecApp.apiKey,
  });

  // Use the constructed URL to fetch a list of genres
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      // console.log(jsonResponse);
      // movieRecApp.genreList = jsonResponse.genres;

      // Now construct our genre page using the genre list
      movieRecApp.genrePage(jsonResponse.genres);
    });
};

// Function to construct the question page for genre
movieRecApp.genrePage = (genreList) => {
  // create a form to put all the elements inside
  const questionForm = document.createElement("fieldset");

  // create our question elements, starting with a legend/question
  const questionLegend = document.createElement("legend");
  questionLegend.innerText = "What GENRE(S) would you like to be matched with?";
  questionForm.appendChild(questionLegend);
  // console.log(questionForm);

  // create each checkbox item
  genreList.forEach((item) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question-item");
    const questionElem = document.createElement("input");
    questionElem.type = "checkbox";
    questionElem.id = item.name;
    questionElem.name = item.name;
    questionElem.value = item.name;
    const questionLabel = document.createElement("label");
    questionLabel.innerText = item.name;
    questionLabel.for = item.name;

    // put each checkbox item & label into our question div
    questionDiv.appendChild(questionLabel);
    questionDiv.appendChild(questionElem);

    // put this div into our fieldset object
    questionForm.appendChild(questionDiv);
  });

  // add our question fieldset to the page
  movieRecApp.page.appendChild(questionForm);

  // create a button to submit
  const qButton = document.createElement("button");
  qButton.innerText = "Next Question";

  // add the button to the page
  movieRecApp.page.appendChild(qButton);

  // listen for the click
  movieRecApp.questionListener("genre");
};


// ********** RELEASE QUESTION PAGE **************
movieRecApp.releasePage = () => {
  // create a form to put all the elements inside
  const questionForm = document.createElement("fieldset");

  // create our question elements, starting with a legend/question
  const questionLegend = document.createElement("legend");
  questionLegend.innerText = "How old is your ideal film?";
  questionForm.appendChild(questionLegend);

  for (let i = 1; i <= 5; i++) {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question-item");
    const questionElem = document.createElement("input");
    const questionLabel = document.createElement("label");
    questionElem.type = "checkbox";

    // put each checkbox item & label into our question div
    questionDiv.appendChild(questionLabel);
    questionDiv.appendChild(questionElem);

    // put this div into our fieldset object
    questionForm.appendChild(questionDiv);

    if (i === 1) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.for =
        "new";
      questionLabel.innerText = "Brand New";
    } else if (i === 2) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.for =
        "recent";
      questionLabel.innerText = "Recent-ish";
    } else if (i === 3) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.for =
        "older";
      questionLabel.innerText = "Older, but not Ancient";
    } else if (i === 4) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.for =
        "classic";
      questionLabel.innerText = "Classic Film (Ancient)";
    } else {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.for =
        "random";
      questionLabel.innerText = "Whenever, man.";
    }
  }
  // add our question fieldset to the page
  movieRecApp.page.appendChild(questionForm);

  // create a button to submit
  const qButton = document.createElement("button");
  qButton.innerText = "Next Question";

  // add the button to the page
  movieRecApp.page.appendChild(qButton);

  // listen for the click
  movieRecApp.questionListener("release");
};

// Language question page function
movieRecApp.langPage = () => {
  // create a form to put all the elements inside
  const questionForm = document.createElement("fieldset");

  // create our question elements, starting with a legend/question
  const questionLegend = document.createElement("legend");

  questionLegend.innerText =
    "Which language would you like your film to be in?";
  questionForm.appendChild(questionLegend);

  for (let i = 1; i <= 10; i++) {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question-item");
    const questionElem = document.createElement("input");
    const questionLabel = document.createElement("label");
    questionElem.type = "checkbox";

    // put each checkbox item & label into our question div
    questionDiv.appendChild(questionLabel);
    questionDiv.appendChild(questionElem);

    // put this div into our fieldset object
    questionForm.appendChild(questionDiv);

    if (i === 1) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.for =
        "en";
      questionLabel.innerText = "English";
    } else if (i === 2) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.for =
        "zh";
      questionLabel.innerText = "Chinese";
    } else if (i === 3) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.for =
        "fr";
      questionLabel.innerText = "French";
    } else if (i === 4) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.for =
        "ja";
      questionLabel.innerText = "Japanese";
    } else if (i === 5) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.for =
        "es";
      questionLabel.innerText = "Spanish";
    } else if (i === 6) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.for =
        "de";
      questionLabel.innerText = "German";
    } else if (i === 7) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.for =
        "ko";
      questionLabel.innerText = "Korean";
    } else if (i === 8) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.for =
        "hi";
      questionLabel.innerText = "Hindi";
    } else if (i === 9) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.for =
        "it";
      questionLabel.innerText = "Italian";
    } else {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.for =
        "random";
      questionLabel.innerText = "Suprise Me!";
    }
  }
  // add our question fieldset to the page
  movieRecApp.page.appendChild(questionForm);

  // create a button to submit
  const qButton = document.createElement("button");
  qButton.innerText = "Next Question";

  // add the button to the page
  movieRecApp.page.appendChild(qButton);

  // listen for the click
  movieRecApp.questionListener("lang");
};


// ********** RUNTIME QUESTION PAGE **************
movieRecApp.runtimePage = () => {
  // create a form
  const questionForm = document.createElement("fieldset");

  // create our question elements, starting with a legend/question
  const questionLegend = document.createElement("legend");
  questionLegend.innerText = "How long a movie do you want to watch?";
  questionForm.appendChild(questionLegend);

  for (let i = 1; i <= 4; i++) {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question-item");
    const questionElem = document.createElement("input");
    const questionLabel = document.createElement("label");
    questionElem.type = "checkbox";

    // put each checkbox item & label into our question div
    questionDiv.appendChild(questionLabel);
    questionDiv.appendChild(questionElem);

    // put this div into our fieldset object
    questionForm.appendChild(questionDiv);

    if (i === 1) {
      questionElem.id =
        questionElem.name =
        questionLabel.innerText =
        questionLabel.for =
        "Like, an hour";
      questionElem.value = 60;
    } else if (i === 2) {
      questionElem.id =
        questionElem.name =
        questionLabel.innerText =
        questionLabel.for =
        "60 to 90 minutes";
      questionElem.value = 90;
    } else if (i === 3) {
      questionElem.id =
        questionElem.name =
        questionLabel.innerText =
        questionLabel.for =
        "90 to 120 minutes";
      questionElem.value = 120;
    } else {
      questionElem.id =
        questionElem.name =
        questionLabel.innerText =
        questionLabel.for =
        "Let's spend the night together!";
      questionElem.value = 360;
    }
  }
  // add our question fieldset to the page
  movieRecApp.page.appendChild(questionForm);

  // create a button to submit
  const qButton = document.createElement("button");
  qButton.innerText = "Next Question";

  // add the button to the page
  movieRecApp.page.appendChild(qButton);

  // listen for the click
  movieRecApp.questionListener("runtime");
};


// ********** SERVICE QUESTION PAGE **************
// Function to retrieve service provider data from our API
movieRecApp.getServices = () => {
  // Construct the URL to fetch genre data
  const url = new URL(`${movieRecApp.url}watch/providers/movie`);
  url.search = new URLSearchParams({
    api_key: movieRecApp.apiKey,
    watch_region: 'CA',
  });

  // Use the constructed URL to fetch a list of genres
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      console.log(jsonResponse.results);
      // Now construct our "how to watch" page using the service provider list
      movieRecApp.servicePage(jsonResponse.results);
    });
};

// Function to construct the question page for service provider
movieRecApp.servicePage = (servicesList) => {
  // create a form to put all the elements inside
  const questionForm = document.createElement("fieldset");

  // create our question elements, starting with a legend/question
  const questionLegend = document.createElement("legend");
  questionLegend.innerText = "What service provider would you like to use for your date?";
  questionForm.appendChild(questionLegend);
  // console.log(questionForm);

  // create each checkbox item
  servicesList.forEach((item) => {
    if (item.display_priority <= 40) {

      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question-item");
      const questionElem = document.createElement("input");
      questionElem.type = "checkbox";
      questionElem.id = questionElem.name = item.provider_name;
      questionElem.value = item.provider_id;
      const questionLabel = document.createElement("label");
      questionLabel.innerText = questionLabel.for = item.provider_name;

      // put each checkbox item & label into our question div
      questionDiv.appendChild(questionLabel);
      questionDiv.appendChild(questionElem);

      // put this div into our fieldset object
      questionForm.appendChild(questionDiv);
    }
  });
  // add our question fieldset to the page
  movieRecApp.page.appendChild(questionForm);

  // create a button to submit
  const qButton = document.createElement("button");
  qButton.innerText = "Next Question";

  // add the button to the page
  movieRecApp.page.appendChild(qButton);

  // listen for the click
  movieRecApp.questionListener("service");
};


// ********** LEAD ACTOR QUESTION PAGE **************
// Function to retrieve lead actor data from our API
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
      movieRecApp.actorPage();
    });
  movieRecApp.questionListener("lang");
};

// create and display a page of possible actors to choose from
movieRecApp.actorPage = () => {
  // create a form to put all the elements inside
  const questionForm = document.createElement("fieldset");

  // create our question elements, starting with a legend/question
  const questionLegend = document.createElement("legend");
  questionLegend.innerText = "What actor(s) would you like to watch?";
  questionForm.appendChild(questionLegend);

  // create each checkbox item
  movieRecApp.actorList.forEach((item) => {
    // create the div
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question-item");

    // create the checkboxes
    const questionElem = document.createElement("input");
    questionElem.type = "checkbox";
    questionElem.id = questionElem.name = item.name;
    questionElem.value = item.id;
    const questionLabel = document.createElement("label");
    questionLabel.innerText = questionLabel.for = item.name;

    // put each checkbox item & label into our question div
    questionDiv.appendChild(questionLabel);
    questionDiv.appendChild(questionElem);

    // put this div into our fieldset object
    questionForm.appendChild(questionDiv);
  });
  // add our question fieldset to the page
  movieRecApp.page.appendChild(questionForm);

  // create a button to submit
  const qButton = document.createElement("button");
  qButton.innerText = "Next Question";

  // add the button to the page
  movieRecApp.page.appendChild(qButton);

  // listen for the click
  movieRecApp.questionListener("lead");
}


// ********** DIRECTOR QUESTION PAGE **************
// Function to retrieve director data from our API
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

movieRecApp.questionListener = (curPage) => {
  // set up a listener for the click to take us to the next page
  const elem = document.querySelector("button");
  elem.addEventListener("click", (e) => {
    // grab the selected checkboxes
    const userSelection = document.querySelector("fieldset");

    // iterate over the HTMLCollection node list of the user selection
    for (item of userSelection.elements) {
      if (item.checked) {

        // push the item.value to the proper part of the recommendation data
        if (curPage == "genre") {
          movieRecApp.recommendation.genre.push(item.value);
        } else if (curPage == "release") {
          movieRecApp.recommendation.release.push(item.value);
        } else if (curPage == "lang") {
        } else if (curPage == "rating") {
        } else if (curPage == "runtime") {
          movieRecApp.recommendation.runtime.push(item.value);
        } else if (curPage == "service") {
          movieRecApp.recommendation.service.push(item.value);
        } else if (curPage == "lead") {
          movieRecApp.recommendation.lead.push(item.value);
        }

        // console.log(`${curPage} -- User selected: ${item.value}`);
        // eval(`movieRecApp.recommendation.${curPage}.push(${item.value})`);
      }
    }

    // clear out the current question
    const page = document.querySelector("#page");
    page.innerHTML = "";

    // call the next question page
    if (curPage == "genre") {
      movieRecApp.releasePage();
    } else if (curPage == "release") {
      // language page call
      movieRecApp.runtimePage();
    } else if (curPage == "lang") {
      // rating page call
    } else if (curPage == "rating") {
      movieRecApp.runtimePage();
    } else if (curPage == "runtime") {
      movieRecApp.getServices();
    } else if (curPage == "service") {
      movieRecApp.getActorData();
    } else if (curPage == "lead") {
      //movieRecApp.directorPage();
    }

    console.log(movieRecApp.recommendation);
  });
};

movieRecApp.welcomeListener = () => {
  // set up a listener for the submit on the MATCH ME button on our landing page
  const elem = document.querySelector("button");
  elem.addEventListener("click", (e) => {
    // grab welcome page section & remove it
    const welcomePage = document.querySelector("#page");
    welcomePage.innerHTML = "";

    // trigger next page load
    movieRecApp.getGenreData();
  });
};

// Init function
movieRecApp.init = () => {
  movieRecApp.welcomeListener();

  // movieRecApp.getGenreData();
  // movieRecApp.getActorData();
  // movieRecApp.getDirectorData();
  // console.log(movieRecApp.directorList);
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

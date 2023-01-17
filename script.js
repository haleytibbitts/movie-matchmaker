// 1. make namespace object (movieRecApp)
const movieRecApp = {};

// Get today's date, store it in a const
const today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy = today.getFullYear();
const curDate = `${yyyy}-${mm}-${dd}`;

// Our pre-defined date ranges for release years
const curYear = "2023-01-01";
const recentYear = "2020-01-01";
const oldYear = "2000-01-01";
const classicYear = "1950-01-01";
const lowestYear = "1940-01-01";

// set a shortest possible movie runtime for our search
const shortestRuntime = 60;

// set our watch region
const curRegion = "CA";

// Fetch parameters
movieRecApp.url = "https://api.themoviedb.org/3/";
movieRecApp.apiKey = "460ad8448635789cb7af9acdaa3d45f2";
movieRecApp.curIndex = 0;
movieRecApp.curCast = []; // cast of our current recommendation
movieRecApp.curCrew = []; // director of our current recommendation
movieRecApp.curTagLine = "";

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
  popularity: [],
  director: [],
};
movieRecApp.curRecommendation = [];

// Arrays to store fetched data from api
movieRecApp.genreList = [];
movieRecApp.actorList = [];
movieRecApp.directorList = [];

// ********** GENRE QUESTION PAGE **************
// Function to retrieve data from our API
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
      movieRecApp.genreList = jsonResponse.genres;
      movieRecApp.genrePage();
    });
};

// Function to construct the question page for genre
movieRecApp.genrePage = () => {
  // add question container class to page
  movieRecApp.page.classList.add("flex-container");

  // create a form to put all the elements inside
  const questionForm = document.createElement("fieldset");

  // create our question elements, starting with a legend/question
  const questionLegend = document.createElement("legend");
  questionLegend.innerText =
    "If your life were a movie, what genre(s) would it be?";
  questionForm.appendChild(questionLegend);

  // Create div to hold all options
  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("options");
  questionForm.appendChild(optionsDiv);

  // create each checkbox item
  movieRecApp.genreList.forEach((item) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question-item");
    const questionElem = document.createElement("input");
    questionElem.type = "checkbox";
    questionElem.id = item.name;
    questionElem.name = item.name;
    questionElem.value = item.id;
    const questionLabel = document.createElement("label");
    questionLabel.innerText = item.name;
    questionLabel.htmlFor = item.name;

    // put each checkbox item & label into our question div
    questionDiv.appendChild(questionElem);
    questionDiv.appendChild(questionLabel);

    // put this div into our fieldset object
    optionsDiv.appendChild(questionDiv);
  });

  // add our question fieldset to the page
  movieRecApp.page.appendChild(questionForm);

  // create a button to submit
  const qButton = document.createElement("button");
  qButton.innerText = "Next Question";
  const skipButton = document.createElement("button");
  skipButton.innerText = "Skip";
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-div");
  qButton.classList.add("question-item");
  skipButton.classList.add("question-item");

  // add the button to the page
  buttonDiv.appendChild(qButton);
  buttonDiv.appendChild(skipButton);
  movieRecApp.page.appendChild(buttonDiv);

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

  // Create div to hold all options
  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("options");
  questionForm.appendChild(optionsDiv);

  for (let i = 1; i <= 4; i++) {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question-item");
    const questionElem = document.createElement("input");
    const questionLabel = document.createElement("label");
    questionElem.type = "checkbox";

    // put each checkbox item & label into our question div
    questionDiv.appendChild(questionElem);
    questionDiv.appendChild(questionLabel);

    // put this div into our fieldset object
    optionsDiv.appendChild(questionDiv);

    if (i === 1) {
      questionElem.id = questionElem.name = questionLabel.htmlFor = curYear;
      questionElem.value = [curDate, curYear];
      questionLabel.innerText = "Shiny & New";
    } else if (i === 2) {
      questionElem.id = questionElem.name = questionLabel.htmlFor = recentYear;
      questionElem.value = [curYear, recentYear];
      questionLabel.innerText = "Young & Foolish";
    } else if (i === 3) {
      questionElem.id = questionElem.name = questionLabel.htmlFor = oldYear;
      questionElem.value = [recentYear, oldYear];
      questionLabel.innerText = "Well-Aged (Like a Fine Wine)";
    } else if (i === 4) {
      questionElem.id = questionElem.name = questionLabel.htmlFor = classicYear;
      questionElem.value = [oldYear, classicYear];
      questionLabel.innerText = "Classic Film (Old Soul)";
    }
  }

  // add our question fieldset to the page
  movieRecApp.page.appendChild(questionForm);

  // create a button to submit
  const qButton = document.createElement("button");
  qButton.innerText = "Next Question";
  const skipButton = document.createElement("button");
  skipButton.innerText = "Skip";
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-div");
  qButton.classList.add("question-item");
  skipButton.classList.add("question-item");

  // add the button to the page
  buttonDiv.appendChild(qButton);
  buttonDiv.appendChild(skipButton);
  movieRecApp.page.appendChild(buttonDiv);

  // listen for the click
  movieRecApp.questionListener("release");
};

// ********** LANGUAGE QUESTION PAGE **************
movieRecApp.langPage = () => {
  // create a form to put all the elements inside
  const questionForm = document.createElement("fieldset");

  // create our question elements, starting with a legend/question
  const questionLegend = document.createElement("legend");
  questionLegend.innerText = "What is your love language?";
  questionForm.appendChild(questionLegend);

  // Create div to hold all options
  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("options");
  questionForm.appendChild(optionsDiv);

  for (let i = 1; i <= 9; i++) {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question-item");
    const questionElem = document.createElement("input");
    const questionLabel = document.createElement("label");
    questionElem.type = "checkbox";

    // put each checkbox item & label into our question div
    questionDiv.appendChild(questionElem);
    questionDiv.appendChild(questionLabel);

    // put this div into our fieldset object
    optionsDiv.appendChild(questionDiv);

    if (i === 1) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.htmlFor =
          "en";
      questionLabel.innerText = "English";
    } else if (i === 2) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.htmlFor =
          "zh";
      questionLabel.innerText = "Chinese";
    } else if (i === 3) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.htmlFor =
          "fr";
      questionLabel.innerText = "French";
    } else if (i === 4) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.htmlFor =
          "ja";
      questionLabel.innerText = "Japanese";
    } else if (i === 5) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.htmlFor =
          "es";
      questionLabel.innerText = "Spanish";
    } else if (i === 6) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.htmlFor =
          "de";
      questionLabel.innerText = "German";
    } else if (i === 7) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.htmlFor =
          "ko";
      questionLabel.innerText = "Korean";
    } else if (i === 8) {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.htmlFor =
          "hi";
      questionLabel.innerText = "Hindi";
    } else {
      questionElem.id =
        questionElem.name =
        questionElem.value =
        questionLabel.htmlFor =
          "it";
      questionLabel.innerText = "Italian";
    }
  }
  // add our question fieldset to the page
  movieRecApp.page.appendChild(questionForm);

  // create a button to submit
  const qButton = document.createElement("button");
  qButton.innerText = "Next Question";
  const skipButton = document.createElement("button");
  skipButton.innerText = "Skip";
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-div");
  qButton.classList.add("question-item");
  skipButton.classList.add("question-item");

  // add the button to the page
  buttonDiv.appendChild(qButton);
  buttonDiv.appendChild(skipButton);
  movieRecApp.page.appendChild(buttonDiv);

  // listen for the click
  movieRecApp.questionListener("lang");
};

// ********** RUNTIME QUESTION PAGE **************
movieRecApp.runtimePage = () => {
  // create a form
  const questionForm = document.createElement("fieldset");

  // create our question elements, starting with a legend/question
  const questionLegend = document.createElement("legend");
  questionLegend.innerText = "How long is your ideal first date?";
  questionForm.appendChild(questionLegend);

  // Create div to hold all options
  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("options");
  questionForm.appendChild(optionsDiv);

  for (let i = 1; i <= 4; i++) {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question-item");
    const questionElem = document.createElement("input");
    const questionLabel = document.createElement("label");
    questionElem.type = "checkbox";

    // put each checkbox item & label into our question div
    questionDiv.appendChild(questionElem);
    questionDiv.appendChild(questionLabel);

    // put this div into our fieldset object
    optionsDiv.appendChild(questionDiv);

    if (i === 1) {
      questionElem.id =
        questionElem.name =
        questionLabel.innerText =
        questionLabel.htmlFor =
          "Like, an hour (Coffee & a Chat)";
      questionElem.value = 60;
    } else if (i === 2) {
      questionElem.id =
        questionElem.name =
        questionLabel.innerText =
        questionLabel.htmlFor =
          "60 to 90 minutes (Stroll on the Beach)";
      questionElem.value = 90;
    } else if (i === 3) {
      questionElem.id =
        questionElem.name =
        questionLabel.innerText =
        questionLabel.htmlFor =
          "90 to 120 minutes (Dinner & a Movie)";
      questionElem.value = 120;
    } else {
      questionElem.id =
        questionElem.name =
        questionLabel.innerText =
        questionLabel.htmlFor =
          "Let's spend the night together!";
      questionElem.value = 360;
    }
  }
  // add our question fieldset to the page
  movieRecApp.page.appendChild(questionForm);

  // create a button to submit
  const qButton = document.createElement("button");
  qButton.innerText = "Next Question";
  const skipButton = document.createElement("button");
  skipButton.innerText = "Skip";
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-div");
  qButton.classList.add("question-item");
  skipButton.classList.add("question-item");

  // add the button to the page
  buttonDiv.appendChild(qButton);
  buttonDiv.appendChild(skipButton);
  movieRecApp.page.appendChild(buttonDiv);

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
    watch_region: curRegion,
  });

  // Use the constructed URL to fetch a list of genres
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
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
  questionLegend.innerText = "_____ & Chill?";
  questionForm.appendChild(questionLegend);

  // Create div to hold all options
  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("options");
  questionForm.appendChild(optionsDiv);

  // create each checkbox item
  servicesList.forEach((item) => {
    if (item.display_priority <= 10) {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question-item");
      const questionElem = document.createElement("input");
      questionElem.type = "checkbox";
      questionElem.id = questionElem.name = item.provider_name;
      questionElem.value = item.provider_id;
      const questionLabel = document.createElement("label");
      questionLabel.innerText = questionLabel.htmlFor = item.provider_name;

      // put each checkbox item & label into our question div
      questionDiv.appendChild(questionElem);
      questionDiv.appendChild(questionLabel);

      // put this div into our fieldset object
      optionsDiv.appendChild(questionDiv);
    }
  });
  // add our question fieldset to the page
  movieRecApp.page.appendChild(questionForm);

  // create a button to submit
  const qButton = document.createElement("button");
  qButton.innerHTML = `MATCH ME <i class="fa-solid fa-heart"></i>`;
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-div");
  qButton.classList.add("question-item");

  // add the button to the page
  buttonDiv.appendChild(qButton);
  movieRecApp.page.appendChild(buttonDiv);

  // listen for the click
  movieRecApp.questionListener("service");
};

// ********** ACTOR/DIRECTOR DATA RETRIEVAL **************
// Function to retrieve actor/director data from our API
movieRecApp.getActorDirectorData = () => {
  // iterate through our list of recommendations
  const URLs = [];
  movieRecApp.curRecommendation.forEach((item) => {
    // put our movie credit urls into an array
    const url = new URL(`${movieRecApp.url}movie/${item.id}/credits`);
    url.search = new URLSearchParams({
      api_key: movieRecApp.apiKey,
    });
    URLs.push(url);
  });

  // force ourselves to wait for a response from all the API calls(!)
  Promise.all(
    URLs.map(async (url) => {
      const response = await fetch(url);
      return response.json();
    })
  ).then((json) => {
    json.forEach((item) => {
      // if we have any cast, add the first one to our actor list
      if (item.cast.length > 0) {
        const actor = {
          name: item.cast[0].name,
          id: item.cast[0].id,
        };
        movieRecApp.actorList.push(actor);

        // if we're looking at our current recommended movie, add the current cast info to our namespace
        if (item.id == movieRecApp.curRecommendation[movieRecApp.curIndex].id) {
          item.cast.forEach((elem) => {
            movieRecApp.curCast.push(elem.name);
          });
        }
      }

      // iterate through the crew and add the director to our director list
      if (item.crew.length > 0) {
        item.crew.forEach((e) => {
          if (e.job == "Director") {
            const director = {
              name: e.name,
              id: e.id,
            };
            movieRecApp.directorList.push(director);
            if (
              item.id == movieRecApp.curRecommendation[movieRecApp.curIndex].id
            ) {
              movieRecApp.curCrew.push(e.name);
            }
          }
        });
      }
    });

    // get the movie tagline
    movieRecApp.getTagLine();
    // display our movie recommendation
    // movieRecApp.moviePage();
  });
};

// ********** TAGLINE DATA RETRIEVAL **************
// Function to retrieve tagline data from our API
movieRecApp.getTagLine = () => {
  const url = new URL(
    `${movieRecApp.url}movie/${
      movieRecApp.curRecommendation[movieRecApp.curIndex].id
    }`
  );
  url.search = new URLSearchParams({
    api_key: movieRecApp.apiKey,
  });

  // Use the constructed URL to fetch the movie tagline
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      movieRecApp.curTagLine = json.tagline;

      // finally, display our page
      movieRecApp.moviePage();
    });
};

// ********** UPDATE OUR PAGE **************
// Listen for the click on "Next Question", update our recommendation data, and then call the next question
movieRecApp.questionListener = (curPage) => {
  // set up a listener for the click to take us to the next page
  const buttons = document.querySelectorAll("button");
  buttons.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      // grab the selected checkboxes
      const userSelection = document.querySelector("fieldset");

      // write statement to decipher which button is being selected and what to do with each
      if (elem.innerText != "Skip") {
        // iterate over the HTMLCollection node list of the user selection
        for (item of userSelection.elements) {
          if (item.checked) {
            // push the item.value to the proper part of the recommendation data
            if (curPage == "genre") {
              movieRecApp.recommendation.genre.push(item.value);
            } else if (curPage == "release") {
              movieRecApp.recommendation.release.push(item.value);
            } else if (curPage == "lang") {
              movieRecApp.recommendation.lang.push(item.value);
            } else if (curPage == "runtime") {
              movieRecApp.recommendation.runtime.push(item.value);
            } else if (curPage == "service") {
              movieRecApp.recommendation.service.push(item.value);
            } else {
              alert("Page Does Not Exist");
            }
          }
        }
      }

      // clear out the current question
      const page = document.querySelector("#page");
      page.classList.remove("fade-in");
      void page.offsetWidth;
      page.classList.add("fade-in");
      page.innerHTML = "";

      // call the next question page
      if (curPage == "genre") {
        movieRecApp.releasePage();
      } else if (curPage == "release") {
        movieRecApp.langPage();
      } else if (curPage == "lang") {
        movieRecApp.runtimePage();
      } else if (curPage == "runtime") {
        movieRecApp.getServices();
      } else if (curPage == "service") {
        movieRecApp.getRec();
      }
    });
  });
};

// ********** RECOMMENDATION DATA FETCH **************
// Get Recommmendation from our API using our recommendation data
movieRecApp.getRec = () => {
  // set up recommendation data
  const genreData = movieRecApp.recommendation.genre.join();
  const servicesData = movieRecApp.recommendation.service.join();
  //const actorData = movieRecApp.recommendation.lead.join();
  //const directorData = movieRecApp.recommendation.director.join();

  // select a language at random from our user input
  let langData = "";
  if (movieRecApp.recommendation.lang.length > 0) {
    const randomIndex = Math.floor(
      Math.random() * movieRecApp.recommendation.lang.length
    );
    langData = movieRecApp.recommendation.lang[randomIndex];
  }

  // give a shortest possible runtime; add 10% to our selected runtime to give a reasonable option
  let runtimeData = shortestRuntime;
  if (movieRecApp.recommendation.runtime.length > 0) {
    runtimeData = movieRecApp.recommendation.runtime.pop() * 1.1;
  }

  // figure out our earliest and latest date values
  let earlyDate = lowestYear;
  let laterDate = curDate;
  if (movieRecApp.recommendation.release.length > 0) {
    // choose one of our selected options at random
    const randomIndex = Math.floor(
      Math.random() * movieRecApp.recommendation.release.length
    );
    const dates = movieRecApp.recommendation.release[randomIndex].split(",");
    earlyDate = dates[1];
    laterDate = dates[0];
  }

  // initialize url for fetch
  const url = new URL(
    `${movieRecApp.url}discover/movie?api_key=${movieRecApp.apiKey}&with_genres=${genreData}&with_original_language=${langData}&with_watch_providers=${servicesData}&watch_region=${curRegion}&with_runtime.lte=${runtimeData}&release_date.gte=${earlyDate}&release_date.lte=${laterDate}`
  );

  // fetch a recommendation and call recommendation page
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      movieRecApp.curRecommendation = json.results;

      // with our recommendations, we can now set our curIndex and get actor/director data
      if (movieRecApp.curRecommendation.length > 0) {
        movieRecApp.curIndex = Math.floor(
          Math.random() * movieRecApp.curRecommendation.length
        );
        movieRecApp.getActorDirectorData();
      } else {
        movieRecApp.moviePage();
      }
    });
};

// ********** RECOMMENDATION PAGE **************
movieRecApp.moviePage = () => {
  // grab the DOM page element
  const movie = document.querySelector("#page");
  const resultText = document.createElement("h3");
  const movieTitle = document.createElement("h2");
  movieTitle.classList.add("movie-title");
  const movieTag = document.createElement("h3");
  movieTag.classList.add("tagline");

  const movieDiv = document.createElement("div");
  movieDiv.classList.add("movie-info");

  // create image container for poster to help with sizing
  const posterContainer = document.createElement("div");
  posterContainer.classList.add("img-container");
  const moviePoster = document.createElement("img");

  // create text container for movie info to sit beside poster
  const movieText = document.createElement("div");
  movieText.classList.add("text-container");
  const movieRatingDiv = document.createElement("div");
  movieRatingDiv.classList.add("rating");
  const movieRating = document.createElement("p");

  const movieOverview = document.createElement("p");
  const movieStarring = document.createElement("h5");
  movieStarring.innerText = "Starring: ";
  const movieDirBy = document.createElement("h5");
  movieDirBy.innerText = "Directed by: ";

  const movieCast = document.createElement("p");
  const movieCrew = document.createElement("p");

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-div");

  // error handling for our reccomendation page
  if (movieRecApp.curRecommendation.length === 0) {
    // update it with Title / Tag Line / Poster / Cast / Director / Rating / Overview / Streaming Service (or !IN THEATRES NOW!)
    resultText.innerText = "Your standards are too damn high. So you get...";
    movieTitle.innerText = "Cats (2019)";
    movieTag.innerText = `"A Musical Journey Into Terribleness"`;

    moviePoster.src = "./assets/cats-poster.jpg";
    moviePoster.alt = "The poster for the worst movie ever made (Cats).";

    movieRating.innerText = "-99999999";

    movieOverview.innerText = "You have no one to blame but yourself.";
    movieCast.innerText = "Actors with regrets";
    movieCrew.innerText = "God's Negligence";
  } else {
    const curIndex = movieRecApp.curIndex;

    const titleText = movieRecApp.curRecommendation[curIndex].title;
    const releaseYear = movieRecApp.curRecommendation[
      curIndex
    ].release_date.substr(0, 4);
    // update it with Title / Tag Line / Poster / Cast / Director / Rating / Overview / Streaming Service (or !IN THEATRES NOW!)
    resultText.innerText = "Your perfect movie match is...";
    movieTitle.innerText = `${titleText} (${releaseYear})`;
    if (movieRecApp.curTagLine != "") {
      movieTag.innerText = `"${movieRecApp.curTagLine}"`;
    }

    moviePoster.src = `https://image.tmdb.org/t/p/original${movieRecApp.curRecommendation[curIndex].poster_path}`;
    moviePoster.alt = movieRecApp.curRecommendation[curIndex].title;

    movieRating.innerText =
      movieRecApp.curRecommendation[curIndex].vote_average;

    movieOverview.innerText = movieRecApp.curRecommendation[curIndex].overview;

    // Show the full cast if there are 5 or less, otherwise show about half the cast to a max of 10
    let castLength = 0;
    if (movieRecApp.curCast.length <= 5) {
      castLength = movieRecApp.curCast.length;
    } else if (movieRecApp.curCast.length <= 20) {
      castLength = Math.floor(movieRecApp.curCast.length / 2);
    } else {
      castLength = 11;
    }
    castLength = castLength - 1;

    // append the cast into the movieCast.innerText string
    for (let i = 0; i < castLength; i++) {
      movieCast.innerText += movieRecApp.curCast[i] + ", ";
    }
    movieCast.innerText += movieRecApp.curCast[castLength];

    // Add the director's name
    movieCrew.innerText = `${movieRecApp.curCrew[0]}`;

    // create a buttons for new random movie with user params and start over
    const newMatch = document.createElement("button");
    newMatch.innerText = "ANOTHER!";
    newMatch.value = "repeat";
    newMatch.classList.add("question-item");

    // append newMatch button to page
    buttonDiv.appendChild(newMatch);
  }

  if (moviePoster.src != "https://image.tmdb.org/t/p/originalnull") {
    posterContainer.appendChild(moviePoster);
    movieDiv.appendChild(posterContainer);
  }

  const restartButton = document.createElement("button");
  restartButton.innerText = "Restart";
  restartButton.value = "restart";
  restartButton.classList.add("question-item");

  // append movie info to the page
  movieRatingDiv.appendChild(movieRating);
  movieText.appendChild(movieRatingDiv);
  movieText.appendChild(movieOverview);
  if (movieCast.innerText != "undefined") {
    movieStarring.appendChild(movieCast);
    movieText.appendChild(movieStarring);
  }
  if (movieCrew.innerText != "undefined") {
    movieDirBy.appendChild(movieCrew);
    movieText.appendChild(movieDirBy);
  }

  movie.appendChild(resultText);
  movie.appendChild(movieTitle);
  movie.appendChild(movieTag);
  movieDiv.appendChild(movieText);

  movie.appendChild(movieDiv);

  // add the button to the page
  buttonDiv.appendChild(restartButton);
  movie.appendChild(buttonDiv);

  // listen for the click
  movieRecApp.resultListener();

  // const movieServices = document.createElement('p');
};

// Listener for intro page, when we click, we create the first question
movieRecApp.welcomeListener = () => {
  // set up a listener for the submit on the MATCH ME button on our landing page
  const elem = document.querySelector("button");
  elem.addEventListener("click", (e) => {
    // grab welcome page section & remove it
    const welcomePage = document.querySelector("#page");
    welcomePage.classList.remove("fade-in");
    void welcomePage.offsetWidth;
    welcomePage.classList.add("fade-in");
    welcomePage.innerHTML = "";

    // trigger next page load
    movieRecApp.getGenreData();
  });
};

// Listener for recommendation page buttons
movieRecApp.resultListener = () => {
  // set up a listener for the click to take us to the next page
  const movie = document.querySelector("#page");
  const buttons = document.querySelectorAll("button");

  buttons.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      if (e.target.value == "repeat") {
        movie.classList.remove("fade-in");
        void movie.offsetWidth;
        movie.classList.add("fade-in");

        movie.innerHTML = "";
        movieRecApp.curTagLine = "";
        movieRecApp.curCast = [];
        movieRecApp.curCrew = [];
        movieRecApp.getRec();
      } else {
        // reset EVERYTHING
        movie.classList.remove("fade-in");
        void movie.offsetWidth;
        movie.classList.add("fade-in");

        movie.innerHTML = "";
        movieRecApp.curTagLine = "";
        movieRecApp.curCast = [];
        movieRecApp.curCrew = [];
        movieRecApp.actorList = [];
        movieRecApp.directorList = [];
        movieRecApp.recommendation = {
          genre: [],
          release: [],
          runtime: [],
          service: [],
          lead: [],
          lang: [],
          popularity: [],
          director: [],
        };
        movieRecApp.curRecommendation = [];
        movieRecApp.genrePage();
      }
    });
  });
};

// Init function
movieRecApp.init = () => {
  movieRecApp.welcomeListener();
  // movieRecApp.getDirectorData();
};

movieRecApp.init();

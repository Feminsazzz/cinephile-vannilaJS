// Creating the router
const global = {
  currentPage : window.location.pathname ,
}

function highlightActive(){
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) =>{
    if(link.getAttribute('href') === global.currentPage)
    {
      link.classList.add('active');
    }
  })
}

async function displayPopularMovies()
{
  const  { results }  = await fetchAPIData('movie/popular') ;
  console.log(results);

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `<a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />` : `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release Date : ${movie.release_date}</small>
            </p>
          </div>` ;
    document.getElementById('popular-movies').appendChild(div);
  });

}

async function displayPopularTV()
{
  const  { results }  = await fetchAPIData('tv/popular') ;
  console.log(results);

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `<a href="movie-details.html?id=${show.id}">
            ${
              show.poster_path ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />` : `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date : ${show.first_air_date}</small>
            </p>
          </div>` ;
    document.getElementById('popular-shows').appendChild(div);
  });

}

function showspinner(){
  document.querySelector('.spinner').classList.add('show');
}

function hidespinner(){
  document.querySelector('.spinner').classList.remove('show');
}

async function fetchAPIData(endpoint){
  const API_KEY = 'd9a301d86e45f273ffc64747fcdee430' ;
  const API_URL = 'https://api.themoviedb.org/3/' ;

  showspinner();

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();

  hidespinner();
  return data ;
}

function init(){
  switch(global.currentPage){
    case '/cinephile-vannilaJS/' :
    case '/cinephile-vannilaJS/index.html' :
      displayPopularMovies();
      break;
    case '/cinephile-vannilaJS/search.html' :
      console.log('Search') ;
      break ;
    case '/cinephile-vannilaJS/movie-details.html' :
      console.log('Movie Details') ;
      break ;
    case '/cinephile-vannilaJS/shows.html' :
      displayPopularTV();
      break ;
    case '/cinephile-vannilaJS/tv-details.html' :
      console.log('TV Details') ;
      break ;
  }

  highlightActive();
}

document.addEventListener('DOMContentLoaded' , init) ;

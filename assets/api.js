import styles from './styles.jass'
import { Core } from 'rebunssd';
import { map } from 'rebunssd/utilities/Operators/array';
var core = Core
var http = new core.Http();
var movieTemplate = function(props) { 
return (`
  <section class="movie-slider transparent">
    <div class="">
      <p class="category-title">${props.category}</p>
      </div>
  
    <!-- Movie Slider -->
    <div class="slider">
      ${map(props.res, e => {

        return (`
        <div class="slider-item" id="show-modal-button" onclick="showModal(${e.id})">
        
        <img id="show-modal-button" src="https://www.themoviedb.org/t/p/w440_and_h660_face/${e.poster_path}" loading="lazy" alt="${e.original_title}">
        
      </div>
      
<!-- Modal Structure -->
<div class="modal-overlay-${e.id} modal-overlay">
  <div class="modal-content">
    <div class="modal-header">
      <h2>${e.title ? e.title : e.original_name}</h2>
      <button id="close-modal-button-${e.id}" class="close-modal-button" onclick="hideModal(${e.id})">×</button>
    </div>
    <div class="modal-body">
      <div class="modal-poster">
        <img src="https://www.themoviedb.org/t/p/w440_and_h660_face${e.backdrop_path}" alt="Movie Poster">
      </div>
      <p>${e.overview}</p>
    </div>
    <div class="modal-footer">
      <button id="play-button" onclick="playMovie(${e.id})">Play</button>
      <button id="add-to-list-button">Add to List</button>
    </div>
  </div>
</div>
        `)
      }).join("")}
    </div>
  </section>
`)
}


const KEY = '01ad5c3b6f17a1342ca2213318992e7b';

// Poster
http.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${KEY}`, {}).then(res => {
    var el = document.querySelector(".top-10");
    var firstMovie = res.results[Math.floor(Math.random()*20)];
    
    el.innerHTML = (`
      <div class="poster">
        <figure>
          <img src="https://www.themoviedb.org/t/p/w440_and_h660_face/${firstMovie.poster_path}" alt="${firstMovie.title}" loading="lazy">
        </figure>
      </div>
      <div class="bottom">
        <div class="genres">
          <div class="center">
            Mysteries
  <span class="separator">.</span>
  Teens
  <span class="separator">.</span>
  Comedies
  <span class="separator">.</span>
  Fantasies
  <span class="separator">.</span>
  US
  <span class="separator"></span>
</div>
        </div>
        <div class="action transparent">
          <div class="my-list transparent">
            <span class="material-icons md-36 transparent">add</span>
            <p>My List</p>
          </div>
          <div>
<button class="waves-effect waves-dark play-btn flat btn-flat"><i class="material-icons md-dark left transparent md-36">play_arrow</i>
<span class="transparent">
 Play 
</span>
</button>
          </div>
          <div class="info">
            <span class="material-icons-outlined md-24">info</span>
            <p>Info</p>
          </div>
        </div>
      </div>
    `);

})

const baseUrl = 'https://api.themoviedb.org/3';

const categories = [
  { categoryName: 'Now Playing', link: '/movie/now_playing' },
  { categoryName: 'Trending', link: '/trending/all/day' },
  { categoryName: 'Airing Today', link: '/tv/airing_today' },
  { categoryName: 'Popular', link: '/movie/popular' },
  { categoryName: 'Upcoming Movies', link: '/movie/upcoming' },
  { categoryName: 'Top Rated Movies', link: '/movie/top_rated' },
  { categoryName: 'Popular TV Shows', link: '/tv/popular' },
  { categoryName: 'Top Rated TV Shows', link: '/tv/top_rated' }
];

categories.forEach(category => {
  const url = `${baseUrl}${category.link}?api_key=${KEY}&language=en-US&page=1`;
  http.get(url, {}).then(res => {

    var el = document.querySelector('#movie-list');
    el.innerHTML += movieTemplate({
      category: category.categoryName,
      res: res.results,
    });
  });
});

const subheader = document.querySelector('.subheader');
const header = document.querySelector('header');
const content = document.querySelector('.content');
let topOfHeader = header.offsetTop;

window.addEventListener('scroll', function() {
  if (content.scrollTop > topOfHeader) {
    subheader.classList.add('sticky');
    header.classList.add('unfix');
  } else {
    subheader.classList.remove('sticky');
    header.classList.remove('unfix');
  }
});


const showModal = (e) => {
  const modalOverlay = document.querySelector(`.modal-overlay-${e}`);
const closeModalButton = document.querySelector(`#close-modal-button-${e}`);
  modalOverlay.style.display = 'block';
}

const hideModal = (e) => {
 const modalOverlay = document.querySelector(`.modal-overlay-${e}`);
 
const closeModalButton = document.querySelector(`#close-modal-button-${e}`);

  modalOverlay.style.display = 'none';
}

const playMovie = (e) => {
  hideModal(e)
}

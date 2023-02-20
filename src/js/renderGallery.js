export { renderHomeGallery, renderLibraryGallery };
import { FetchMoveApi } from './FetchMove';
import { createHomeCard, createLibraryCard } from './createCard';
import { compileGenreDictionary } from './compileGenreDictionary';

function renderHomeGallery(page) {
  const get_movies = new FetchMoveApi();
  const wrapper = document.querySelector('.wrapper');
  get_movies.getTrendDay(page).then(data => {
    compileGenreDictionary().then(genre_dictionary => {
      data.results.forEach(element => {
        const draft = createHomeCard(element, genre_dictionary);
        wrapper.insertAdjacentHTML('beforeend', draft);
      });
    });
  });
}

const handleLibraryButtonsClick = event => {
  if (event.target.className === 'library__btn watched') {
    renderLibraryWatched();
  }

  if (event.target.className === 'library__btn queue') {
    renderLibraryQueue();
  }
};

function renderLibraryGallery() {
  const buttons = document.querySelector('.library');

  buttons.addEventListener('click', handleLibraryButtonsClick);
}

function renderLibraryWatched() {
  const gallery = document.querySelector('.wrapper');
  let markup = '';
  const data_array = JSON.parse(localStorage.getItem('addedToWatched'));

  data_array.forEach(element => {
    markup += createLibraryCard(element);
  });

  gallery.innerHTML = markup;
}

function renderLibraryQueue() {
  const gallery = document.querySelector('.wrapper');
  const data_array = JSON.parse(localStorage.getItem('addedToQueue'));
  let markup = '';

  data_array.forEach(element => {
    markup += createLibraryCard(element);
  });
  gallery.innerHTML = markup;
}

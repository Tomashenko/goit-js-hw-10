import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector("input#search-box");
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

searchInput.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  name = e.target.value.trim();
  
  if (name === ''){return};
 
  fetchCountries(name)
  .then(renderCountryList)
  .catch(onFetchError)
  };

function renderCountryList (countries) {

  if(countries.length === 1){
    clearMarkupConteiner();

    const cardOfCountry = countries.map(({name, flags, capital, languages, population }) => {
      return `
      <div class="current-country"
       <h2><img src="${flags.png}" alt="flag" width="30" height="30">${name.official}</h2>
      </div>
        <ul class="list-info">
        <li><span class="list-item">Capital: </span> ${capital}</li>
        <li><span class="list-item">Population: </span>${population}</li>
        <li><span class="list-item">Languages: </span>${Object.values(languages)}</li>
        </ul>`;}).join('');

    countryInfo.innerHTML = cardOfCountry;

} else if (2 <= countries.length < 11){
  
  const markup = countries.map(({name, flags}) => {
      return `
      <li class="list"> 
      <img src="${flags.png}" alt="flag" width="30" height="30">
      ${name.official}
      </li>`;}).join('');

    countryList.innerHTML = markup;
};

  if(countries.length > 10) {
    clearMarkupConteiner();
  return  Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
   };
}

function onFetchError(error) {
  Notiflix.Notify.failure("Oops, there is no country with that name");
}

function clearMarkupConteiner() {
  countryList.innerHTML = '';
}

function clearCardOfCountry() {
  cardOfCountry.innerHTML = '';
}






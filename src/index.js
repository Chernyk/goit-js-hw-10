import './css/styles.css';
import debounce from 'lodash.debounce';
import { setMarkupForCountry } from './fetchCountries';
import { setMarkupForCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
onInput = debounce(onInput, DEBOUNCE_DELAY);
let valueInput = '';

refs.input.addEventListener('input', onInput);
function onInput(e) {
  e.preventDefault();
  valueInput = e.target.value.trim();
  if (valueInput === undefined || valueInput === ' ' || valueInput === '') {
    return;
  } else {
    run(valueInput);
  }
}

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
    // if (!response.ok) {
    //   throw new Error(response.status);
    // }
    return response.json();
  });
}
function checkName(counries, inputName) {
  counries.forEach(country => {
    let nameOfInput = inputName.toUpperCase();
    let nameOfCountry = country.name.common.toUpperCase();
    if (nameOfInput === nameOfCountry) {
      const markup = setMarkupForCountry(country);
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = markup;
      return;
    }
  });
}

function renderPokemonCard(countries) {
  if (countries.length > 10) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length <= 10 && countries.length > 1) {
    const markup = setMarkupForCountries(countries);
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = markup;
    checkName(countries, valueInput);
  } else if (countries.length === 1) {
    const markup = setMarkupForCountry(countries[0]);
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = markup;
  } else {
    Notify.failure('Oops, there is no country with that name');
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
  }
}

function run(value) {
  fetchCountries(value)
    .then(renderPokemonCard)
    .catch(error => console.log(error));
}

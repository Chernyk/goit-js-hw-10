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
      clearCountryListHTML();
      refs.countryInfo.innerHTML = markup;
      return;
    }
  });
}
function clearCountryInfoHTML() {
  refs.countryInfo.innerHTML = '';
}
function clearCountryListHTML() {
  refs.countryList.innerHTML = '';
}
function getAndCreateMarkup(countries) {
  if (countries.length > 10) {
    clearCountryInfoHTML();
    clearCountryListHTML();
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length <= 10 && countries.length > 1) {
    const markup = setMarkupForCountries(countries);
    clearCountryInfoHTML();
    refs.countryList.innerHTML = markup;
    checkName(countries, valueInput);
  } else if (countries.length === 1) {
    const markup = setMarkupForCountry(countries[0]);
    clearCountryListHTML();
    refs.countryInfo.innerHTML = markup;
  } else {
    Notify.failure('Oops, there is no country with that name');
    clearCountryInfoHTML();
    clearCountryListHTML();
  }
}

function run(value) {
  fetchCountries(value)
    .then(getAndCreateMarkup)
    .catch(error => console.log(error));
}

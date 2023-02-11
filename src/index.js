import './css/styles.css';
import debounce from 'lodash.debounce';
import { setMarkupForCountry } from './createMarkup';
import { setMarkupForCountries } from './createMarkup';
import { fetchCountries } from './fetchCountries';
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
  clearCountryInfoHTML();
  clearCountryListHTML();
  valueInput = e.target.value.trim();
  if (!valueInput) {
    return;
  }
  fetchCountries(valueInput)
    .then(getAndCreateMarkup)
    .catch(error => Notify.failure('Oops, there is no country with that name'));
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
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length <= 10 && countries.length > 1) {
    const markup = setMarkupForCountries(countries);
    refs.countryList.innerHTML = markup;
    checkName(countries, valueInput);
  } else if (countries.length === 1) {
    const markup = setMarkupForCountry(countries[0]);
    refs.countryInfo.innerHTML = markup;
  }
}

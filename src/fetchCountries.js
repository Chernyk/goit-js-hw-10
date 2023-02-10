export function setMarkupForCountry({
  capital,
  population,
  languages,
  flags: { svg },
  name: { common },
}) {
  return `
  <div class="country-flag">
  <img src="${svg}" alt="${common}">
  <h2 class="name">${common} </h2>
  </div>
  <div class="info-about-country">
  <p class="info">Capital: <span>${capital}</span></p>
  <p class="info">Population: <span>${population}</span></p>
  <p class="info">Languages: <span>${getLanguages(languages)}</span></p>
  </div>
`;
}
function getLanguages(languages) {
  let element = [];
  for (const key in languages) {
    element.push(languages[key]);
  }
  return element;
}
export function setMarkupForCountries(countries) {
  let coun = [];
  countries.forEach(({ flags: { svg }, name: { common } }) => {
    coun.push(`
    <li>
    <img src="${svg}" alt="${common}">
    <h2 class="nameList">${common} </h2>
    </li>
  `);
  });
  return coun.join('');
}

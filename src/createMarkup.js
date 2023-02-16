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
    <p class="info">Languages: <span>${Object.values(languages).join(
      ', '
    )}</span></p>
    </div>
  `;
}
export function setMarkupForCountries(countries) {
  let result = [];
  countries.forEach(({ flags: { svg }, name: { common } }) => {
    result.push(`
      <li>
      <img src="${svg}" alt="${common}">
      <h2 class="nameList">${common} </h2>
      </li>
    `);
  });
  return result.join('');
}

function retrieveCountryDetails(countryName) {
    return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => data[0])
        .catch(error => {
            console.error('Error retrieving country details: ', error);
            throw error;
        });
}

function retrieveRegionCountries(region) {
    return fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error retriving region countries: ', error);
            throw error;
        });
}

function displayCountryDetails(country) {
    const region = country.region;

    document.querySelector('.country-container').innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.png}" 
            alt="${country.name.common} Flag"/>
        <p>Capital: ${country.capital}</p>
        <p>Region: ${region}</p>
        <p>Area: ${country.area} km²</p>
        <p>Languages: 
            ${Object.values(country.languages).join(', ')}</p>
        <p>Population: ${country.population}</p>
    `;
}

function displayRegionCountries(regionCountries) {
    const regionCountriesList = regionCountries.map(country => `
        <div>
            <img src="${country.flags.png}" 
                alt="${country.name.common} Flag"/>
            <p>${country.name.common}</p>
        </div>
    `).join('');
    
    document.querySelector('.countries-region-container').innerHTML = `
        <p>${regionCountriesList}</p>`;
}

function searchTheCountry() {
    const countryName = document.querySelector('#input_search').value;

    retrieveCountryDetails(countryName)
        .then(country => {
            displayCountryDetails(country);
            return retrieveRegionCountries(country.region);
        })
        .then(regionCountries => {
            document.querySelector('.region-title').innerHTML = `
                <h4>Countries in the Same Region</h4>`;
            displayRegionCountries(regionCountries);
        })
        .catch(error => {
            console.error('Searching not successful:', error);
        })
        .finally(() => {
            document.querySelector('#input_search').value = '';
        });
}

export default function fetchCountries(name) {
    const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,languages,population`;

    return fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(...data);
 
    return data; 
});
}


var fetchweather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const waetherCondition = document.querySelector('.condition');
const tempElement = document.querySelector('.temperature');

const locationElement = document.querySelector('.place');



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(search.value);
    locationElement.textContent = "Loading..";
    tempElement.textContent="";
    const locationApi=fetchweather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            console.log(data)
            if(data.error) {
                locationElement.textContent="kya likh diya bhai";
                tempElement.textContent="";
                waetherCondition.textContent="";
            }
            else {
                locationElement.textContent=data.cityName;
                tempElement.textContent=data.temperature;
                waetherCondition.textContent=data.description;
            }
        })
        
    })
})
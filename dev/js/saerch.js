/**
 * Created by 1 on 21.06.2014.
 */
var data = ["ea nisi in pariatur","ut duis et culpa", "velit ipsum occaecat dolore"];


function serchByIngridients (ingridients) {
    var xhr =  new XMLHttpRequest();
    xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q='+city, true);
    xhr.onreadystatechange =  function () {
        if (xhr.readyState != 4)  return ; //return if not complete
        if (xhr.status != 200) {  //check request status
            alert('Error ' + xhr.status + ': ' + xhr.statusText);
            return ;
        }
        showResults(city, xhr.responseText);  // process result
    };
    xhr.send();
}
function showResults (city, data) {
    var weather = JSON.parse(data);
    if (response.style.display !== 'block'){
        response.style.display = 'block';
    }
    insertWeatherRow(city, weather.weather[0].description, weather.main.temp);
    document.getElementById('cityName').value = '';
}
function insertWeatherRow (cityName, desc, temp) {
    var newRow = table.insertRow(table.rows.length);
    var city = newRow.insertCell(o);
    city.innerHTML = cityName;
    var description = newRow.insertCell(1);
    description.innerHTML = desc;
    var tempKelvin = newRow.insertCell(2);
    tempKelvin.innerHTML = temp.toFixed(2);
    var tempCelsius = newRow.insertCell(3);
    tempCelsius.innerHTML = (temp - tempDifference).toFixed(2);
}
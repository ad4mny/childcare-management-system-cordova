var webURL = "https://bondasediahump.000webhostapp.com/";
var token = JSON.parse(localStorage.getItem('token'));

var logout = function () {

    localStorage.clear();
    location.replace('index.html');

};
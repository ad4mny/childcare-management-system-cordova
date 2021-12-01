var webURL = "http://localhost/childcare-management-system/";
var token = JSON.parse(localStorage.getItem('token'));

var logout = function () {

    localStorage.clear();
    location.replace('index.html');

};
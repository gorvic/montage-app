var myApp;

if (window.location.hash && window.location.hash == '#_=_') {
    var cleanHref = window.location.href.split('#')[0];
    history.replaceState(null, null, cleanHref);
}


//or jquery
//create axios instance
var baseRequestURL = 'http://localhost:8080/api';
var ajaxLib = axios.create({
    baseURL: baseRequestURL,
    headers: {'Content-Type': 'application/json'},
});
ajaxLib.defaults.headers.post = {};

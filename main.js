import IndexController from './controllers/index_controller.js'
import FormController from './controllers/form_controller.js'

let routes = {
    index: new IndexController(),
    form: new FormController()
};

const defaultPage = 'index';
window.onhashchange = loadPage;

loadPage();


function loadPage() {
    let page = window.location.hash.substring(1);
    if(!routes[page]) {
        page = defaultPage
    }
    clearApp();
    routes[page].render();
}
function clearApp() {
    document.getElementById('app').innerHTML = '';
}
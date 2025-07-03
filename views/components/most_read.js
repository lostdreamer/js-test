import {pluralize} from "../../utils/functions.js"
import EventBus from "../../services/event_bus.js";

const events = EventBus.getInstance();

class MostRead {
    element;
    articles = [];

    constructor(articles) {
        // make a deep copy so we dont sort the articles of other models
        articles = JSON.parse(JSON.stringify(articles));
        this.articles = articles.sort((a,b) => {
            return b.views - a.views;
        }).slice(0, 5);
    }

    render() {
        this.createRootElement();

        this.addArticles();

        // setTimeout 0 to make sure the DOM is completely loaded before linking events
        setTimeout(() => {
            this.setupListeners();
        }, 0);
    }

    setupListeners() {
        let articleLinks = document.querySelectorAll('#most-read a')
        articleLinks.forEach(link => {
            link.onclick = function(e) {
                events.trigger('add-view', e.target.dataset.article);
            }
        });
    }

    createRootElement() {
        this.element = document.getElementById("most-read-list")
        if(!this.element) {
            document.getElementById("app").innerHTML += `
                <div id="most-read">
                    <h3>Most read articles</h3>
                    <ul id="most-read-list"></ul>
                </div>`;
            this.element = document.getElementById("most-read-list")
        }
        this.element.innerHTML = '';
    }

    addArticles() {
        this.articles.forEach(article => {
            this.element.innerHTML += `
            <li>
                <a target="_blank" href="${article.url}" data-article="${article.id}">${article.title}</a>
                <span class="views">(${article.views} ${ pluralize('view', article.views) })</span>
            </li>`;
        });
    }
}

export default MostRead;

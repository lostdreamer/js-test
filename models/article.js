import SpaceFlightNewsApi from "../services/space_flight_news_api.js";
import Store from "../services/store.js";

const api = new SpaceFlightNewsApi();
const store = new Store();

class Article {
    static instance;
    articles = [];

    static getInstance() {
        if(!this.instance) {
            this.instance = new Article();
        }
        return this.instance;
    }

    get(type, filters) {
        return api[type](filters)
            .then(body => body.results)
            // add Custom articles
            .then(articles => articles.concat(this.filterCustomArticles(filters)))
            // add view counters
            .then(articles => this.refreshViews(articles));
    }

    refreshViews(articles) {
        articles = articles ?? this.articles;
        articles.forEach(article => {
            article.views = store.getViews(article.id)
        })
        return this.articles = articles;
    }

    save(article) {
        let articles = this.getCustomArticles();
        article.id = Math.random().toString(16).slice(2);
        article.news_site = 'custom';
        articles.push(article);
        store.set('custom-articles', JSON.stringify(articles));
    }

    filterCustomArticles(filters) {
        filters = filters ?? {}

        return this.getCustomArticles().filter(article => {
            // check if we have a search query, and if so, if it is found in title / summary
            if(filters.search
                && article.title.indexOf(filters.search) === -1
                && article.summary.indexOf(filters.search) === -1
                ) {
                return false;
            }
            // check if the article was published before published_at_gte
            if(filters.published_at_gte
                && new Date(article.published_at).getTime() < new Date(filters.published_at_gte).getTime()
                ) {
                return false;
            }
            // check if the article was published after published_at_lte
            if(filters.published_at_lte
                && new Date(article.published_at).getTime() > new Date(filters.published_at_lte).getTime()
                ) {
                return false;
            }
            // check if the article has an event
            if(filters.has_event && !article.has_event) {
                return false;
            }
            // check if the article has a launch
            if(filters.has_launch && !article.has_launch) {
                return false;
            }
            // check if the article type matches
            return !(filters.type && filters.type !== article.type);
        });
    }

    getCustomArticles() {
        return JSON.parse(store.get('custom-articles', '[]'))
    }
}

export default Article;

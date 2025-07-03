import Article from "../models/article.js";
import EventBus from "../services/event_bus.js";
import Store from "../services/store.js"
import IndexView from "../views/index.js"
import SpaceXData from "../services/space_x_data.js";

const articles = Article.getInstance();
const spaceX = new SpaceXData();
const events = EventBus.getInstance();
const store = new Store();

export default class {
    title = 'Spaceflight News';
    subTitle = 'Assignment time remaining: '; // x days and x hours x minutes and x seconds
    endDate = new Date('2023-11-03 17:00');

    constructor() {
        this.view = new IndexView(this.title, this.subTitle, this.endDate);
    }

    render() {
        let filters = JSON.parse(store.get('filters', '{"type":"articles"}'));

        let promiseLaunchImage = spaceX.latestLaunchImage();
        let promiseArticles = articles.get(filters.type, filters);

        Promise.all([promiseArticles, promiseLaunchImage]).then(values => {
            return this.view.render(... values);
        }).then(() => {
            setTimeout(() => {
                this.setupListeners();
            }, 0);
        });
    }

    setupListeners() {
        events.on('add-view', (articleId) => {
            store.addView(articleId);
            this.view.render(articles.refreshViews());
        });
        events.on('filters-changed', (filters) => {
            articles.get(filters.type, filters).then(articles => {
                return this.view.render(articles);
            });
        });
    }
}

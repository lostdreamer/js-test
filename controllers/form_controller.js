import EventBus from "../services/event_bus.js";
import FormView from '../views/form.js';
import Article from "../models/article.js";

const articles = Article.getInstance();
const events = EventBus.getInstance();

export default class {

    constructor() {
        this.view = new FormView();
    }

    render() {
        this.view.render();

        events.on('form-submit', data => {
            // create semi unique ID
            data.id = Math.random().toString(16).slice(2);
            articles.save(data);
        })

    }
}

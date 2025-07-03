import EventBus from "../../services/event_bus.js";
const events = EventBus.getInstance();

class ArticleList {
    element;

    articles = [];

    constructor(articles) {
        // make a deep copy so we dont sort the articles of other models
        articles = JSON.parse(JSON.stringify(articles));
        this.articles = articles.sort((a,b) => {
            return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
        });
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
        let articleLinks = document.querySelectorAll('#article-list .content > a')
        articleLinks.forEach(link => {
            link.onclick = e => {
                events.trigger('add-view', e.target.dataset.article);
            }
        });
    }

    addArticles() {
        let publishers = {};
        this.articles.forEach(article => {
            let div = '<div class="article">'
            if (!publishers[article.news_site]) {
                div = '<div class="article first">'
                publishers[article.news_site] = true;
            }
            div += `
                <div class="image"><img src="${article.image_url}" /></div>
                    <div class="content">
                        <a target="_blank" href="${article.url}" data-article="${article.id}">${article.title}</a>
                        <div class="summary">${article.summary}</div>
                        <div class="footer">
                            <span class="news_site">Source: <a>${article.news_site}</a></span>
                            <span class="updated"><span class="text">Last updated:</span> ${ (new Date(article.updated_at)).toLocaleString() }</span>
                        </div>
                    </div>
                </div>`
            this.element.innerHTML += div
        })
    }

    createRootElement() {
        this.element = document.getElementById("article-list")
        if(!this.element) {
            document.getElementById("app").innerHTML += '<div id="article-list"></div>';
        }
        this.element = document.getElementById("article-list")
        this.element.innerHTML = '';
    }
}

export default ArticleList;

import ArticleList from "./components/article_list.js";
import ChipsComponent from "./components/chips.js";
import FiltersComponent from "./components/filters.js";
import HeaderComponent from "./components/header.js";
import MostRead from "./components/most_read.js";
import LaunchImage from "./components/launch_image.js";


class IndexView {
    title;
    subTitle
    endDate
    launchImage
    components = {};

    constructor(title, subTitle, endDate) {
        this.title = title;
        this.subTitle = subTitle;
        this.endDate = endDate;
    }

    render(articles, launchImage) {
        this.launchImage = this.launchImage ?? launchImage;
        let publishers = this.getPublishers(articles);

        this.components['header'] = new HeaderComponent(this.title, this.subTitle, this.endDate, 'form', 'assets/add-article.png');

        this.components['articles'] = new ArticleList(articles);
        this.components['most-read'] = new MostRead(articles);
        this.components['chips'] = new ChipsComponent(publishers);
        this.components['launch-image'] = new LaunchImage(this.launchImage);
        this.components['filters'] = new FiltersComponent();

        this.components['header'].render();
        this.components['chips'].render();
        this.components['filters'].render();
        this.components['articles'].render();
        this.components['most-read'].render();
        this.components['launch-image'].render();
    }

    getPublishers(articles) {
        let publishers = {};
        articles.forEach(article => {
            if (!publishers[article.news_site]) {
                publishers[article.news_site] = 0;
            }
            publishers[article.news_site]++;
        });
        return publishers;
    }
}

export default IndexView;
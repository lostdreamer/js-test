class SpaceFlightNewsApi {
    url = 'https://api.spaceflightnewsapi.net/v4/';

    articles(filters) {
        return fetch(this.createUrl('articles', filters)).then(res => res.json());
    }

    blogs(filters) {
        return fetch(this.createUrl('blogs', filters)).then(res => res.json());
    }

    reports(filters) {
        return fetch(this.createUrl('reports', filters)).then(res => res.json());
    }

    createUrl(page, filters) {
        return this.url + page + '/?' + new URLSearchParams(filters);
    }
}

export default SpaceFlightNewsApi;

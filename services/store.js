class Store {


    addView(articleId) {
        let key = 'count-' + articleId;
        let count = this.get(key, 0);
        this.set(key, ++count);
    }

    getViews(articleId) {
        return this.get('count-' + articleId, 0);
    }

    get(key, defaultValue) {
        let value = localStorage.getItem(key);
        if(!value) value = defaultValue;
        return value;
    }

    set(key, value) {
        return localStorage.setItem(key, value);
    }
}

export default Store;

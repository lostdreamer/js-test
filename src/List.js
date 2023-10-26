export default class List {
    storage;
    loading;
    items = [];

    constructor(storage) {
        this.storage = storage;
        this.load();
    }

    load() {
        if(!this.storage) return;
        this.loading = this.storage.load();
        this.loading.then(items => {
            console.log('loading done', items)
            this.items = items;
        });
    }

    save() {
        if(!this.storage) return;
        console.log('storage.save ', this.items);
        this.loading = this.storage.save(this.items);
        this.loading.then(success => {
            console.log('storage.saved ', success, this.items);
        });
    }

    find(identifier, idKey = 'id') {
        return this.items.find(item => item[idKey] === identifier);
    }

    add(item) {
        this.items.push(item);
        this.save();
    }

    update(identifier, attribute, value, idKey = 'id') {
        const item = this.find(identifier, idKey);
        if(!item) return false;
        item[attribute] = value;
        this.save();
    }

    remove(identifier, idKey = 'id') {
        const item = this.find(identifier, idKey);
        this.items.splice(this.items.indexOf(item), 1);
        this.save();
    }

    forEach(callback) {
        return this.items.forEach(callback);
    }
}
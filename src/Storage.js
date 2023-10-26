class BrowserStorage {
    name;
    storage;
    loading;

    constructor(name, storage) {
        this.name = name;
        this.storage = storage;
    }

    load() {
        this.loading = new Promise(resolve => {
            resolve(JSON.parse(this.storage.getItem(this.name)) ?? []);
        });
        return this.loading;
    }

    save(items) {
        this.loading = new Promise(resolve => {
            this.storage.setItem(this.name, JSON.stringify(items))
            resolve(true);
        });
        return this.loading;
    }
}

class ApiStorage {
    db;
    dataset;
    loading;

    constructor(dataset) {
        this.dataset = dataset;
        this.db = new restdb("653a8a79e38bf880ccc71f9e");
    }

    load() {
        this.loading = new Promise(resolve => {
            this.db.datasets.find({name: this.dataset}, {}, (err, res) => {
                if (!err && res[0]){
                    return resolve(res[0].contents);
                }
                if(!err) {
                    // dataset does not exist yet
                    const dataset = new this.db.datasets({name: this.dataset, contents: []});
                    dataset.save((err, res) => {
                        if(!err) this.load().then(result => resolve(result));
                    });
                }
            });
        });
        return this.loading;
    }

    save(items) {
        return new Promise(resolve => {
            this.db.datasets.find({name: this.dataset}, {}, (err, res) => {
                if (!err && res[0]) {
                    res[0].contents = items;
                    res[0].save();
                    console.log('saved', items);
                }
            });
        });
    }
}

export {ApiStorage, BrowserStorage}
class EventBus {
    static instance;

    listeners = {}

    static getInstance() {
        if(!this.instance) {
            this.instance = new EventBus();
        }
        return this.instance;
    }

    on(eventName, callback) {
        return this.listeners[eventName] = callback;
    }

    trigger(eventName, data) {
        if(this.listeners[eventName]) {
            return this.listeners[eventName](data);
        }
    }
}

export default EventBus;

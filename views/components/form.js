import EventBus from "../../services/event_bus.js";

const events = EventBus.getInstance();

class FormComponent {
    element;

    render() {
        let formWasJustCreated = this.createRootElement();

        // only setup listeners when creating the form for the first time
        // setTimeout 0 to make sure the DOM is completely loaded before linking events
        if(formWasJustCreated) {
            setTimeout(() => {
                this.setupListeners();
            }, 0);
        }
    }

    createRootElement() {
        this.element = document.getElementById("edit-form");
        if (this.element) {
            return false;
        }

        document.getElementById('app').innerHTML += `
            <form id="edit-form">
                <div class="row">
                    <label>Title *</label>
                    <div class="input">
                        <input type="text" id="article-title" required minlength="10">
                    </div>
                </div>
                <div class="row">
                    <label>URL *</label>
                    <div class="input">
                        <input type="url" pattern="http.+" required id="article-url" minlength="10">
                    </div>
                </div>
                <div class="row">
                    <label>Image URL *</label>
                    <div class="input">
                        <input type="text" id="article-image" pattern="http.+" required minlength="10">
                    </div>
                </div>
                <div class="row">
                    <label>Summary *</label>
                    <div class="input">
                        <textarea id="article-summary" required minlength="30"></textarea>
                    </div>
                </div>
                <div class="row">
                    <label>Publish Date *</label>
                    <div class="input">
                        <input type="date" id="article-date" required>
                    </div>
                </div>
                <div class="row">
                    <label>Has event</label>
                    <div class="input">
                        <input type="checkbox" id="article-event">
                    </div>
                </div>
                <div class="row">
                    <label>Has launch</label>
                    <div class="input">
                        <input type="checkbox" id="article-launch">
                    </div>
                </div>
                <input type="submit" id="article-submit" value="Submit">
            </form>`;
        this.element = document.getElementById("edit-form");
        return true;
    }

    setupListeners() {
        this.element.addEventListener('submit', e => {
            let elements = {
                title: document.getElementById('article-title'),
                url: document.getElementById('article-url'),
                image_url: document.getElementById('article-image'),
                summary: document.getElementById('article-summary'),
                updated_at: document.getElementById('article-date'),
                has_event: document.getElementById('article-event'),
                has_launch: document.getElementById('article-launch')
            };
            let keys = Object.keys(elements);
            let data = {};
            keys.forEach(key => {
                if(elements[key].type === 'checkbox') {
                    data[key] = elements[key].checked;
                    elements[key].checked = false;
                } else {
                    data[key] = elements[key].value;
                    elements[key].value = '';
                }
            })
            if(data.updated_at) {
                data.updated_at += 'T12:00:00';
            }
            data.published_at = data.updated_at;

            e.preventDefault();

            events.trigger('form-submit', data);
            return false;
        });
    }
}

export default FormComponent;

import EventBus from "../../services/event_bus.js";
import Store from "../../services/store.js";

const events = EventBus.getInstance();
const store = new Store();

class FiltersComponent {
    elementQuery;
    elementEvent;
    elementLaunch;
    elementDate;
    elementsRadio;

    filters = {
        search: '',
        published_at_gte: null,
        published_at_lte: null,
        has_event: null,
        has_launch: null,
        type: 'articles',
    };

    render() {
        let formWasJustCreated = this.createForm();

        // get the last filter selection from the store
        // or keep the default if there was none in there
        let filters = store.get('filters', JSON.stringify(this.filters));
        this.filters = JSON.parse(filters);

        // only setup listeners when creating the form for the first time
        // setTimeout 0 to make sure the DOM is completely loaded before linking events
        if(formWasJustCreated) {
            setTimeout(() => {
                this.setupListeners();
            }, 0);
        }
    }

    createForm() {
        if(document.getElementById("filters")) {
            return;
        }
        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)

        document.getElementById("app").innerHTML += `
        <div id="filters">
            <div class="title">Filters</div>
            <div id="sections">
                <div class="section">
                    <div class="title">Text search
                        <div class="border-remover"></div>
                    </div>
                    <div class="content">
                        <input type="text" id="filter-search" placeholder="Enter search query">
                    </div>
                </div>
                <div class="section">
                    <div class="title">Events &amp; Launches
                        <div class="border-remover-wide"></div>
                    </div>
                    <div class="content">
                        <label for="type-event">
                            <input id="type-event" type="checkbox">
                            Has Event
                        </label>
                        <label for="type-launch">
                            <input id="type-launch" type="checkbox">
                            Has Launch
                        </label></div>
                </div>
                <div class="section">
                    <div class="title">Article type
                        <div class="border-remover"></div>
                    </div>
                    <div class="content">
                        <label for="type-article">
                            <input id="type-article" type="radio" name="type" value="articles">
                            Articles
                        </label>
                        <label for="type-blog">
                            <input id="type-blog" type="radio" name="type" value="blogs">
                            Blogs
                        </label>
                        <label for="type-report">
                            <input id="type-report" type="radio" name="type" value="reports">
                            Reports
                        </label></div>
                </div>
                <div class="section">
                    <div class="title">Article date
                        <div class="border-remover"></div>
                    </div>
                    <div class="content"><input type="date" id="filter-date" name="date" max="${ tomorrow.toISOString().split('T')[0] }"></div>
                </div>
            </div>
        </div>`;
        return true;
    }

    setupListeners() {
        this.elementQuery = document.getElementById('filter-search');
        this.elementQuery.value = this.filters.search ?? '';
        this.elementQuery.addEventListener('change', e => {
            this.filters.search = e.target.value ?? '';
            this.formChanged();
        })

        this.elementEvent = document.getElementById('type-event');
        this.elementEvent.checked = this.filters.has_event;
        this.elementEvent.addEventListener('change', e => {
            this.filters.has_event = e.target.checked;
            this.formChanged();
        })

        this.elementLaunch = document.getElementById('type-launch');
        this.elementLaunch.checked = this.filters.has_launch;
        this.elementLaunch.addEventListener('change', e => {
            this.filters.has_launch = e.target.checked;
            this.formChanged();
        })

        this.elementDate = document.getElementById('filter-date');
        this.elementDate.value = this.filters.published_at_lte ? this.filters.published_at_lte.split('T')[0] : '';

        this.elementDate.addEventListener('change', e => {
            this.filters.published_at_gte = e.target.value ? e.target.value + 'T00:00:00Z' : '';
            this.filters.published_at_lte = e.target.value ? e.target.value + 'T23:59:59Z' : '';
            this.formChanged();
        })

        this.elementsRadio = document.querySelectorAll('[type=radio]');
        this.elementsRadio.forEach(radio => {
            radio.checked = radio.value === this.filters.type;
            radio.addEventListener('change', e => {
                this.filters.type = e.target.value;
                this.formChanged();
            });
        })
    }

    formChanged() {
        // reports dont have events or launch data
        this.elementEvent.disabled = this.filters.type === 'reports';
        this.elementLaunch.disabled = this.filters.type === 'reports';
        store.set('filters', JSON.stringify(this.filters));
        events.trigger('filters-changed', this.getFilters());
    }

    getFilters() {
        let filters = this.filters;
        let keys = Object.keys(filters);
        keys.forEach(key => {
            if (!filters[key]) {
                delete filters[key];
            }
        });
        return filters;
    }
}

export default FiltersComponent;

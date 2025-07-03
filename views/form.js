import HeaderComponent from "./components/header.js";
import FormComponent from "./components/form.js";

class FormView {
    title = 'Spaceflight News';
    subTitle = 'Add your own news';

    components = {};

    constructor() {
        if(!this.components['header']) {
            this.components['header'] = new HeaderComponent(this.title, this.subTitle, null, 'index', 'assets/article-list.png');
        }
        if(!this.components['form']) {
            this.components['form'] = new FormComponent();
        }
    }

    render() {
        this.components['header'].render();
        this.components['form'].render();
    }

}

export default FormView;
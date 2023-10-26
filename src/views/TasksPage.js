import TaskFormView from "./components/TaskFormView.js";
import TaskListView from "./components/TaskListView.js";

export default class TasksPage {
    events = {};
    tasks;
    elementId;
    element;
    components = {};

    constructor(elementId, tasks) {
        this.elementId = elementId
        this.element = document.getElementById(elementId);
        this.tasks = tasks;
        this.setupListeners();

        this.components.form = new TaskFormView('form', this.events);
        this.components.list = new TaskListView('todo-items', this.events);
    }

    render() {
        this.element.innerHTML = `
        <h1>Task List</h1>
        <div id="form"></div>
        <div id="todo-items"></div>
        `;

        this.components.form.render(this.tasks);
        this.components.list.render(this.tasks);
    }

    setupListeners() {
        this.events = {
            'add': (item) => {
                this.tasks.add(item);
                this.components.list.render(this.tasks);
                this.components.form.clear();
            },
            'delete': (id) => {
                this.tasks.remove(id);
                this.components.list.render(this.tasks);
            },
            'update': (id, state) => {
                this.tasks.update(id, 'completed', state);
                this.components.list.render(this.tasks);
            },
        };
    }
}
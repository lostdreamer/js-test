export default class TaskFormView {
    events;
    elementId;

    constructor(elementId, events) {
        this.events = events;
        this.elementId = elementId
    }

    render() {
        const element = document.getElementById(this.elementId);
        element.innerHTML += `
            <form id="todo-form">
                <label for="item-name">Name</label>
                <input type="text" name="item-name" id="item-name">
                
                <label for="item-description">Description</label>
                <textarea name="item-description" id="item-description"></textarea>
                
                <input type="submit" value="Save">
            </form>
            `;
        this.addListeners();
    }

    clear() {
        document.getElementById('item-name').value = '';
        document.getElementById('item-description').value = '';
    }

    addListeners() {
        const form = document.getElementById('todo-form');
        const newItemName = document.getElementById('item-name');
        const newItemDescription = document.getElementById('item-description');

        form.onsubmit = (event) => {
            event.preventDefault();

            this.events.add({
                id: new Date().getTime(),
                name: newItemName.value,
                description: newItemDescription.value,
                completed: false
            });
        }
    }

}
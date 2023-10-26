export default class TaskListView {
    events;
    elementId;

    constructor(elementId, events) {
        this.events = events;
        this.elementId = elementId
    }

    render(tasks) {
        const element = document.getElementById(this.elementId);
        element.innerHTML = '';
        tasks.forEach(task => {
            const completedClass = task.completed ? 'complete' : 'incomplete';
            const isChecked = task.completed ? 'checked' : '';
            const html = `
                <div class="task ${completedClass}">
                    <input type="checkbox" ${isChecked} class="checkbox" data-task="${task.id}">
                    <button data-task="${task.id}">X</button>
                    <b>${task.name}</b>
                    <p>${task.description}</p>
                </div>`;
            element.innerHTML += html;
        });
        this.addListeners();
    }

    addListeners() {
        const buttons = Array.from(document.querySelectorAll('#' + this.elementId + ' button'));
        buttons.forEach(button => {
            button.onclick = (event) => {
                const id = parseInt(event.target.dataset.task);
                this.events.delete(id)
            }
        });
        const checkboxes = Array.from(document.querySelectorAll('#' + this.elementId + ' input[type=checkbox'));
        checkboxes.forEach(checkbox => {
            checkbox.onclick = (event) => {
                const id = parseInt(event.target.dataset.task);
                this.events.update(id, event.target.checked)
            }
        });
    }

}
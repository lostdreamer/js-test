class ChipsComponent {
    publishers = [];

    constructor(publishers) {
        this.publishers = Object.entries(publishers);
    }

    render() {
        this.createRootElement();

        let html = `
        <div class="block-left">
            <div class="title">Articles from news sites:</div>
        </div>
        <div class="block-right">`;

        this.publishers.forEach(publisher => {
            html += `<div class="chip">${publisher[0]} : ${publisher[1]}</div>`;
        });
        html += '</div>';

        this.element.innerHTML =html;
    }

    createRootElement() {
        this.element = document.getElementById("chips")
        if (!this.element) {
            document.getElementById("app").innerHTML += '<div id="chips"></div>';
            this.element = document.getElementById("chips")
        }
        this.element.innerHTML = '';
    }
}

export default ChipsComponent;

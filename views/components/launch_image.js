class LaunchImage {
    element;
    img;

    constructor(launchImage) {
        this.img = launchImage;
    }

    render() {
        this.createRootElement();
    }

    createRootElement() {
        this.element = document.getElementById("launch-image")
        if(!this.element) {
            document.getElementById("app").innerHTML += `
                <div id="launch-image">
                    <img src="${this.img}" alt="Launch">
                </div>`;
            this.element = document.getElementById("launch-image")
        }
    }
}

export default LaunchImage;

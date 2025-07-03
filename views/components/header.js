import {pluralize} from "../../utils/functions.js"

class HeaderComponent {
    element;

    title = '';
    subTitle = '';
    endDate = new Date();
    link = '';
    linkImage = '';

    constructor(titleText, subTitleText, endDate, link, linkImage) {
        this.title = titleText;
        this.subTitle = subTitleText;
        this.endDate = endDate;
        this.link = link ?? 'form';
        this.linkImage = linkImage;
    }

    render() {
        this.createRootElement();

        if(this.link && this.linkImage) {
            this.element.innerHTML = `<div class="link"><a href="#${this.link}"><img src="${this.linkImage}"></a></div>`;
        }
        this.element.innerHTML += `
            <div class="header-title">${this.title}</div>
            <div class="header-subtitle">${this.subTitle}</div>
        `;

        this.startTimer();
    }

    startTimer() {
        if(!this.endDate) {
            return;
        }
        setInterval(e => {
            let subTitle = document.querySelector("#header > .header-subtitle");
            if(subTitle) subTitle.innerText = this.getDateString();
        }, 100)
    }

    getDateString() {
        let timeLeft = (this.endDate.getTime() - new Date().getTime()) / 1000;
        // calculate (and subtract) days
        let days = Math.floor(timeLeft / 86400);
        timeLeft -= days * 86400;
        // calculate (and subtract) whole hours
        let hours = Math.floor(timeLeft / 3600) % 24;
        timeLeft -= hours * 3600;
        // calculate (and subtract) whole minutes
        let minutes = Math.floor(timeLeft / 60) % 60;
        timeLeft -= minutes * 60;
        // what's left is seconds
        let seconds = Math.floor(timeLeft);

        let response = this.subTitle + " ";
        response += days + " " + pluralize('day', days) + " and "
        response += hours + " " + pluralize('hour', hours) + " "
        response += minutes + " " + pluralize('minute', minutes) + " and ";
        response += seconds + " " + pluralize('second', seconds);
        return response;
    }

    createRootElement() {
        this.element = document.getElementById("header")
        if (!this.element) {
            document.getElementById("app").innerHTML += '<div id="header"></div>';
        }
        this.element = document.getElementById("header")
    }
}

export default HeaderComponent;

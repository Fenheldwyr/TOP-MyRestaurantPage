import "./mvp.css";

class navButton {
    /**
     * 
     * @param {object} navButtonData - holds nav button info
     * @param {string} navButtonData.name - the button's name and inner text
     * @param {JSON} navButtonData.pageJSON - holds the tab's main content
     * @param {HTMLDivElement} navButtonData.contentDiv
     * @param {HTMLButtonElement} button - the button GUI 
     */    
    constructor(navButtonData) {
        this.name = navButtonData.name;
        this.pageJSON = navButtonData.pageJSON;
        this.contentDiv = navButtonData.contentDiv;
        this.button = this.#createHTMLNode(navButtonData);
    }

    /**
     * 
     * @param {object} navButtonData 
     * @returns {HTMLElement}
     */
    #createHTMLNode(navButtonData) {
        const navButton = document.createElement("button");
        navButton.setAttribute("id", navButtonData.name);
        navButton.textContent = navButtonData.name;
        this.#setFunction(navButton);
        return navButton;
    }

    /**
     * 
     * @param {HTMLElement} navButtonNode 
     * @param {navButton} navButtonObj 
     */
    #setFunction(navButtonNode) {
        navButtonNode.addEventListener("click", (e) => {
            this.#switchTabs(e);
        })
    };

    /**
     * 
     * @param {Event} e 
     * @returns {HTMLElement}
     */
    #switchTabs(e) {
        console.log(e);
        const clearedDiv = this.#deleteAllChildren();
        this.#populateTab();
        return this.contentDiv;
    }

    /**
     * 
     */
    #populateTab() {
        const myP = document.createElement("p");
        myP.textContent = this.name;
        this.contentDiv.appendChild(myP);
    }

    /**
     * 
     * @returns {HTMLElement}
     */
    #deleteAllChildren() {
        while (this.contentDiv.firstChild) {
            this.contentDiv.removeChild(this.contentDiv.firstChild);
        }
        return this.contentDiv;
    }
}

const pageBody = document.querySelector("body");

const navDiv = document.createElement("nav");
navDiv.setAttribute("id", "nav");

const contentDiv = document.createElement("main");
contentDiv.setAttribute("id", "content");

pageBody.appendChild(navDiv);
pageBody.appendChild(contentDiv);

const homeButtonData = {
    name: "Home",
    pageJSON: null,
    contentDiv: contentDiv,
}

const menuButtonData = {
    name: "Menu",
    pageJSON: null,
    contentDiv: contentDiv,
}

const contactButtonData = {
    name: "Contact",
    pageJSON: null,
    contentDiv: contentDiv,
}

const homeButton = new navButton(homeButtonData);
const menuButton = new navButton(menuButtonData);
const contactButton = new navButton(contactButtonData);

navDiv.appendChild(homeButton.button);
navDiv.appendChild(menuButton.button);
navDiv.appendChild(contactButton.button);
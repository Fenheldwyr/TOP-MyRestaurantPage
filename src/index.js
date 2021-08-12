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
            this.#switchTabs();
        })
    };

    /**
     * @param {Event} e
     */
    #switchTabs(e) {
        console.log(e);
        const clearedDiv = this.#deleteAllChildren();
        this.#populateTab();
        return this.contentDiv;
    }

    #populateTab() {

    }

    #deleteAllChildren() {
        while (this.contentDiv.firstChild) {
            this.contentDiv.removeChild(this.contentDiv.firstChild);
        }
        return this.contentDiv;
    }
}

const pageBody = document.querySelector("body");
const contentDiv = document.createElement("main");
console.log(contentDiv);
contentDiv.setAttribute("id", "content");
pageBody.appendChild(contentDiv);

const homeButtonData = {
    name: "Home",
    pageJSON: null,
    contentDiv: contentDiv,
}

const homeButton = new navButton(homeButtonData);
contentDiv.appendChild(homeButton.button);
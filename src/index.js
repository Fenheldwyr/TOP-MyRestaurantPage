import "./mvp.css";
import * as homeJSON from "./home.json";
import * as menuJSON from "./menu.json";
import * as contactJSON from "./contact.json";

class navButton {
    constructor(navButtonData) {
        this.ID = navButtonData.ID,
        this.GUI = navButtonData.GUI,
        this.pageJSON = navButtonData.pageJSON
    }
}

class navigation {
    constructor(navigationData) {
        this.contentDiv = navigationData.contentDiv;
        this.navButtonData = navigationData.navButtonData;
        this.navButtons = this.#createButtons(this.navButtonData);
        this.activePage = this.navButtons.homeButton;
    }

    /**
     * 
     * @param {object} navButtonData 
     * @returns {HTMLElement}
     */
     #createButtons(navButtonData) {
        let buttons = {};
        for (const buttonData of navButtonData) {
            const buttonGUI = document.createElement("button");
            buttonGUI.setAttribute("id", buttonData.name);
            buttonGUI.textContent = buttonData.name;
            const buttonObj = new navButton({
                ID: buttonData.name,
                GUI: buttonGUI,
                pageJSON: buttonData.pageJSON,
            })
            this.#setFunction(buttonGUI, buttonObj);
            buttons[buttonData.name] = buttonObj;
        }
        return buttons;
    }

    /**
     * 
     * @param {HTMLElement} navButtonNode 
     * @param {navButton} navButtonObj 
     */
    #setFunction(navButtonNode, navButtonObj) {
        navButtonNode.addEventListener("click", (e) => {
            this.#switchTabs(e, navButtonObj);
        })
    };

    /**
     * updates our website's content with information relevant to the page they have navigated to
     * @param {Event} e 
     * @returns {HTMLElement}
     */
    #switchTabs(e, navButtonObj) {
        console.log(e);
        // don't bother generating the page if it is already on display
        if (this.activePage === navButtonObj.ID) return; 
        const clearedDiv = this.#deleteAllChildren();
        this.#populateTab(navButtonObj.pageJSON);
        this.activePage = navButtonObj.ID;
        return this.contentDiv;
    }

    /**
     * displays our page's contents
     */
    #populateTab(pageJSON) {
        // const myP = document.createElement("p");
        // myP.textContent = this.name;
        // this.contentDiv.appendChild(myP);
        for (const elementKey in pageJSON) {
            const elementData = pageJSON[elementKey];
            const element = this.#makeHTMLElement(elementData);
            if (element) {
                this.contentDiv.appendChild(element);
            }
        }
    }

    #makeHTMLElement(elementData) {
        const id = elementData.id;
        const htmlTag = elementData.htmlTag;
        const styles = elementData.styles;
        const content = elementData.content;

        const element = document.createElement(htmlTag);
        element.setAttribute("id", id);
        element.textContent = content;
        return element;
    }
    
    /**
     * clears the page, ready for new content
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
    pageJSON: homeJSON,
    contentDiv: contentDiv,
}

const menuButtonData = {
    name: "Menu",
    pageJSON: menuJSON,
    contentDiv: contentDiv,
}

const contactButtonData = {
    name: "Contact",
    pageJSON: contactJSON,
    contentDiv: contentDiv,
}

const navBarData = {
    contentDiv: contentDiv,
    navButtonData: [
        homeButtonData,
        menuButtonData,
        contactButtonData
    ],
}

const navigationBar = new navigation(navBarData);

// const homeButton = new navButton(homeButtonData);
// const menuButton = new navButton(menuButtonData);
// const contactButton = new navButton(contactButtonData);

navDiv.appendChild(navigationBar.navButtons.Home.GUI);
navDiv.appendChild(navigationBar.navButtons.Menu.GUI);
navDiv.appendChild(navigationBar.navButtons.Contact.GUI);
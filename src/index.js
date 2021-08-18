import "./mvp.css";
import "./misc.css";
import homeJSON from "./home.json";
import menuJSON from "./menu.json";
import contactJSON from "./contact.json";
function importAll(r) {
    r.keys().forEach(r);
}
// imports all images
importAll(require.context("./images/", true, /\.(png|svg|jpg|jpeg|gif|webp)$/))

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
        for (const elementKey in pageJSON) {
            const elementData = pageJSON[elementKey];
            const element = makeHTMLElement(elementData);
            const parentElement = document.querySelector(`#${elementData.parent}`)
            if (element) {
                parentElement.appendChild(element);
            }
        }
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

function makeHTMLElement(elementData) {
    const id = elementData.id;
    const htmlTag = elementData.htmlTag;
    const styles = elementData.styles;
    const content = elementData.content;
    const src = elementData.src;
    const classes = elementData.classes;

    const element = document.createElement(htmlTag);
    element.setAttribute("id", id);
    element.textContent = content;
    if (src) {
        element.setAttribute("src", src);
    }
    if (Object.keys(styles).length > 0) {
        element.setAttribute("style", styles);
    }
    if (classes) {
        for (const key in classes) {
            element.classList.add(classes[key]);
        }
    }
    return element;
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

navDiv.appendChild(navigationBar.navButtons.Home.GUI);
navDiv.appendChild(navigationBar.navButtons.Menu.GUI);
navDiv.appendChild(navigationBar.navButtons.Contact.GUI);

import "./mvp.css";
import "./misc.css";
import homeJSON from "./home.json";
import menuJSON from "./menu.json";
import contactJSON from "./contact.json";
import navBarJSON from "./nav-bar-data.json";
function importAll(r) {
    r.keys().forEach(r);
}
// imports all images
importAll(require.context("./images/", true, /\.(png|svg|jpg|jpeg|gif|webp)$/))

const _pageJSON = {
    homeJSON: homeJSON,
    menuJSON: menuJSON,
    contactJSON: contactJSON,
}

class navButton {
    constructor(data) {
        this.id = data.id,
        this.gui = data.gui,
        this.pageJSON = this.#getPageJSON(data.pageJSON);
    }

    // retrieves a document containing element data for the page we want to display
    #getPageJSON(id) {
        const pageJSON = _pageJSON[id];
        return pageJSON;
    }
}

/**
 * @property {HTMLElement} contentDiv the container for the page's contents
 * @property {HTMLElement} navBarDiv the container for the page's nav bar
 * @property {Object} buttonData holds raw data about a navigation element
 * @property {Object} buttons holds navButton objects
 * @property {String} activePage tells us what page is currently displayed
 * @property {Object} gui stores nav button GUIs in the order they should be shown
 */
class navigation {
    constructor(navigationData) {
        this.contentDiv = document.querySelector(navigationData.contentDiv);
        this.navBarDiv = document.querySelector("nav");
        this.buttonData = navigationData.buttonData;
        this.buttons = {};
        this.activePage = null;

        for (const buttons in this.buttonData) {
            const buttonObj = this.#createNavElement(this.buttonData[buttons]);
            if (buttonObj) {
                this.buttons[buttonObj.id] = buttonObj;
            }
        };

        this.gui = [
            this.buttons.home.gui,
            this.buttons.menu.gui,
            this.buttons.contact.gui
        ];
    }

    /**
     * displays the navigation bar and its elements
     * @param {HTMLElement} parentElement 
     */
    showNavBar(parentElement = this.navBarDiv) {
        for (const elements in this.gui) {
            parentElement.appendChild(this.gui[elements]);
        }
    }

    /**
     * 
     * @param {String} name name of page to be shown 
     * @returns {navButton}
     */
    showPage(name) {
        if (!name) {
            console.error("page name not provided");
            return;
        }
        if (!(name.toLowerCase() in this.buttons)) {
            console.error("page name not found");
            return;
        }
        this.#switchTabs(null, this.buttons[name]);
        return this.buttons[name];
    }

    /**
     * generates data required to make a navButton object
     * @param {Object} elementData the element's configuration information 
     * @returns {navButton} 
     */
     #createNavElement(elementData) {
        const buttonGUI = makeHTMLElement(elementData);
        const buttonObj = new navButton({
            id: elementData.id,
            gui: buttonGUI,
            pageJSON: elementData.pageJSON
        })
        this.#setFunction(buttonGUI, buttonObj);
        return buttonObj;
    }

    /**
     * 
     * @param {HTMLElement} navGUI the nav button's GUI element
     * @param {navButton} navObj the nav button GUI's owner object
     */
    #setFunction(navGUI, navObj) {
        navGUI.addEventListener("click", (e) => {
            this.#switchTabs(e, navObj);
        })
    };

    /**
     * before we load a page, check whether we need to carry out additional styling work beforehand, and whether to load the page in the first place
     * @param {Event} e the event trigger's information 
     * @param {navButton} navObj the page we are trying to show 
     * @returns {HTMLElement} 
     */
    #switchTabs(e, navObj) {
        console.log(e);
        // don't bother generating the page if it is already on display
        if (this.activePage === navObj.id) return; 
        const clearedDiv = this.#deleteAllChildren();
        if (Object.keys(navObj.pageJSON.meta).length > 0) {
            this.#setSiteProperties(navObj.pageJSON.meta);
        }
        this.#populateTab(navObj.pageJSON.elements);
        this.activePage = navObj.id;
        return this.contentDiv;
    }

    /**
     * sets styles that apply to the whole page, e.g. background images
     * @param {Object} metaJSON configuration for the page
     */
    #setSiteProperties(metaJSON) {
        if ("background" in metaJSON) {
            this.#setBackground(metaJSON.background);
        }
    }

    /**
     * sets a wallpaper to fit on the entire page
     * @param {Object} backgroundJSON 
     */
    #setBackground(backgroundJSON) {
        const parent = document.querySelector(backgroundJSON.parent);
        if ("image" in backgroundJSON) {
            const url = backgroundJSON.image;
            parent.setAttribute("style", `background-image: url(${url})`);
        }
    }

    /**
     * carries out the work needed to generate a web page
     * @param {Object} pageJSON the content and HTML element information needed to display a page
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

/**
 * generates a HTML element from data we have defined in a JSON file
 * @param {Object} elementData configuration data for the element  
 * @returns {HTMLElement}
 */
function makeHTMLElement(elementData) {
    const id = elementData.id;
    const htmlTag = elementData.htmlTag;
    const styles = elementData.styles;
    const content = elementData.content;
    const src = elementData.src;
    const classes = elementData.classes;
    const href = elementData.href;

    const element = document.createElement(htmlTag);
    element.setAttribute("id", id);
    element.textContent = content;
    if (src) {
        element.setAttribute("src", src);
    }
    if (styles && Object.keys(styles).length > 0) {
        element.setAttribute("style", styles);
    }
    if (classes) {
        for (const key in classes) {
            element.classList.add(classes[key]);
        }
    }
    if (htmlTag === "a" && href) {
        element.setAttribute("target", "BLANK");
        element.setAttribute("href", href);
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

const navigationBar = new navigation(navBarJSON);
navigationBar.showNavBar();

navigationBar.showPage("home");

import "@components/themeToggle.js";
import logo from "@assets/osdc_logo.svg?raw";
import stylesString from "@css/components/header.css?inline";
import bellFilledIcon from "@tabler/icons/filled/bell.svg?raw";
import searchOutlineIcon from "@tabler/icons/outline/search.svg?raw";

const headerStyles = new CSSStyleSheet();
headerStyles.replaceSync(stylesString);

export class SiteHeader extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.adoptedStyleSheets = [headerStyles];
	}

	connectedCallback() {
		this.render();
		this.setupEventListeners();
	}

	disconnectedCallback() {
		this.cleanEventListeners();
	}

	render() {
		this.shadowRoot.innerHTML = `
      <header>
        <a href="index.html" class="logo">
          ${logo}
        </a>
        <form class="search-bar" action="/search" method="GET">
          <input type="search" name="q" placeholder="Search..." aria-label="Search">
          <button class="search-btn" type="submit">${searchOutlineIcon}</button>
        </form>
        <div class="actions">
          <button class="notif-btn">${bellFilledIcon}</button>
          <x-theme-toggle></x-theme-toggle>
          <button class="profile-btn">JD</button>
        </div>
      </header>
      `;
	}

	setupEventListeners() {}

	cleanEventListeners() {}
}

customElements.define("x-header", SiteHeader);

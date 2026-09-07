import stylesString from "@css/components/sidebar.css?inline";

import caretOutlineIcon from "@tabler/icons/outline/caret-right.svg?raw";
import categoryOutlineIcon from "@tabler/icons/outline/category.svg?raw";
import hamburgerIcon from "@tabler/icons/outline/menu-2.svg?raw";
import alt from "@tabler/icons/outline/photo-alt.svg?raw";

const sidebarStyles = new CSSStyleSheet();
sidebarStyles.replaceSync(stylesString);

export class Sidebar extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.adoptedStyleSheets = [sidebarStyles];
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
      <aside id="sidebar">
				<ul>
					<li class="sidebar-header">
						<button type="button" id="toggle-btn" aria-label="Toggle Sidebar">
							<span id="hamburger">${hamburgerIcon}</span>
						</button>
					</li>
					<li id="Categories">
						<button type="button" class="dropdown-btn">
							<span>${categoryOutlineIcon}</span>
							<span class="link-text">Categories</span>
							<span class="caret open">${caretOutlineIcon}</span>
						</button>
						<ul class="sub-menu open">
							<li class="link"><span>${alt}</span><a href="#"><span class="link-text">Category 1</span></a></li>
							<li class="link"><span>${alt}</span><a href="#"><span class="link-text">Category 2</span></a></li>
							<li class="link"><span>${alt}</span><a href="#"><span class="link-text">Category 3</span></a></li>
						</ul>
					</li>
				</ul>
			</aside>
    `;
	}

	setupEventListeners() {
		const toggleBtn = this.shadowRoot.querySelector("#toggle-btn");
		const dropdownBtn = this.shadowRoot.querySelector(".dropdown-btn");

		this._handleToggle = () => {
			const sidebar = this.shadowRoot.querySelector("#sidebar");
			const hamburger = this.shadowRoot.querySelector("#hamburger");
			sidebar.classList.toggle("collapsed");
			hamburger.classList.toggle("close");
		};

		this._handleSubMenu = () => {
			const subMenu = this.shadowRoot.querySelector(".sub-menu");
			const caret = this.shadowRoot.querySelector(".caret");
			caret.classList.toggle("open");
			subMenu.classList.toggle("open");
		};

		toggleBtn?.addEventListener("click", this._handleToggle);
		dropdownBtn?.addEventListener("click", this._handleSubMenu);
	}

	cleanEventListeners() {
		const toggleBtn = this.shadowRoot.querySelector("#toggle-btn");
		const dropdownBtn = this.shadowRoot.querySelector(".dropdown-btn");

		toggleBtn?.removeEventListener("click", this._handleToggle);
		dropdownBtn?.removeEventListener("click", this._handleSubMenu);
	}
}

customElements.define("x-sidebar", Sidebar);

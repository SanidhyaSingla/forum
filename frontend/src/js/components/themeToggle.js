import stylesString from "@css/components/themeToggle.css?inline";

const themeToggleStyles = new CSSStyleSheet();
themeToggleStyles.replaceSync(stylesString);

class ThemeToggle extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.adoptedStyleSheets = [themeToggleStyles];
	}

	connectedCallback() {
		this.render();

		this._mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const savedTheme = this.getSavedTheme();
		this.applyTheme(savedTheme);

		const select = this.shadowRoot.querySelector(".theme-toggle");
		if (select) {
			select.value = savedTheme;
		}

		this.setupEventListeners();
	}

	disconnectedCallback() {
		this.cleanEventListeners();
	}

	render() {
		this.shadowRoot.innerHTML = `
      <select class="theme-toggle" name="theme-toggle">
        <option value="system">System</option>
        <option value="light">Light Mode</option>
        <option value="dark">Dark Mode</option>
      </select>
    `;
	}

	// --- Theme Helpers ---
	getSavedTheme() {
		try {
			return localStorage.getItem("theme") || "system";
		} catch {
			return "system";
		}
	}

	setSavedTheme(theme) {
		try {
			localStorage.setItem("theme", theme);
		} catch {}
	}

	applyTheme(theme) {
		if (theme === "system") {
			const systemDark = this._mediaQuery.matches;
			document.documentElement.setAttribute(
				"data-theme",
				systemDark ? "dark" : "light",
			);
		} else {
			document.documentElement.setAttribute("data-theme", theme);
		}
	}

	handleSelectChange = (event) => {
		const newTheme = event.target.value;
		this.setSavedTheme(newTheme);
		this.applyTheme(newTheme);
	};

	handleMediaChange = (event) => {
		if (this.getSavedTheme() === "system") {
			this.applyTheme(event.matches ? "dark" : "light");
		}
	};

	setupEventListeners() {
		const select = this.shadowRoot.querySelector(".theme-toggle");
		select?.addEventListener("change", this.handleSelectChange);
		this._mediaQuery.addEventListener("change", this.handleMediaChange);
	}

	cleanEventListeners() {
		const select = this.shadowRoot.querySelector(".theme-toggle");
		select?.removeEventListener("change", this.handleSelectChange);
		this._mediaQuery.removeEventListener("change", this.handleMediaChange);
	}
}

customElements.define("x-theme-toggle", ThemeToggle);

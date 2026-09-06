import stylesString from "@css/components/my-component.css?inline";

const componentStyles = new CSSStyleSheet();
componentStyles.replaceSync(stylesString);

export class MyComponent extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.adoptedStyleSheets = [componentStyles];
	}

	connectedCallback() {
		this.render();
		this.setupEventListeners();
	}

	disconnectedCallback() {
		this.cleanEventListeners();
	}

	render() {
		this.innerHTML = `<!-- Markup here -->`;
	}

	setupEventListeners() {}

	cleanEventListeners() {}
}

customElements.define("my-component", MyComponent);

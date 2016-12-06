/**
 * External dependencies
 */
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

export default class Component {
	constructor( driver, selector, args = { waitMs: 10000 } ) {
		this.driver = driver;
		this.selector = selector;
		this.waitMs = args.waitMs;

		this.waitElement();
	}

	waitElement() {
		return helper.waitTillPresentAndDisplayed( this.driver, this.selector, this.waitMs );
	}

	displayed() {
		return helper.isEventuallyPresentAndDisplayed( this.driver, this.selector, this.waitMs );
	}
}

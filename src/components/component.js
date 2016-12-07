/**
 * External dependencies
 */
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

export default class Component {
	constructor( driver, selector, args = { wait: true, waitMs: 10000 } ) {
		this.driver = driver;
		this.selector = selector;
		this.waitMs = args.waitMs;

		if ( this.wait ) {
			this.waitElement();
		}
	}

	waitElement() {
		return helper.waitTillPresentAndDisplayed( this.driver, this.selector, this.waitMs );
	}

	displayed() {
		return helper.isEventuallyPresentAndDisplayed( this.driver, this.selector, this.waitMs );
	}
}

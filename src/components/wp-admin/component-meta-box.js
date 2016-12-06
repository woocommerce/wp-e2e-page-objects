/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import Component from '../component';

const TITLE_SELECTOR = 'h2.hndle';
const TOGGLE_SELECTOR = 'button.handlediv';

export default class ComponentMetaBox extends Component {
	constructor( driver, selector ) {
		super( driver, selector );
	}

	getTitle() {
		const selector = By.css( this.selector.value + ' ' + TITLE_SELECTOR );
		return this.driver.findElement( selector ).getText();
	}

	toggle() {
		const selector = By.css( this.selector.value + ' ' + TOGGLE_SELECTOR );
		return helper.clickWhenClickable( selector );
	}
}

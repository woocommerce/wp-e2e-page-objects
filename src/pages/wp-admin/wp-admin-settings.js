/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal Dependencies
 */
import WPAdmin from './wp-admin';

const SAVE_CHANGES_SELECTOR = By.css( '.submit input[type="submit"]' );

const defaultArgs = {
	url: '',
	visit: false,
};

export default class WPAdminSettings extends WPAdmin {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	saveChanges() {
		return helper.clickWhenClickable( this.driver, SAVE_CHANGES_SELECTOR );
	}
}

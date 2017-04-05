/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal Dependencies
 */
import WPAdminSettings from './wp-admin-settings';

const SITE_TITLE_SELECTOR = By.css( '#blogname' );
const TAGLINE_SELECTOR = By.css( '#blogdescription' );
const MEMBERSHIP_SELECTOR = By.css( '#users_can_register' );

const defaultArgs = {
	url: '',
	visit: true,
};

export default class WPAdminSettingsGeneral extends WPAdminSettings {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	setSiteTitle( title ) {
		return helper.setWhenSettable( this.driver, SITE_TITLE_SELECTOR, title );
	}

	setTagline( tagline ) {
		return helper.setWhenSettable( this.driver, TAGLINE_SELECTOR, tagline );
	}

	checkMembership() {
		return helper.setCheckbox( this.driver, MEMBERSHIP_SELECTOR );
	}

	uncheckMembership() {
		return helper.unsetCheckbox( this.driver, MEMBERSHIP_SELECTOR );
	}
}

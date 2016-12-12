/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import Component from '../component';

const MY_ACCOUNT_SELECTOR = By.css( '#wp-admin-bar-my-account' );

export default class ComponentAdminBarMyAccount extends Component {
	constructor( driver, selector = MY_ACCOUNT_SELECTOR ) {
		super( driver, selector, { wait: false } );
	}

	hasSubmenu( submenu ) {
		this.hoverMyAccount();
		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			By.xpath( this._getSubmenuXpathExpression( submenu ) )
		);
	}

	click() {
		return helper.clickWhenClickable( this.driver, MY_ACCOUNT_SELECTOR );
	}

	hoverMyAccount() {
		const el = this.driver.findElement( MY_ACCOUNT_SELECTOR );
		this.driver.actions().mouseMove( el ).perform();
	}

	hoverMyAccountThenClickSubmenu( submenu ) {
		this.hoverMyAccount();
		return helper.clickWhenClickable( this.driver, By.xpath( this._getSubmenuXpathExpression( submenu ) ) );
	}

	_getSubmenuXpathExpression( submenu ) {
		return '//li[@id="wp-admin-bar-my-account"]' +
			`//ul[contains(@class, "ab-submenu")]/li/a[contains(text(), "${ submenu }")]`;
	}
}

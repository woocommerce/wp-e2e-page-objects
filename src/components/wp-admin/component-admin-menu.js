/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import Component from '../component';

const MENU_SELECTOR = By.css( '#adminmenu' );

export default class ComponentAdminMenu extends Component {
	constructor( driver, selector = MENU_SELECTOR ) {
		super( driver, selector, { wait: false } );
	}

	hasMenu( menu ) {
		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			By.xpath( this._getMenuXpathExpression( menu ) )
		);
	}

	hasMenuWithSubmenu( menu, submenu ) {
		// Hover in menu.
		const el = this.driver.findElement( By.xpath( this._getMenuXpathExpression( menu ) ) );
		this.driver.actions().mouseMove( el ).perform();

		return helper.isEventuallyPresentAndDisplayed( this.driver, By.xpath( this._getSubmenuXpathExpression( menu, submenu ) ) );
	}

	click( menu ) {
		const selector = By.xpath(
			this._getMenuXpathExpression( menu )
		);

		return helper.clickWhenClickable( this.driver, selector );
	}

	hoverMenuThenClickSubmenu( menu, submenu ) {
		// Hover in menu.
		const el = this.driver.findElement( By.xpath( this._getMenuXpathExpression( menu ) ) );
		this.driver.actions().mouseMove( el ).perform();

		return helper.clickWhenClickable( this.driver, By.xpath( this._getSubmenuXpathExpression( menu, submenu ) ) );
	}

	_getMenuXpathExpression( menu ) {
		return `//ul[@id="adminmenu"]/li/a[.//div[contains(@class, "wp-menu-name") and contains(text(), "${ menu }")]]`;
	}

	_getSubmenuXpathExpression( menu, submenu ) {
		return '//ul[@id="adminmenu"]' +
			`/li[./a//div[contains(@class, "wp-menu-name") and contains(text(), "${ menu }")]]` +
			`/ul[contains(@class, "wp-submenu")]/li/a[contains(text(), "${ submenu }")]`;
	}
}

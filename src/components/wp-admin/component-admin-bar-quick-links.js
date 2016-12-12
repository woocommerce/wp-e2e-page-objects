/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';

/**
 * Internal dependencies
 */
import ComponentAdminMenu from './component-admin-menu';

const MENU_SELECTOR = By.css( '#wp-admin-bar-root-default' );

export default class ComponentAdminBarQuickLinks extends ComponentAdminMenu {
	constructor( driver, selector = MENU_SELECTOR ) {
		super( driver, selector, { wait: false } );
	}

	_getMenuXpathExpression( menu ) {
		return `//ul[@id="wp-admin-bar-root-default"]/li/a[.//*[contains(text(), "${ menu }")] or contains(text(), "${ menu }")]`;
	}

	_getSubmenuXpathExpression( menu, submenu ) {
		return '//ul[@id="wp-admin-bar-root-default"]' +
			`/li[./a[.//*[contains(text(), "${ menu }")] or contains(text(), "${ menu }")]]` +
			`//ul[contains(@class, "ab-submenu")]/li/a[contains(text(), "${ submenu }")]`;
	}
}

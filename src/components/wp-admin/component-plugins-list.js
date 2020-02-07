/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * External dependencies
 */
import Component from '../component';

const PLUGINS_LIST_SELECTOR = By.css( '#the-list' );
const MESSAGE_DISMISS_SELECTOR = By.css( '#message button' );
const PLUGIN_DELETED_SELECTOR = By.css( '.plugin-deleted-tr' );

export default class ComponentPluginsList extends Component {
	constructor( driver, selector = PLUGINS_LIST_SELECTOR ) {
		super( driver, selector );
	}

	activate( pluginSlug ) {
		return this.perform( pluginSlug, 'activate' );
	}

	deactivate( pluginSlug ) {
		return this.perform( pluginSlug, 'deactivate' );
	}

	delete( pluginSlug ) {
		return this.perform( pluginSlug, 'delete' );
	}

	perform( pluginSlug, action = 'activate' ) {
		const cssSelector = this.getPluginActionCssSelector( pluginSlug, action );
		const actionSelector = By.css( cssSelector );
		const self = this;

		return this.driver.findElement( actionSelector ).
			then( () => {
				switch ( action ) {
					case 'activate':
					case 'deactivate':
						helper.clickWhenClickable( self.driver, actionSelector );
						return helper.clickWhenClickable( self.driver, MESSAGE_DISMISS_SELECTOR );
					case 'delete':
						helper.clickWhenClickable( self.driver, actionSelector );

						// Delete plugin triggers popup.
						self.driver.switchTo().alert().accept();

						return helper.isEventuallyPresentAndDisplayed( self.driver, PLUGIN_DELETED_SELECTOR );
				}
			}, () =>  false );
	}

	getPluginActionCssSelector( pluginSlug, action = 'activate' ) {
		const state = ( action === 'deactivate' ) ? 'active' : 'inactive';
		return `tr.${ state }[data-slug="${ pluginSlug }"] .${ action }`;
	}
}

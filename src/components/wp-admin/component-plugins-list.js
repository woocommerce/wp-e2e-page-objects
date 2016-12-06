/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * External dependencies
 */
import Component from '../component';

const PLUGINS_LIST_SELECTOR = '#the-list';
const MESSAGE_DISMISS_SELECTOR = '#message button';

export default class ComponentPluginsList extends Component {
	constructor( driver, selector = PLUGINS_LIST_SELECTOR ) {
		super( driver, By.css( selector ) );
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
		const dismissSelector = By.css( MESSAGE_DISMISS_SELECTOR );
		const self = this;

		return this.driver.isElementPresent( actionSelector ).
			then( ( located ) => {
				if ( true === located ) {
					switch ( action ) {
						case 'activate':
						case 'deactivate':
							helper.clickWhenClickable( self.driver, actionSelector );
							return helper.clickWhenClickable( self.driver, dismissSelector );
						case 'delete':
							helper.clickWhenClickable( self.driver, actionSelector );

							// Delete plugin triggers popup.
							return self.driver.switchTo().alert().accept();
					}
				}
			} );
	}

	getPluginActionCssSelector( pluginSlug, action = 'activate' ) {
		const state = ( action === 'deactivate' ) ? 'active' : 'inactive';
		return `tr.${ state }[data-slug="${ pluginSlug }"] .${ action }`;
	}
}

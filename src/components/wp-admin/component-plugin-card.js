/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * External dependencies
 */
import Component from '../component';

const INSTALL_SELECTOR = By.css( '.install-now' );
const ACTIVATE_SELECTOR = By.css( '.activate-now' );

export default class ComponentPluginCard extends Component {
	constructor( driver, pluginSlug ) {
		const cardCSS = '.plugin-card-' + pluginSlug;

		super( driver, By.css( cardCSS ) );

		this.cardCSS = cardCSS;
		this.installSelector = By.css( this.cardCSS + ' ' + INSTALL_SELECTOR.value );
		this.activateSelector = By.css( this.cardCSS + ' ' + ACTIVATE_SELECTOR.value );
	}

	install() {
		helper.clickWhenClickable(
			this.driver,
			this.installSelector
		);

		return helper.waitTillPresentAndDisplayed(
			this.driver,
			this.activateSelector,
			120000
		);
	}

	activate() {
		return helper.clickWhenClickable(
			this.driver,
			this.activateSelector
		);
	}
}

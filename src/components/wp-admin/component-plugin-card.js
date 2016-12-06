/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * External dependencies
 */
import Component from '../component';

const INSTALL_SELECTOR = '.install-now';
const ACTIVATE_SELECTOR = '.activate-now';

export default class ComponentPluginCard extends Component {
	constructor( driver, pluginSlug ) {
		const cardCSS = '.plugin-card-' + pluginSlug;

		super( driver, By.css( cardCSS ) );

		this.cardCSS = cardCSS;
	}

	install() {
		helper.clickWhenClickable(
			this.driver,
			By.css( this.cardCSS + ' ' + INSTALL_SELECTOR )
		);

		return helper.waitTillPresentAndDisplayed(
			this.driver,
			By.css( this.cardCSS + ' ' + ACTIVATE_SELECTOR ),
			120000
		);
	}

	activate() {
		return helper.clickWhenClickable(
			this.driver,
			By.css( this.cardCSS + ' ' + ACTIVATE_SELECTOR )
		);
	}
}

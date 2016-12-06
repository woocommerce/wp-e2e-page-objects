/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';

/**
 * Internal dependencies
 */
import Component from '../component';

const WELCOME_PANEL_SELECTOR = '#welcome-panel';

export default class ComponentWelcomePanel extends Component {
	constructor( driver, selector = WELCOME_PANEL_SELECTOR ) {
		super( driver, By.css( selector ) );
	}
}

/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';

/**
 * Internal dependencies
 */
import Component from './component';

const defaultArgs = {
	titleSelector: By.css( '.widget-title' ),
};

export default class ComponentWidget extends Component {
	constructor( driver, selector, args = {} ) {
		super( driver, selector );

		args = Object.assign( defaultArgs, args );

		this.titleSelector = args.titleSelector;
	}

	getTitle() {
		return this.driver.findElement( this.selector ).
			findElement( this.titleSelector ).
			getText();
	}
}

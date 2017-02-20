/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import Component from './component';

const CONTAINER_SELECTOR = By.css( '#respond' );
const COMMENT_SELECTOR = By.css( '#comment' );
const NAME_SELECTOR = By.css( '#author' );
const EMAIL_SELECTOR = By.css( '#email' );
const URL_SELECTOR = By.css( '#url' );
const SUBMIT_SELECTOR = By.css( '[name="submit"]' );

export default class ComponentComment extends Component {
	constructor( driver, selector = CONTAINER_SELECTOR ) {
		super( driver, selector );
	}

	setComment( comment ) {
		helper.mouseMoveTo( this.driver, COMMENT_SELECTOR );
		return helper.setWhenSettable( this.driver, COMMENT_SELECTOR, comment );
	}

	setName( name ) {
		helper.mouseMoveTo( this.driver, NAME_SELECTOR );
		return helper.setWhenSettable( this.driver, NAME_SELECTOR, name );
	}

	setEmail( email ) {
		helper.mouseMoveto( this.driver, EMAIL_SELECTOR );
		return helper.setWhenSettable( this.driver, EMAIL_SELECTOR, email );
	}

	setUrl( url ) {
		helper.mouseMoveTo( this.driver, URL_SELECTOR );
		return helper.setWhenSettable( this.driver, URL_SELECTOR, url );
	}

	submit() {
		helper.mouseMoveTo( this.driver, SUBMIT_SELECTOR );

		// Even after mouseMoveTo, it still not clickable. This seems hacky,
		// but it works by scrolling the page down.
		helper.scrollDown( this.driver );

		return helper.clickWhenClickable( this.driver, SUBMIT_SELECTOR );
	}
}


/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import ComponentMetaBox from './component-meta-box';

const METABOX_SELECTOR = By.css( '#submitdiv' );
const PUBLISH_SELECTOR = By.css( '#publish' );
const MOVE_TO_TRASH_SELECTOR = By.css( '.submitdelete' );

export default class ComponentMetaBoxPublish extends ComponentMetaBox {
	constructor( driver ) {
		super( driver, METABOX_SELECTOR, { wait: false } );
	}

	publish() {
		this.driver.actions().
			mouseMove( this.driver.findElement( PUBLISH_SELECTOR ) ).
			perform();

		return helper.clickWhenClickable( this.driver, PUBLISH_SELECTOR );
	}

	moveToTrash() {
		this.driver.actions().
			mouseMove( this.driver.findElement( MOVE_TO_TRASH_SELECTOR ) ).
			perform();

		return helper.clickWhenClickable( this.driver, MOVE_TO_TRASH_SELECTOR );
	}
}

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
const SAVE_SELECTOR = By.css( '#save-post' );
const PUBLISH_SELECTOR = By.css( '#publish' );
const EDIT_STATUS_SELECTOR = By.css( '.edit-post-status' );
const STATUS_SELECTOR = By.css( '#post_status' );
const SAVE_STATUS_SELECTOR = By.css( '.save-post-status' );
const MOVE_TO_TRASH_SELECTOR = By.css( '.submitdelete' );

export default class ComponentMetaBoxPublish extends ComponentMetaBox {
	constructor( driver ) {
		super( driver, METABOX_SELECTOR, { wait: false } );
	}

	publish() {
		helper.mouseMoveTo( this.driver, PUBLISH_SELECTOR );
		return helper.clickWhenClickable( this.driver, PUBLISH_SELECTOR );
	}

	save() {
		helper.mouseMoveTo( this.driver, SAVE_SELECTOR );
		return helper.clickWhenClickable( this.driver, SAVE_SELECTOR );
	}

	selectStatus( status ) {
		helper.mouseMoveTo( this.driver, EDIT_STATUS_SELECTOR );
		helper.clickWhenClickable( this.driver, EDIT_STATUS_SELECTOR );
		helper.selectOption( this.driver, STATUS_SELECTOR, status );
		return helper.clickWhenClickable( this.driver, SAVE_STATUS_SELECTOR );
	}

	hasStatus( status ) {
		const selector = By.xpath( `//span[@id="post-status-display" and contains(text(), "${ status }")]` );
		return helper.isEventuallyPresentAndDisplayed( this.driver, selector );
	}

	moveToTrash() {
		helper.mouseMoveTo( this.driver, MOVE_TO_TRASH_SELECTOR );
		return helper.clickWhenClickable( this.driver, MOVE_TO_TRASH_SELECTOR );
	}
}

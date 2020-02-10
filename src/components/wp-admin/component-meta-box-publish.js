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
const UPDATE_SELECTOR = By.css( '.editor-post-publish-button' );
const PUBLISH_SELECTOR = By.css( '.editor-post-publish-panel__toggle' );
const DRAFT_SELECTOR = By.css( '.editor-post-save-draft' );

const PENDING_STATUS_SELECTOR = By.css( '#inspector-checkbox-control-1' );
const MOVE_TO_TRASH_SELECTOR = By.css( '.editor-post-trash' );

const STATUS_DRAFT_SELECTOR = By.xpath( '//span[contains(@class, "editor-post-saved-state") and contains(text(), "Saved")]' );
const STATUS_UPDATED_SELECTOR = By.xpath( '//div[contains(@class, "editor-post-publish-panel__header-published") and contains(text(), "Published")]' );
const STATUS_PUBLISHED_SELECTOR = By.xpath( '//button[contains(@class, "editor-post-publish-button") and contains(text(), "Update")]' );
const STATUS_SCHEDULED_SELECTOR = By.xpath( '//button[contains(@class, "editor-post-publish-button") and contains(text(), "Schedule")]' );
const STATUS_PENDING_SELECTOR = By.css( '#inspector-checkbox-control-1[checked]' );

export default class ComponentMetaBoxPublish extends ComponentMetaBox {
	constructor( driver ) {
		super( driver, METABOX_SELECTOR, { wait: false } );
	}

	publish() {
		helper.mouseMoveTo( this.driver, PUBLISH_SELECTOR );
		helper.clickWhenClickable( this.driver, PUBLISH_SELECTOR );

		helper.isEventuallyPresentAndDisplayed(
			this.driver,
			UPDATE_SELECTOR
		);

		return this.save();
	}

	save() {
		helper.mouseMoveTo( this.driver, UPDATE_SELECTOR );
		helper.clickWhenClickable( this.driver, UPDATE_SELECTOR );

		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			STATUS_UPDATED_SELECTOR
		);
	}

	saveDraft() {
		helper.mouseMoveTo( this.driver, DRAFT_SELECTOR );
		helper.clickWhenClickable( this.driver, DRAFT_SELECTOR );

		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			STATUS_DRAFT_SELECTOR
		);
	}

	setPendingReview() {
		helper.mouseMoveTo( this.driver, PENDING_STATUS_SELECTOR );
		helper.clickWhenClickable( this.driver, PENDING_STATUS_SELECTOR );

		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			STATUS_PENDING_SELECTOR
		);
	}

	_getStatusSelector( status ) {
		switch ( status ) {
			case 'Published': return STATUS_PUBLISHED_SELECTOR;
			case 'Draft': return STATUS_DRAFT_SELECTOR;
			case 'Pending Review': return STATUS_PENDING_SELECTOR;
			case 'Scheduled': return STATUS_SCHEDULED_SELECTOR;
		}
	}
	hasStatus( status ) {
		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			this._getStatusSelector( status )
		);
	}

	moveToTrash() {
		helper.mouseMoveTo( this.driver, MOVE_TO_TRASH_SELECTOR );
		return helper.clickWhenClickable( this.driver, MOVE_TO_TRASH_SELECTOR );
	}
}

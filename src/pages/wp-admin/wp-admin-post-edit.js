/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import WPAdmin from './wp-admin';
import ComponentMetaBoxCategories from '../../components/wp-admin/component-meta-box-categories';
import ComponentMetaBoxFormat from '../../components/wp-admin/component-meta-box-publish';
import ComponentMetaBoxPublish from '../../components/wp-admin/component-meta-box-publish'; // eslint-disable-line no-duplicate-imports

const TITLE_SELECTOR = By.css( '.editor-post-title__input' );

export default class WPAdminPostEdit extends WPAdmin {
	constructor( driver, args = {} ) {
		args = Object.assign( { url: '', visit: true, components: {} }, args );
		args.components = Object.assign(
			{
				metaBoxCategories: ComponentMetaBoxCategories,
				metaBoxFormat: ComponentMetaBoxFormat,
				metaBoxPublish: ComponentMetaBoxPublish,
			},
			args.components
		);
		super( driver, args );
	}

	publish() {
		return this.components.metaBoxPublish.publish();
	}

	save() {
		return this.components.metaBoxPublish.save();
	}

	saveDraft() {
		return this.components.metaBoxPublish.saveDraft();
	}

	moveToTrash() {
		return this.components.metaBoxPublish.moveToTrash();
	}

	setTitle( title ) {
		return helper.setWhenSettable( this.driver, TITLE_SELECTOR, title );
	}

	setPendingReview( status ) {
		return this.components.metaBoxPublish.setPendingReview( status );
	}

	hasStatus( status ) {
		return this.components.metaBoxPublish.hasStatus( status );
	}

	addCategory( category ) {
		return this.components.metaBoxCategories.addCategory( category );
	}
}

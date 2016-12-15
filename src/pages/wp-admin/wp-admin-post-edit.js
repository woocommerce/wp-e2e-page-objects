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
import ComponentMetaBoxPublish from '../../components/wp-admin/component-meta-box-publish';

const TITLE_SELECTOR = By.css( '#title' );

export default class WPAdminPostEdit extends WPAdmin {
	constructor( driver, args = {} ) {
		args = Object.assign( { url: '', visit: true, components: {} }, args );
		args.components = Object.assign(
			{
				metaBoxCategories: ComponentMetaBoxCategories,
				metaBoxFormat: ComponentMetaBoxFormat,
				metaBoxPublish: ComponentMetaBoxPublish
			},
			args.components
		);
		super( driver, args );
	}

	publish() {
		return this.components.metaBoxPublish.publish();
	}

	moveToTrash() {
		return this.components.metaBoxPublish.moveToTrash();
	}

	setTitle( title ) {
		return helper.setWhenSettable( this.driver, TITLE_SELECTOR, title );
	}

	addCategory( category ) {
		return this.components.metaBoxCategories.addCategory( category );
	}
}

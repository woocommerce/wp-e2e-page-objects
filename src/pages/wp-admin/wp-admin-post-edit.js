/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import Page from '../page';
import ComponentMetaBoxCategories from '../../components/wp-admin/component-meta-box-categories';
import ComponentMetaBoxFormat from '../../components/wp-admin/component-meta-box-publish';
import ComponentMetaBoxPublish from '../../components/wp-admin/component-meta-box-publish';

const TITLE_SELECTOR = '#title';
const MESSAGE_DISMISS_SELECTOR = '#message button';

const components = {
	metaBoxCategories: ComponentMetaBoxCategories,
	metaBoxFormat: ComponentMetaBoxFormat,
	metaBoxPublish: ComponentMetaBoxPublish
};

const defaultArgs = {
	url: '',
	visit: true,
	components: components
};

export default class WPAdminPostEdit extends Page {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	publish() {
		this.components.metaBoxPublish.publish();

		return helper.clickWhenClickable(
			this.driver,
			By.css( MESSAGE_DISMISS_SELECTOR )
		);
	}

	setTitle( title ) {
		return helper.setWhenSettable( this.driver, By.css( TITLE_SELECTOR ), title );
	}

	addCategory( category ) {
		return this.components.metaBoxCategories.addCategory( category );
	}
}

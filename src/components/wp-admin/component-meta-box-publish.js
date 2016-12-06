/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import ComponentMetaBox from './component-meta-box';

const METABOX_SELECTOR = '#submitdiv';
const PUBLISH_SELECTOR = '#publish';

export default class ComponentMetaBoxPublish extends ComponentMetaBox {
	constructor( driver ) {
		super( driver, By.css( METABOX_SELECTOR ) );
	}

	publish() {
		return helper.clickWhenClickable( this.driver, By.css( PUBLISH_SELECTOR ) );
	}
}

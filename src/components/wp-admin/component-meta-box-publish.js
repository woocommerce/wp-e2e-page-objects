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

export default class ComponentMetaBoxPublish extends ComponentMetaBox {
	constructor( driver ) {
		super( driver, METABOX_SELECTOR );
	}

	publish() {
		return helper.clickWhenClickable( this.driver, PUBLISH_SELECTOR );
	}
}

/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import ComponentMetaBox from './component-meta-box';

const METABOX_SELECTOR = '#formatdiv';

export default class ComponentMetaBoxPublish extends ComponentMetaBox {
	constructor( driver ) {
		super( driver, By.css( METABOX_SELECTOR ) );
	}

	setFormat( format = 'standard' ) {
		return helper.setChecbox( this.driver, By.css( METABOX_SELECTOR + ' .post-format-' + format ) );
	}
}

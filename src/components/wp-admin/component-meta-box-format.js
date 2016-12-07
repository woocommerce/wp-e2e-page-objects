/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import ComponentMetaBox from './component-meta-box';

const METABOX_SELECTOR = By.css( '#formatdiv' );

export default class ComponentMetaBoxPublish extends ComponentMetaBox {
	constructor( driver ) {
		super( driver, METABOX_SELECTOR );
	}

	setFormat( format = 'standard' ) {
		const postFormat = By.css( '.post-format-' + format );
		return helper.setChecbox( this.driver, postFormat );
	}
}

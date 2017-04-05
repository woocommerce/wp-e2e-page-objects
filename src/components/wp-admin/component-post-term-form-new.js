/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import ComponentPostTermFormEdit from './component-post-term-form-edit';

const NAME_SELECTOR = By.css( '#tag-name' );
const SLUG_SELECTOR = By.css( '#tag-slug' );
const DESCRIPTION_SELECTOR = By.css( '#tag-description' );

export default class ComponentPostTermFormNew extends ComponentPostTermFormEdit {
	constructor( driver ) {
		super( driver );
	}

	setName( name ) {
		helper.mouseMoveTo( this.driver, NAME_SELECTOR );
		return helper.setWhenSettable( this.driver, NAME_SELECTOR, name );
	}

	setSlug( slug ) {
		helper.mouseMoveTo( this.driver, SLUG_SELECTOR );
		return helper.setWhenSettable( this.driver, SLUG_SELECTOR, slug );
	}

	setDescription( description ) {
		helper.mouseMoveTo( this.driver, DESCRIPTION_SELECTOR );
		return helper.setWhenSettable( this.driver, DESCRIPTION_SELECTOR, description );
	}
}

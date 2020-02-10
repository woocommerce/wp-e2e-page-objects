/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import ComponentMetaBox from './component-meta-box';

const CATEGORIES_PANEL = By.xpath( '//button[contains(text(), "Categories")]' );
const METABOX_SELECTOR = By.css( '#categorydiv' );
const ADD_NEW_SELECTOR = By.css( '.editor-post-taxonomies__hierarchical-terms-add' );
const NEW_CATEGORY_FIELD_SELECTOR = By.css( '#editor-post-taxonomies__hierarchical-terms-input-0' );
const NEW_CATEGORY_PARENT_SELECTOR = By.css( '#inspector-select-control-1' );
const NEW_CATEGORY_SUBMIT_SELECTOR = By.css( '.editor-post-taxonomies__hierarchical-terms-submit' );

export default class ComponentMetaBoxCategories extends ComponentMetaBox {
	constructor( driver ) {
		super( driver, METABOX_SELECTOR, { wait: false } );
	}

	addCategory( category, parent = '' ) {

		// Open category panel
		helper.clickWhenClickable(
			this.driver,
			CATEGORIES_PANEL
		);

		// Open new category panel after it loads
		helper.waitTillPresentAndDisplayed(
			this.driver,
			ADD_NEW_SELECTOR
		);

		helper.clickWhenClickable(
			this.driver,
			ADD_NEW_SELECTOR
		);

		helper.setWhenSettable(
			this.driver,
			NEW_CATEGORY_FIELD_SELECTOR,
			category
		);

		if ( parent ) {
			const select = this.driver.findElement(
				NEW_CATEGORY_PARENT_SELECTOR
			);

			select.click();
			select.findElement( By.xpath( './option[contains(text(),"' + parent + '")]' ) ).click();
		}

		helper.clickWhenClickable( this.driver, NEW_CATEGORY_SUBMIT_SELECTOR );

		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			By.xpath( `label[@class="components-checkbox-control__label"] and contains(text(), "${ category }")` )
		);
	}
}

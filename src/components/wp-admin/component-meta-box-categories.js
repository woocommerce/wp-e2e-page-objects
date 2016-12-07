/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import ComponentMetaBox from './component-meta-box';

const METABOX_SELECTOR = By.css( '#categorydiv' );
const ADD_NEW_SELECTOR = By.css( '#category-add-toggle' );
const NEW_CATEGORY_FIELD_SELECTOR = By.css( '#newcategory' );
const NEW_CATEGORY_PARENT_SELECTOR = By.css( '#newcategory_parent' );
const NEW_CATEGORY_SUBMIT_SELECTOR = By.css( '#category-add-submit' );

export default class ComponentMetaBoxCategories extends ComponentMetaBox {
	constructor( driver ) {
		super( driver, METABOX_SELECTOR );
	}

	addCategory( category, parent = '' ) {
		helper.clickWhenClickable(
			this.driver,
			ADD_NEW_SELECTOR
		);

		helper.waitTillPresentAndDisplayed(
			this.driver,
			NEW_CATEGORY_FIELD_SELECTOR
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
			By.xpath( `label[@class="selecit"] and contains(text(), "${ category }")` )
		);
	}
}

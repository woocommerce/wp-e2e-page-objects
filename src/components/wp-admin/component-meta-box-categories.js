/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import ComponentMetaBox from './component-meta-box';

const METABOX_SELECTOR = '#categorydiv';
const ADD_NEW_SELECTOR = '#category-add-toggle';
const NEW_CATEGORY_FIELD_SELECTOR = '#newcategory';
const NEW_CATEGORY_PARENT_SELECTOR = '#newcategory_parent';
const NEW_CATEGORY_SUBMIT_SELECTOR = '#category-add-submit';

export default class ComponentMetaBoxCategories extends ComponentMetaBox {
	constructor( driver ) {
		super( driver, By.css( METABOX_SELECTOR ) );
	}

	addCategory( category, parent = '' ) {
		helper.clickWhenClickable(
			this.driver,
			By.css( ADD_NEW_SELECTOR )
		);

		helper.waitTillPresentAndDisplayed(
			this.driver,
			By.css( NEW_CATEGORY_FIELD_SELECTOR )
		);

		helper.setWhenSettable(
			this.driver,
			By.css( NEW_CATEGORY_FIELD_SELECTOR ),
			category
		);

		if ( parent ) {
			const select = this.driver.findElement(
				By.css( NEW_CATEGORY_PARENT_SELECTOR )
			);

			select.click();
			select.findElement( By.css( 'option[value="' + parent + '"]' ) ).click();
		}

		helper.clickWhenClickable( this.driver, By.css( NEW_CATEGORY_SUBMIT_SELECTOR ) );

		return helper.isEventuallyPresentAndDisplayed(
			this.driver,
			By.xpath( `label[@class="selecit"] and contains(text(), "${ category }")` )
		);
	}
}

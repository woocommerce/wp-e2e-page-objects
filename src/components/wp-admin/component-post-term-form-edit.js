/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * External dependencies
 */
import Component from '../component';

const FORM_SELECTOR = By.css( 'form[action="edit-tags.php"]' );
const NAME_SELECTOR = By.css( '#name' );
const SLUG_SELECTOR = By.css( '#slug' );
const PARENT_SELECTOR = By.css( '#parent' );
const DESCRIPTION_SELECTOR = By.css( '#description' );
const SUBMIT_SELECTOR = By.css( '#submit' );

export default class ComponentPostTermFormEdit extends Component {
	constructor( driver, selector = FORM_SELECTOR ) {
		super( driver, selector );
	}

	setName( name ) {
		helper.mouseMoveTo( this.driver, NAME_SELECTOR );
		return helper.setWhenSettable( this.driver, NAME_SELECTOR, name );
	}

	setSlug( slug ) {
		helper.mouseMoveTo( this.driver, SLUG_SELECTOR );
		return helper.setWhenSettable( this.driver, SLUG_SELECTOR, slug );
	}

	selectParent( option ) {
		helper.mouseMoveTo( this.driver, PARENT_SELECTOR );
		return helper.selectOption( this.driver, PARENT_SELECTOR, option );
	}

	setDescription( description ) {
		helper.mouseMoveTo( this.driver, DESCRIPTION_SELECTOR );
		return helper.setWhenSettable( this.driver, DESCRIPTION_SELECTOR, description );
	}

	submit() {
		helper.mouseMoveTo( this.driver, SUBMIT_SELECTOR );
		return helper.clickWhenClickable( this.driver, SUBMIT_SELECTOR );
	}
}

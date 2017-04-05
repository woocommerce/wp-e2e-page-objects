/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import Component from '../component';

const TERMS_LIST_SELECTOR = By.css( '#the-list' );
const SEARCH_INPUT_SELECTOR = By.css( '#tag-search-input' );
const SEARCH_SUBMIT_SELECTOR = By.css( '#search-submit' );

export default class ComponentPostTermsList extends Component {
	constructor( driver, selector = TERMS_LIST_SELECTOR ) {
		super( driver, By.css( selector ) );
	}

	search( keyword ) {
		helper.mouseMoveTo( this.driver, SEARCH_INPUT_SELECTOR );
		helper.setWhenSettable( this.driver, SEARCH_INPUT_SELECTOR, keyword );
		return helper.clickWhenClickable( this.driver, SEARCH_SUBMIT_SELECTOR );
	}

	editTermWithName( name ) {
		this._mouseOverTermName( name );
		return helper.clickWhenClickable( this.driver, this._getTermNameSelector( name ) );
	}

	viewTermWithName( name ) {
		this._mouseOverTermName( name );
		return helper.clickWhenClickable( this.driver, this._getRowActionSelector( name, 'view' ) );
	}

	deleteTermWithName( name ) {
		this._mouseOverTermName( name );
		helper.clickWhenClickable( this.driver, this._getRowActionSelector( name, 'delete' ) );

		// TODO(gedex): Moves this to the helper. wc-e2e-page-objects has helper
		// waitTillAlertAccepted that should be available in wp-e2e-webdriver.
		return this.driver.wait( () => {
			return this.driver.switchTo().alert().then( alert => {
				return alert.accept().then( () => {
					return true;
				} );
			}, () => {
				return false;
			} );
		} );
	}

	_getTermNameSelector( name ) {
		return By.xpath( this._getTermNameXpathExpression( name ) );
	}

	_getRowActionSelector( name, action ) {
		return By.xpath( this._getRowActionXpathExpression( name, action ) );
	}

	_getTermNameXpathExpression( name ) {
		return `//a[@class='row-title' and contains(text(), '${ name }')]`;
	}

	_getRowActionXpathExpression( name, action ) {
		return `//td[(contains(@class, "column-name")) and .${ this._getTermNameXpathExpression( name ) }]` +
			`//*[contains(@class, "${ action }")]/a`;
	}

	_mouseOverTermName( name ) {
		return helper.mouseMoveTo( this.driver, this._getTermNameSelector( name ) );
	}
}

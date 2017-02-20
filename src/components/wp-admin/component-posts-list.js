/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import Component from '../component';

const POSTS_LIST_SELECTOR = By.css( '#posts-filter' );
const SEARCH_INPUT_SELECTOR = By.css( '#post-search-input' );
const SEARCH_SUBMIT_SELECTOR = By.css( '#search-submit' );

export default class ComponentPostsList extends Component {
	constructor( driver, selector = POSTS_LIST_SELECTOR ) {
		super( driver, By.css( selector ) );
	}

	search( keyword ) {
		helper.mouseMoveTo( this.driver, SEARCH_INPUT_SELECTOR );
		helper.setWhenSettable( this.driver, SEARCH_INPUT_SELECTOR, keyword );
		return helper.clickWhenClickable( this.driver, SEARCH_SUBMIT_SELECTOR );
	}

	editPostWithTitle( title ) {
		this._mouseOverPostTitle( title );
		return helper.clickWhenClickable( this.driver, this._getPostTitleSelector( title ) );
	}

	viewPostWithTitle( title ) {
		this._mouseOverPostTitle( title );
		return helper.clickWhenClickable( this.driver, this._getRowActionSelector( title, 'view' ) );
	}

	trashPostWithTitle( title ) {
		this._mouseOverPostTitle( title );
		return helper.clickWhenClickable( this.driver, this._getRowActionSelector( title, 'trash' ) );
	}

	_getPostTitleSelector( title ) {
		return By.xpath( this._getPostTitleXpathExpression( title ) );
	}

	_getRowActionSelector( title, action ) {
		return By.xpath( this._getRowActionXpathExpression( title, action ) );
	}

	_getPostTitleXpathExpression( title ) {
		return `//a[@class='row-title' and text()='${ title }']`;
	}

	_getRowActionXpathExpression( title, action ) {
		return `//td[(contains(@class, "column-title")) and .${ this._getPostTitleXpathExpression( title ) }]` +
			`//*[contains(@class, "${ action }")]/a`;
	}

	_mouseOverPostTitle( title ) {
		return helper.mouseMoveTo( this.driver, this._getPostTitleSelector( title ) );
	}
}

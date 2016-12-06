/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import Component from '../component';

const POSTS_LIST_SELECTOR = '#posts-filter';
const SEARCH_INPUT_SELECTOR = '#post-search-input';
const SEARCH_SUBMIT_SELECTOR = '#search-submit';

export default class ComponentPostsList extends Component {
	constructor( driver, selector = POSTS_LIST_SELECTOR ) {
		super( driver, By.css( selector ) );

		this.searchInput = driver.findElement( By.css( SEARCH_INPUT_SELECTOR ) );
		this.searchSubmit = driver.findElement( By.css( SEARCH_SUBMIT_SELECTOR ) );
	}

	searchPosts( keyword ) {
		helper.setWhenSettable(
			this.driver,
			this.searchInput,
			keyword
		);
	}

	editPostWithTitle( title ) {
		const postTitleSelector = By.xpath( `//a[@class='row-title' and text()='${ title }']` );
		return helper.clickWhenClickable( this.driver, postTitleSelector );
	}
}

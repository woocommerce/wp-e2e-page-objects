/**
 * External dependencies
 */
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import { getPageUrl } from '../page-map';

export default class UserFlow {
	constructor( driver, { baseUrl = 'http://example.com' } ) {
		this.driver = driver;
		this.baseUrl = baseUrl;

		helper.clearCookiesAndDeleteLocalStorage( this.driver );
	}

	open( page, ...args ) {
		if ( 'object' !== typeof page ) {
			throw new Error( 'page should be an object containing `path` and `oject`.' );
		}

		const PageObject = page.object;
		const pageArgs = {
			url: getPageUrl( this.baseUrl, page, ...args ),
			visit: true
		};

		return new PageObject( this.driver, pageArgs );
	}
}

/**
 * External dependencies
 */
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import { PAGE, getPageUrl } from '../page-map';

export default class UserFlow {
	constructor( driver, { baseUrl = 'http://example.com', username = '', password = '' } ) {
		this.driver = driver;
		this.baseUrl = baseUrl;
		this.username = username;
		this.password = password;

		helper.clearCookiesAndDeleteLocalStorage( this.driver );

		const loginPage = this.open( PAGE.WP_LOGIN );
		this.currentPage = loginPage.login( this.username, this.password );
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

		this.currentPage = new PageObject( this.driver, pageArgs );

		return this.currentPage;
	}
}

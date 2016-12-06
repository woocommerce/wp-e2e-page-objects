/**
 * External dependencies
 */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import test from 'selenium-webdriver/testing';
import { WebDriverManager } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import FrontPage from '../src/pages/front-page';

const startBrowserTimeout = 30000;

chai.use( chaiAsPromised );

const assert = chai.assert;

const baseUrl = 'http://wp-e2e.dev';

let manager;
let driver;
let page;
let sidebar;

function buildUrl( path ) {
	return baseUrl + path;
}

test.describe( 'FrontPage has sidebar with widgets', () => {
	test.before( 'Setup browser', function() {
		this.timeout( startBrowserTimeout );

		manager = new WebDriverManager( 'chrome' );
		driver = manager.getDriver();

		page = new FrontPage( driver, { url: buildUrl( '/' ) } );
		sidebar = page.getComponentByName( 'sidebar' );
	} );

	test.it( 'display sidebar when page is loaded', () => {
		assert( sidebar.displayed() );
	} );

	test.describe( 'widgets displayed in the sidebar', () => {
		test.it( 'has recent posts widget', () => {
			assert( sidebar.widgets.recentPosts.displayed() );
		} );

		test.it( 'has recent comments widget', () => {
			assert( sidebar.widgets.recentComments.displayed() );
		} );
	} );

	test.after( () => {
		manager.quitBrowser();
	} );
} );

/**
 * External dependencies
 */
import config from 'config';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import test from 'selenium-webdriver/testing';
import { WebDriverManager } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import { FrontPage } from '../src/index';

const startBrowserTimeout = 30000;

chai.use( chaiAsPromised );

const assert = chai.assert;

let manager;
let driver;
let page;
let sidebar;

test.describe( 'FrontPage', () => {
	test.before( 'Setup browser', function() {
		this.timeout( startBrowserTimeout );

		manager = new WebDriverManager( 'chrome', { baseUrl: config.get( 'url' ) } );
		driver = manager.getDriver();

		page = new FrontPage( driver, { url: manager.getPageUrl( '/' ) } );
		sidebar = page.components.sidebar;
	} );

	test.it( 'display the page with expected title', () => {
		assert.eventually.equal(
			page.titleContains( config.get( 'siteTitle' ) ),
			true,
			`Page title is not "${ config.get( 'siteTitle' ) }"`
		);
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

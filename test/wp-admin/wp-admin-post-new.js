/**
 * External dependencies
 */
import config from 'config';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import test from 'selenium-webdriver/testing';
import { WebDriverManager, WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import { PageMap, WPLogin, WPAdminPostNew } from '../../src/index';

chai.use( chaiAsPromised );

// Shortcut.
const assert = chai.assert;
const PAGE = PageMap.PAGE;
const getPageUrl = PageMap.getPageUrl;

let manager;
let driver;
let page;

test.describe( 'WPAdminPostNew', function() {
	test.before( 'open browser', function() {
		this.timeout( config.get( 'startBrowserTimeoutMs' ) );

		manager = new WebDriverManager( 'chrome' );
		driver = manager.getDriver();
	} );

	this.timeout( config.get( 'mochaTimeoutMs' ) );

	test.before( 'login and goes to new post page', () => {
		helper.clearCookiesAndDeleteLocalStorage( driver );

		const wpLogin = new WPLogin( driver, { url: getPageUrl( config.get( 'url' ), PAGE.WP_LOGIN ) } );
		wpLogin.login(
			config.get( 'users.admin.username' ),
			config.get( 'users.admin.password' )
		);

		page = new WPAdminPostNew( driver, { url: getPageUrl( config.get( 'url' ), PAGE.WP_ADMIN_NEW_POST ) } );
	} );

	test.it( 'can create a new post', () => {
		page.setTitle( 'Test Post' );
		page.addCategory( 'Test Category' );

		// Scroll up.
		driver.executeScript( 'scroll( 0, -250 )' );

		assert.eventually.equal( page.publish(), true );
	} );

	test.after( 'quit browser', () => {
		manager.quitBrowser();
	} );
} );

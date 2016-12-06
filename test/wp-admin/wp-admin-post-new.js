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
import { WPLogin, WPAdminPostNew } from '../../src/index';

chai.use( chaiAsPromised );
const assert = chai.assert;

let manager;
let driver;
let page;

test.before( 'Setup browser', function() {
	this.timeout( config.get( 'startBrowserTimeoutMs' ) );

	manager = new WebDriverManager( 'chrome', { baseUrl: config.get( 'url' ) } );
	driver = manager.getDriver();
} );

test.describe( 'New Post', function() {
	this.timeout( config.get( 'mochaTimeoutMs' ) );

	test.before( 'login and goes to new post page', () => {
		helper.clearCookiesAndDeleteLocalStorage( driver );

		const wpLoginArgs = { url: manager.getPageUrl( '/wp-login.php' ) };
		const wpLogin = new WPLogin( driver, wpLoginArgs );
		wpLogin.login(
			config.get( 'users.admin.username' ),
			config.get( 'users.admin.password' )
		);

		const pageArgs = { url: manager.getPageUrl( '/wp-admin/post-new.php' ) };
		page = new WPAdminPostNew( driver, pageArgs );
	} );

	test.it( 'can create a new post', () => {
		page.setTitle( 'Test Post' );
		page.addCategory( 'Test Category' );

		// Scroll up.
		driver.executeScript( 'scroll( 0, -250 )' );

		assert.eventually.equal( page.publish(), true );
	} );

	test.after( 'Quit browser', () => {
		manager.quitBrowser();
	} );
} );

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
import { WPLogin } from '../../src/index';

chai.use( chaiAsPromised );
const assert = chai.assert;

let manager;
let driver;

test.before( 'Setup browser', function() {
	this.timeout( config.get( 'startBrowserTimeoutMs' ) );

	manager = new WebDriverManager( 'chrome', { baseUrl: config.get( 'url' ) } );
	driver = manager.getDriver();
} );

test.describe( 'Login Page', function() {
	let dashboardPage;

	this.timeout( config.get( 'mochaTimeoutMs' ) );

	test.before( 'clear cookies and localStorage', () => {
		helper.clearCookiesAndDeleteLocalStorage( driver );
	} );

	test.it( 'allows user to log in', () => {
		const wpLogin = new WPLogin( driver, { url: manager.getPageUrl( '/wp-login.php' ) } );
		assert.eventually.equal( wpLogin.titleContains( 'Log In' ), true, 'Page title does not contain "Log In"' );

		dashboardPage = wpLogin.login(
			config.get( 'users.admin.username' ),
			config.get( 'users.admin.password' )
		);
		assert.eventually.equal( dashboardPage.titleContains( 'Dashboard' ), true, 'Page title does not contain "Dashboard"' );
	} );

	test.describe( 'redirects to the dashboard page after logged in', () => {
		test.it( 'has welcome panel in the dashboard', () => {
			assert( dashboardPage.components.welcomePanel.displayed() );
		} );
	} );

	test.after( () => {
		manager.quitBrowser();
	} );
} );

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
import WPLogin from '../../src/pages/wp-admin/wp-login';

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

	test.before( 'clear cookies and localStorage', () => {
		helper.clearCookiesAndDeleteLocalStorage( driver );
	} );

	test.it( 'allows user to log in', () => {
		const wpLogin = new WPLogin( driver, { url: manager.getPageUrl( '/wp-login.php' ) } );
		dashboardPage = wpLogin.login(
			config.get( 'users.admin.username' ),
			config.get( 'users.admin.password' )
		);
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

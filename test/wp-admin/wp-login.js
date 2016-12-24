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
import { PageMap, WPLogin } from '../../src/index';

chai.use( chaiAsPromised );

// Shortcut.
const assert = chai.assert;
const PAGE = PageMap.PAGE;
const getPageUrl = PageMap.getPageUrl;

let manager;
let driver;
let dashboardPage;

test.describe( 'Login Page', function() {
	test.before( 'open browser', function() {
		this.timeout( config.get( 'startBrowserTimeoutMs' ) );

		manager = new WebDriverManager( 'chrome' );
		driver = manager.getDriver();
	} );

	this.timeout( config.get( 'mochaTimeoutMs' ) );

	test.before( 'clear cookies and localStorage', () => {
		helper.clearCookiesAndDeleteLocalStorage( driver );
	} );

	test.it( 'allows user to log in', () => {
		const url = getPageUrl( config.get( 'url' ), PAGE.WP_LOGIN );
		const wpLogin = new WPLogin( driver, { url: url } );
		assert.eventually.equal( wpLogin.titleContains( 'Log In' ), true, 'Page title does not contain "Log In"' );

		dashboardPage = wpLogin.login(
			config.get( 'users.admin.username' ),
			config.get( 'users.admin.password' )
		);
		assert.eventually.equal( dashboardPage.titleContains( 'Dashboard' ), true, 'Page title does not contain "Dashboard"' );
	} );

	test.describe( 'redirects to the dashboard page after logged in', () => {
		test.it( 'has welcome panel in the dashboard', () => {
			assert.eventually.equal(
				dashboardPage.components.welcomePanel.displayed(),
				true,
				'Welcome panel is not displayed in dashboard page'
			);
		} );
	} );

	test.after( 'quit browser', () => {
		manager.quitBrowser();
	} );
} );

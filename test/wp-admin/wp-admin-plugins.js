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
import { PageMap, WPLogin, WPAdminPlugins } from '../../src/index';

chai.use( chaiAsPromised );

// Shortcut.
const assert = chai.assert;
const PAGE = PageMap.PAGE;
const getPageUrl = PageMap.getPageUrl;

let manager;
let driver;
let page;

test.describe( 'Plugins Page', function() {
	test.before( 'open browser', function() {
		this.timeout( config.get( 'startBrowserTimeoutMs' ) );

		manager = new WebDriverManager( 'chrome' );
		driver = manager.getDriver();
	} );

	this.timeout( config.get( 'mochaTimeoutMs' ) );

	test.before( 'login and goes to plugins page', () => {
		helper.clearCookiesAndDeleteLocalStorage( driver );

		const wpLoginArgs = { url: getPageUrl( config.get( 'url' ), PAGE.WP_LOGIN ) };
		const wpLogin = new WPLogin( driver, wpLoginArgs );
		wpLogin.login(
			config.get( 'users.admin.username' ),
			config.get( 'users.admin.password' )
		);

		const pageArgs = { url: getPageUrl( config.get( 'url' ), PAGE.WP_ADMIN_PLUGINS ) };
		page = new WPAdminPlugins( driver, pageArgs );
	} );

	test.it( 'has list of plugins', () => {
		assert( page.components.pluginsList.displayed() );
	} );

	test.it( 'can activate', () => {
		page.deactivate( 'hello-dolly' );

		return assert.eventually.equal(
			page.activate( 'hello-dolly' ),
			true
		);
	} );

	test.it( 'can deactivate', () => {
		page.activate( 'hello-dolly' );

		return assert.eventually.equal(
			page.deactivate( 'hello-dolly' ),
			true
		);
	} );

	test.it( 'redirect to plugin install page when clicking Add New', () => {
		const installPage = page.add();

		return assert.eventually.equal(
			installPage.components.filter.displayed(),
			true
		);
	} );

	test.after( 'quit browser', () => {
		manager.quitBrowser();
	} );
} );

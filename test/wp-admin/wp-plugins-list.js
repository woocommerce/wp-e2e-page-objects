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
import WPAdminPlugins from '../../src/pages/wp-admin/wp-admin-plugins';

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

test.describe( 'Plugins Page', function() {
	this.timeout( config.get( 'mochaTimeoutMs' ) );

	test.before( 'login and goes to plugins page', () => {
		helper.clearCookiesAndDeleteLocalStorage( driver );

		const wpLoginArgs = { url: manager.getPageUrl( '/wp-login.php' ) };
		const wpLogin = new WPLogin( driver, wpLoginArgs );
		wpLogin.login(
			config.get( 'users.admin.username' ),
			config.get( 'users.admin.password' )
		);

		const pageArgs = { url: manager.getPageUrl( '/wp-admin/plugins.php' ) };
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

	test.after( () => {
		manager.quitBrowser();
	} );
} );

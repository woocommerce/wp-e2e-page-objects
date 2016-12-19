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
import { PageMap, UserFlow } from '../../src/index';

chai.use( chaiAsPromised );

// Shortcut.
const assert = chai.assert;
const PAGE = PageMap.PAGE;

let manager;
let driver;

test.before( 'Setup browser', function() {
	this.timeout( config.get( 'startBrowserTimeoutMs' ) );

	manager = new WebDriverManager( 'chrome', { baseUrl: config.get( 'url' ) } );
	driver = manager.getDriver();
} );

test.describe( 'UserFlow', function() {
	this.timeout( config.get( 'mochaTimeoutMs' ) );

	test.it( 'allows to open any /wp-admin/ page and returns its page object', () => {
		const flowArgs = {
			baseUrl: config.get( 'url' ),
			username: config.get( 'users.admin.username' ),
			password: config.get( 'users.admin.password' )
		};
		const userFlow = new UserFlow( driver, flowArgs );

		const settingsPage = userFlow.open( PAGE.WP_ADMIN_SETTINGS_GENERAL );
		settingsPage.checkMembership();
		settingsPage.saveChanges();

		assert.eventually.ok( settingsPage.hasNotice( 'Settings saved.' ) );
	} );

	test.after( () => {
		manager.quitBrowser();
	} );
} );
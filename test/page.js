/**
 * External dependencies
 */
import config from 'config';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import test from 'selenium-webdriver/testing';
import { WebDriverManager } from 'wp-e2e-webdriver';
import untrailingslashit from 'remove-trailing-slash';

/**
 * Internal dependencies
 */
import { Page } from '../src/index';

chai.use( chaiAsPromised );

// Shortcut.
const assert = chai.assert;

let manager;
let driver;
let page;

test.describe( 'Page', function() {
	test.before( 'Setup browser', function() {
		this.timeout( config.get( 'startBrowserTimeoutMs' ) );

		manager = new WebDriverManager( 'chrome' );
		driver = manager.getDriver();

		page = new Page( driver, { url: config.get( 'url' ) } );
	} );

	this.timeout( config.get( 'mochaTimeoutMs' ) );

	test.it( 'getCurrentUrl returns current URL', () => {
		const expect = untrailingslashit( config.get( 'url' ) );
		const actual = page.getCurrentUrl().then( ( url ) => {
			return untrailingslashit( url );
		}, () => {
			return false;
		} );

		assert.eventually.equal(
			actual,
			expect,
		);
	} );

	test.it( 'getTitle returns current page title', () => {
		const expect = config.get( 'siteTitle' ) + ' – Just another WordPress site';
		const actual = page.getTitle();

		assert.eventually.equal(
			actual,
			expect
		);
	} );

	test.it( 'titleContains checks if passed pattern matches current page title', () => {
		assert.eventually.ok(
			page.titleContains( config.get( 'siteTitle' ) )
		);

		assert.eventually.ok(
			page.titleContains( 'Just another WordPress site' )
		);

		assert.eventually.notOk(
			page.titleContains( 'not the right title' )
		);
	} );

	test.it( 'hasText check if passed text appears in current page', () => {
		assert.eventually.ok(
			page.hasText( 'Just another WordPress site' )
		);

		assert.eventually.ok(
			page.hasText( 'Proudly powered by WordPress' )
		);

		assert.eventually.notOk(
			page.hasText( 'does not exist in current page' )
		);
	} );

	test.it( 'visit will open new URL based on instance.url', () => {
		page.url = 'https://automattic.com/work-with-us/';
		page.visit();

		assert.eventually.ok(
			page.titleContains( 'Work With Us' )
		);
	} );

	test.after( () => {
		manager.quitBrowser();
	} );
} );

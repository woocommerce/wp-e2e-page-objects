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
import { PageMap, UserFlow } from '../src/index';

const startBrowserTimeout = 30000;

chai.use( chaiAsPromised );

// Shortcut.
const assert = chai.assert;
const PAGE = PageMap.PAGE;

const userFlowArgs = {
	baseUrl: config.get( 'url' ),
	username: config.get( 'users.admin.username' ),
	password: config.get( 'users.admin.password' )
};
const testPost = {
	title: 'Test post ' + new Date().getTime()
};

let manager;
let driver;
let user;

test.describe( 'SinglePage', function() {
	// open browser
	test.before( function() {
		this.timeout( startBrowserTimeout );

		manager = new WebDriverManager( 'chrome', { baseUrl: config.get( 'url' ) } );
		driver = manager.getDriver();
	} );

	this.timeout( config.get( 'mochaTimeoutMs' ) );

	// create post
	test.before( () => {
		user = new UserFlow( driver, userFlowArgs );
		user.createPost( testPost );
	} );

	test.it( 'allows you to comment as logged-in user', () => {
		const comment = 'Test comment ' + new Date().getTime();
		assert.eventually.ok( user.addComment( testPost.title, comment ) );

		const postsList = user.open( PAGE.WP_ADMIN_POSTS );
		const page = postsList.viewPostWithTitle( testPost.title );

		assert.eventually.ok( page.hasText( comment ) );
	} );

	// quit browser
	test.after( () => {
		manager.quitBrowser();
	} );
} );

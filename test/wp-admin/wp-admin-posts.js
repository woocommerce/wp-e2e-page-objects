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

const userFlowArgs = {
	baseUrl: config.get( 'url' ),
	username: config.get( 'users.admin.username' ),
	password: config.get( 'users.admin.password' )
};
const testPosts = [
	{ title: 'Test post ' + new Date().getTime() + ' #1' },
	{ title: 'Test post ' + new Date().getTime() + ' #2' },
];

let manager;
let driver;

test.describe( 'WPAdminPosts', function() {
	test.before( 'open browser', function() {
		this.timeout( config.get( 'startBrowserTimeoutMs' ) );

		manager = new WebDriverManager( 'chrome', { baseUrl: config.get( 'url' ) } );
		driver = manager.getDriver();
	} );

	this.timeout( config.get( 'mochaTimeoutMs' ) );

	test.before( 'create posts', () => {
		const user = new UserFlow( driver, userFlowArgs );

		testPosts.forEach( post => {
			user.createPost( post );
		} );
	} );

	test.it( 'can edit posts', () => {
		const user = new UserFlow( driver, userFlowArgs );

		testPosts.forEach( post => {
			const postsList = user.open( PAGE.WP_ADMIN_POSTS );
			postsList.search( post.title );

			const editPost = postsList.editPostWithTitle( post.title );
			assert.eventually.ok( editPost.titleContains( 'Edit Post' ) );
		} );
	} );

	test.it( 'can view posts', () => {
		const user = new UserFlow( driver, userFlowArgs );

		testPosts.forEach( post => {
			const postsList = user.open( PAGE.WP_ADMIN_POSTS );
			const page = postsList.viewPostWithTitle( post.title );
			assert.eventually.ok( page.titleContains( post.title ) );
		} );
	} );

	test.it( 'can trash posts', () => {
		const user = new UserFlow( driver, userFlowArgs );

		testPosts.forEach( post => {
			const postsList = user.open( PAGE.WP_ADMIN_POSTS );
			postsList.trashPostWithTitle( post.title );
			assert.eventually.ok( postsList.hasNotice( '1 post moved to the Trash.' ) );
		} );
	} );

	test.after( 'quit browser', () => {
		manager.quitBrowser();
	} );
} );

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

const flowArgs = {
	baseUrl: config.get( 'url' ),
	username: config.get( 'users.admin.username' ),
	password: config.get( 'users.admin.password' ),
};
const testPosts = [
	{
		title: 'Test post ' + new Date().getTime() + ' #1',
		status: 'Published',
	},
	{
		title: 'Test post ' + new Date().getTime() + ' #2',
		status: 'Pending Review',
	},
	{
		title: 'Test post ' + new Date().getTime() + ' #3',
		status: 'Draft',
	},
];

let manager;
let driver;
let user;

test.describe( 'UserFlow', function() {
	// open browser
	test.before( function() {
		this.timeout( config.get( 'startBrowserTimeoutMs' ) );

		manager = new WebDriverManager( 'chrome', { baseUrl: config.get( 'url' ) } );
		driver = manager.getDriver();
	} );

	this.timeout( config.get( 'mochaTimeoutMs' ) );

	// log in
	test.before( () => {
		user = new UserFlow( driver, flowArgs );
	} );

	test.it( 'allows to open any /wp-admin/ page and returns its page object', () => {
		const settingsPage = user.open( PAGE.WP_ADMIN_SETTINGS_GENERAL );
		settingsPage.checkMembership();
		settingsPage.saveChanges();

		assert.eventually.ok( settingsPage.hasNotice( 'Settings saved.' ) );
	} );

	test.it( 'allows to create post', () => {
		testPosts.forEach( post => {
			user.createPost( post );
		} );

		testPosts.forEach( post => {
			const postsList = user.open( PAGE.WP_ADMIN_POSTS );
			postsList.search( post.title );

			const editPost = postsList.editPostWithTitle( post.title );
			assert.eventually.ok(
				editPost.titleContains( 'Edit Post' ),
				`Failed to assert edit post "${ post.title }`
			);
			assert.eventually.ok(
				editPost.hasStatus( post.status ),
				`Failed to assert post "${ post.title } has status ${ post.status }"`
			);
		} );
	} );

	test.it( 'allows to log the user out from /wp-admin/', () => {
		assert.eventually.ok( user.logout() );
	} );

	// quit browser
	test.after( () => {
		manager.quitBrowser();
	} );
} );

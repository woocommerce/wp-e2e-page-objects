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
const testTags = [
	{ name: 'Tag ' + new Date().getTime() + ' #1' },
	{ name: 'Tag ' + new Date().getTime() + ' #2' },
];

let manager;
let driver;
let user;

test.describe( 'WPAdminTags', function() {
	test.before( 'open browser', function() {
		this.timeout( config.get( 'startBrowserTimeoutMs' ) );

		manager = new WebDriverManager( 'chrome', { baseUrl: config.get( 'url' ) } );
		driver = manager.getDriver();
	} );

	this.timeout( config.get( 'mochaTimeoutMs' ) );

	test.before( 'create tags', () => {
		user = new UserFlow( driver, userFlowArgs );

		testTags.forEach( tag => {
			user.createTag( tag );
		} );
	} );

	test.it( 'can edit tag', () => {
		testTags.forEach( tag => {
			const tagsList = user.open( PAGE.WP_ADMIN_TAGS );
			tagsList.search( tag.name );

			const editTag = tagsList.editTagWithName( tag.name );
			assert.eventually.ok( editTag.titleContains( 'Edit Tag' ) );
		} );
	} );

	test.it( 'can view tag', () => {
		testTags.forEach( tag => {
			const tagsList = user.open( PAGE.WP_ADMIN_TAGS );
			const page = tagsList.viewTagWithName( tag.name );
			assert.eventually.ok( page.titleContains( tag.name ) );
		} );
	} );

	test.it( 'can delete tag', () => {
		testTags.forEach( tag => {
			const tagsList = user.open( PAGE.WP_ADMIN_TAGS );
			tagsList.deleteTagWithName( tag.name );
			// TODO(gedex): Missing assertion here.
		} );
	} );

	test.after( 'quit browser', () => {
		manager.quitBrowser();
	} );
} );

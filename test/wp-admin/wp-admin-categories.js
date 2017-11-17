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
const testCategories = [
	{ name: 'Category ' + new Date().getTime() + ' #1' },
	{ name: 'Category ' + new Date().getTime() + ' #2', parent: 'Uncategorized' },
];

let manager;
let driver;
let user;

test.describe( 'WPAdminCategories', function() {
	// open browser
	test.before( function() {
		this.timeout( config.get( 'startBrowserTimeoutMs' ) );

		manager = new WebDriverManager( 'chrome', { baseUrl: config.get( 'url' ) } );
		driver = manager.getDriver();
	} );

	this.timeout( config.get( 'mochaTimeoutMs' ) );

	// create categories
	test.before( () => {
		user = new UserFlow( driver, userFlowArgs );

		testCategories.forEach( category => {
			user.createCategory( category );
		} );
	} );

	test.it( 'can edit category', () => {
		testCategories.forEach( category => {
			const categoriesList = user.open( PAGE.WP_ADMIN_CATEGORIES );
			categoriesList.search( category.name );

			const editCategory = categoriesList.editCategoryWithName( category.name );
			assert.eventually.ok( editCategory.titleContains( 'Edit Category' ) );
		} );
	} );

	test.it( 'can view category', () => {
		testCategories.forEach( category => {
			const categoriesList = user.open( PAGE.WP_ADMIN_CATEGORIES );
			const page = categoriesList.viewCategoryWithName( category.name );
			assert.eventually.ok( page.titleContains( category.name ) );
		} );
	} );

	test.it( 'can delete category', () => {
		testCategories.forEach( category => {
			const categoriesList = user.open( PAGE.WP_ADMIN_CATEGORIES );
			categoriesList.deleteCategoryWithName( category.name );
			// TODO(gedex): Missing assertion here.
		} );
	} );

	// quit browser
	test.after( () => {
		manager.quitBrowser();
	} );
} );

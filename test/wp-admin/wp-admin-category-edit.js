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

test.describe( 'WPAdminCategoryEdit', function() {
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
		testCategories.forEach( ( category, i ) => {
			const categoriesList = user.open( PAGE.WP_ADMIN_CATEGORIES );
			categoriesList.search( category.name );

			const editCategory = categoriesList.editCategoryWithName( category.name );
			assert.eventually.ok( editCategory.titleContains( 'Edit Category' ) );

			// Also update the category in testCategories so it can be deleted
			// after test finishes.
			testCategories[ i ].name = testCategories[ i ].name + ' updated!';
			testCategories[ i ].parent = 'Uncategorized';
			testCategories[ i ].description = 'Updated description!';
			category = testCategories[ i ];

			editCategory.setName( category.name );
			editCategory.selectParent( category.parent );
			editCategory.setDescription( category.description );
			editCategory.update();

			assert.eventually.ok( editCategory.hasNotice( 'Category updated.' ) );
		} );
	} );

	// delete categories and quit browser
	test.after( () => {
		testCategories.forEach( category => {
			const categoriesList = user.open( PAGE.WP_ADMIN_CATEGORIES );
			categoriesList.deleteCategoryWithName( category.name );
		} );

		manager.quitBrowser();
	} );
} );

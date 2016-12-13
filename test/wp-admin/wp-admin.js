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
import { WPAdmin, WPLogin, WPAdminSettingsGeneral } from '../../src/index';

chai.use( chaiAsPromised );
const assert = chai.assert;

let manager;
let driver;

test.before( 'Setup browser', function() {
	this.timeout( config.get( 'startBrowserTimeoutMs' ) );

	manager = new WebDriverManager( 'chrome', { baseUrl: config.get( 'url' ) } );
	driver = manager.getDriver();
} );

test.describe( 'Page inside /wp-admin', function() {
	this.timeout( config.get( 'mochaTimeoutMs' ) );

	test.before( 'login as admin', () => {
		helper.clearCookiesAndDeleteLocalStorage( driver );

		const wpLoginArgs = { url: manager.getPageUrl( '/wp-login.php' ) };
		const wpLogin = new WPLogin( driver, wpLoginArgs );
		wpLogin.login(
			config.get( 'users.admin.username' ),
			config.get( 'users.admin.password' )
		);
	} );

	test.it( 'has admin menus', () => {
		const wpAdmin = new WPAdmin( driver, { visit: false } );
		const menus = [
			'Dashboard',
			'Posts',
			'Pages',
			'Comments',
			'Appearance',
			'Plugins',
			'Users',
			'Tools',
			'Settings'
		];

		menus.forEach( ( menu ) => {
			assert.eventually.equal( wpAdmin.hasMenu( menu ), true, `Could not find menu "${ menu }"` );
		} );
	} );

	test.it( 'may opens another page when menu is clicked', () => {
		const wpAdmin = new WPAdmin( driver, { visit: false } );
		const menuMapsToTitle = [
			[ 'Dashboard', 'Dashboard' ],
			[ 'Posts', 'Posts' ],
			[ 'Media', 'Media Library' ],
			[ 'Pages', 'Pages' ],
			[ 'Comments', 'Comments' ],
			[ 'Appearance', 'Manage Themes' ],
			[ 'Plugins', 'Plugins' ],
			[ 'Users', 'Users' ],
			[ 'Tools', 'Tools' ],
			[ 'Settings', 'General Settings' ]
		];

		menuMapsToTitle.forEach( ( menuWithTitle ) => {
			const menu = menuWithTitle[ 0 ];
			const expectedTitle = menuWithTitle[ 1 ];

			wpAdmin.clickMenu( menu );
			assert.eventually.equal(
				wpAdmin.titleContains( expectedTitle ),
				true,
				`Opened page from clicking menu "${ menu }" does not contain "${ expectedTitle }" in the title`
			);
		} );
	} );

	test.it( 'has some admin menus with submenus', () => {
		const wpAdmin = new WPAdmin( driver, { visit: false } );
		const menus = [
			[ 'Dashboard', [ 'Home', 'Updates' ] ],
			[ 'Posts', [ 'All Posts', 'Add New', 'Categories', 'Tags' ] ],
			[ 'Media', [ 'Library', 'Add New' ] ],
			[ 'Pages', [ 'All Pages', 'Add New' ] ],
			[ 'Appearance', [ 'Themes', 'Customize', 'Widgets', 'Menus', 'Header', 'Background', 'Editor' ] ],
			[ 'Plugins', [ 'Installed Plugins', 'Add New', 'Editor' ] ],
			[ 'Users', [ 'All Users', 'Add New', 'Your Profile' ] ],
			[ 'Tools', [ 'Available Tools', 'Import', 'Export' ] ],
			[ 'Settings', [ 'General', 'Writing', 'Reading', 'Discussion', 'Media', 'Permalinks' ] ],
		];

		menus.forEach( ( menuWithSubmenus ) => {
			const menu = menuWithSubmenus[ 0 ];
			const submenus = menuWithSubmenus[ 1 ];

			submenus.forEach( ( submenu ) => {
				assert.eventually.equal(
					wpAdmin.hasMenuWithSubmenu( menu, submenu ),
					true,
					`Could not find menu ${ menu } with submenu ${ submenu }`
				);
			} );
		} );
	} );

	test.it( 'may opens another page when submenu is clicked', () => {
		const wpAdmin = new WPAdmin( driver, { visit: false } );
		const submenuMapsToTitle = [
			[ 'Dashboard', [
				[ 'Home', 'Dashboard' ],
				[ 'Updates', 'WordPress Updates' ]
			] ],
			[ 'Posts', [
				[ 'All Posts', 'Posts' ],
				[ 'Add New', 'Add New Post' ],
				[ 'Categories', 'Categories' ],
				[ 'Tags', 'Tags' ]
			] ],
			[ 'Media', [
				[ 'Library', 'Media Library' ],
				[ 'Add New', 'Upload New Media' ]
			] ],
			[ 'Pages', [
				[ 'All Pages', 'Pages' ],
				[ 'Add New', 'Add New Page' ]
			] ],
			[ 'Appearance', [
				[ 'Themes', 'Manage Themes' ],
				[ 'Widgets', 'Widgets' ],
				[ 'Menus', 'Menus' ],
				[ 'Editor', 'Edit Themes' ]
			] ],
			[ 'Plugins', [
				[ 'Installed Plugins', 'Plugins' ],
				[ 'Add New', 'Add Plugins' ],
				[ 'Editor', 'Edit Plugins' ]
			] ],
			[ 'Users', [
				[ 'All Users', 'Users' ],
				[ 'Add New', 'Add New User' ],
				[ 'Your Profile', 'Profile' ]
			] ],
			[ 'Tools', [
				[ 'Available Tools', 'Tools' ],
				[ 'Import', 'Import' ],
				[ 'Export', 'Export' ]
			] ],
			[ 'Settings', [
				[ 'General', 'General Settings' ],
				[ 'Writing', 'Writing Settings' ],
				[ 'Reading', 'Reading Settings' ],
				[ 'Discussion', 'Discussion Settings' ],
				[ 'Media', 'Media Settings' ],
				[ 'Permalinks', 'Permalink Settings' ]
			] ]
		];

		submenuMapsToTitle.forEach( ( menuWithSubmenus ) => {
			const menu = menuWithSubmenus[ 0 ];
			const submenus = menuWithSubmenus[ 1 ];

			submenus.forEach( ( submenuWithTitle ) => {
				const submenu = submenuWithTitle[ 0 ];
				const expectedTitle = submenuWithTitle[ 1 ];

				wpAdmin.hoverMenuThenClickSubmenu( menu, submenu );

				assert.eventually.equal(
					wpAdmin.titleContains( expectedTitle ),
					true,
					`Opened page from clicking menu "${ menu } > ${ submenu }" does not contain "${ expectedTitle }" in the title`
				);
			} );
		} );
	} );

	test.it( 'has quick links in the admin bar', () => {
		const wpAdmin = new WPAdmin( driver, { visit: false } );
		[ 'About WordPress', config.get( 'siteTitle' ), 'comment awaiting moderation', 'New' ].forEach( ( menu ) => {
			assert.eventually.equal( wpAdmin.hasQuickLink( menu ), true, `Could not find quick link "${ menu }"` );
		} );
	} );

	test.it( 'may opens another page when quick link is clicked', () => {
		const wpAdmin = new WPAdmin( driver, { visit: false } );
		const quickLinkMapsToTitle = [
			[ 'About WordPress', 'About' ],
			[ config.get( 'siteTitle' ), config.get( 'siteTitle' ) ],
			[ 'comment awaiting moderation', 'Comments' ],
			[ 'New', 'Add New Post' ]
		];

		quickLinkMapsToTitle.forEach( ( menu ) => {
			const quickLink = menu[ 0 ];
			const expectedTitle = menu[ 1 ];

			wpAdmin.clickQuickLink( quickLink );
			assert.eventually.equal(
				wpAdmin.titleContains( expectedTitle ),
				true,
				`Opened page from clicking quick link "${ quickLink }" does not contain title "${ expectedTitle }"`
			);
		} );
	} );

	test.it( 'has some quick links with submenus', () => {
		const wpAdmin = new WPAdmin( driver, { visit: false } );
		const quickLinks = [
			[ 'About WordPress', [ 'About WordPress', 'WordPress.org', 'Documentation', 'Support Forums', 'Feedback' ] ],
			[ config.get( 'siteTitle' ), [ 'Visit Site' ] ],
			[ 'New', [ 'Post', 'Media', 'Page', 'User' ] ]
		];

		quickLinks.forEach( ( quickLinkWithSubmenus ) => {
			const quickLink = quickLinkWithSubmenus[ 0 ];
			const submenus = quickLinkWithSubmenus[ 1 ];
			submenus.forEach( ( submenu ) => {
				assert.eventually.equal(
					wpAdmin.hasQuickLinkWithSubmenu( quickLink, submenu ),
					true,
					`Could not find quick link "${ quickLink }" with submenu "${ submenu }"`
				);
			} );
		} );
	} );

	test.it( 'may opens another page when quick link submenu is clicked', () => {
		const wpAdmin = new WPAdmin( driver, { visit: false } );
		const submenuMapsToTitle = [
			[ 'About WordPress', [
				[ 'About WordPress', 'About' ]
			] ],
			[ config.get( 'siteTitle' ), [
				[ 'Visit Site', config.get( 'siteTitle' ) ]
			] ],
			[ 'New', [
				[ 'Post', 'Add New Post' ],
				[ 'Media', 'Upload New Media' ],
				[ 'Page', 'Add New Page' ],
				[ 'User', 'Add New User' ]
			] ]
		];

		submenuMapsToTitle.forEach( ( menuWithSubmenus ) => {
			const menu = menuWithSubmenus[ 0 ];
			const submenus = menuWithSubmenus[ 1 ];

			submenus.forEach( ( submenuWithTitle ) => {
				const submenu = submenuWithTitle[ 0 ];
				const expectedTitle = submenuWithTitle[ 1 ];

				wpAdmin.hoverQuickLinkThenClickSubmenu( menu, submenu );

				assert.eventually.equal(
					wpAdmin.titleContains( expectedTitle ),
					true,
					`Opened page from clicking quick link "${ menu } > ${ submenu }" does not contain "${ expectedTitle }" in the title`
				);
			} );
		} );
	} );

	test.it( 'has my account in the admin bar', () => {
		const wpAdmin = new WPAdmin( driver, { visit: false } );
		const submenus = [ 'Edit My Profile', 'Log Out' ];

		submenus.forEach( ( submenu ) => {
			assert.eventually.equal(
				wpAdmin.hasMyAccountWithSubmenu( submenu ),
				true,
				`Could not find submenu "${ submenu }" under my acount in the admin bar`
			);
		} );
	} );

	test.it( 'opens edit profile page from "My Account > Edit My Profile"', () => {
		const wpAdmin = new WPAdmin( driver, { visit: false } );

		wpAdmin.hoverMyAccountThenClickSubmenu( 'Edit My Profile' ),
		assert.eventually.equal(
			wpAdmin.titleContains( 'Profile' ),
			true,
			'Could not get edit profile page from clicking "My Account > Edit My Profile"'
		);
	} );

	test.it( 'log the user out when clicking "My Account > Log Out"', () => {
		const wpAdmin = new WPAdmin( driver, { visit: false } );

		wpAdmin.hoverMyAccountThenClickSubmenu( 'Log Out' ),
		assert.eventually.equal(
			wpAdmin.titleContains( 'Log In' ),
			true,
			'Could not get login page from clicking "My Account > Log Out"'
		);
	} );

	test.it( 'may trigger admin notice after performing some actions', () => {
		const wpLoginArgs = { url: manager.getPageUrl( '/wp-login.php' ) };
		const wpLogin = new WPLogin( driver, wpLoginArgs );
		wpLogin.login(
			config.get( 'users.admin.username' ),
			config.get( 'users.admin.password' )
		);

		const settings = new WPAdminSettingsGeneral( driver, { url: manager.getPageUrl( '/wp-admin/options-general.php' ) } );
		settings.disableMembership();
		settings.saveChanges();

		assert.eventually.equal(
			settings.hasNotice( 'Settings saved.' ),
			true,
			'Could not find notice which contains "Settings saved." in general settings page'
		);
	} );

	test.after( 'Quit browser', () => {
		manager.quitBrowser();
	} );
} );

/**
 * Internal dependencies
 */
import ComponentAdminMenu from '../../components/wp-admin/component-admin-menu';
import ComponentAdminBar from '../../components/wp-admin/component-admin-bar';
import ComponentAdminNotice from '../../components/wp-admin/component-admin-notice';
import Page from '../page';

function _getDefaultComponents() {
	return {
		adminMenu: ComponentAdminMenu,
		adminBar: ComponentAdminBar,
		adminNotice: ComponentAdminNotice,
	};
}

export default class WPAdmin extends Page {
	constructor( driver, args = {} ) {
		args = Object.assign( { visit: false, url: '', components: {} }, args );
		args.components = Object.assign( _getDefaultComponents(), args.components );
		super( driver, args );
	}

	hasMenu( menu ) {
		return this.components.adminMenu.hasMenu( menu );
	}

	hasMenuWithSubmenu( menu, submenu ) {
		return this.components.adminMenu.hasMenuWithSubmenu( menu, submenu );
	}

	clickMenu( menu ) {
		return this.components.adminMenu.click( menu );
	}

	hoverMenuThenClickSubmenu( menu, submenu ) {
		return this.components.adminMenu.hoverMenuThenClickSubmenu( menu, submenu );
	}

	hasQuickLink( menu ) {
		return this.components.adminBar.quickLinks.hasMenu( menu );
	}

	hasQuickLinkWithSubmenu( menu, submenu ) {
		return this.components.adminBar.quickLinks.hasMenuWithSubmenu( menu, submenu );
	}

	clickQuickLink( quickLink ) {
		return this.components.adminBar.quickLinks.click( quickLink );
	}

	hoverQuickLinkThenClickSubmenu( menu, submenu ) {
		return this.components.adminBar.quickLinks.hoverMenuThenClickSubmenu( menu, submenu );
	}

	hasMyAccountWithSubmenu( submenu ) {
		return this.components.adminBar.myAccount.hasSubmenu( submenu );
	}

	clickMyAccount() {
		return this.components.adminBar.myAccount.click();
	}

	hoverMyAccountThenClickSubmenu( submenu ) {
		return this.components.adminBar.myAccount.hoverMyAccountThenClickSubmenu( submenu );
	}

	hasNotice( notice ) {
		return this.components.adminNotice.hasNotice( notice );
	}

	isNoticeDismissible( notice ) {
		return this.components.adminNotice.isDismissible( notice );
	}

	dismissNotice( notice ) {
		return this.components.adminNotice.dismiss( notice );
	}
}

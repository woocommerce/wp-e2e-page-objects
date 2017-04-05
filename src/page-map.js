/**
 * External dependencies
 */
import urljoin from 'url-join';
import { sprintf } from 'sprintf-js';

/**
 * Internal dependencies
 */
import FrontPage from './pages/front-page';
import WPAdmin from './pages/wp-admin/wp-admin';
import WPAdminDashboard from './pages/wp-admin/wp-admin-dashboard';
import WPAdminCategories from './pages/wp-admin/wp-admin-categories';
import WPAdminPluginInstall from './pages/wp-admin/wp-admin-plugin-install';
import WPAdminPlugins from './pages/wp-admin/wp-admin-plugins';
import WPAdminPostEdit from './pages/wp-admin/wp-admin-post-edit';
import WPAdminPostNew from './pages/wp-admin/wp-admin-post-new';
import WPAdminPosts from './pages/wp-admin/wp-admin-posts';
import WPAdminSettingsGeneral from './pages/wp-admin/wp-admin-settings-general';
import WPAdminTags from './pages/wp-admin/wp-admin-tags';
import WPLogin from './pages/wp-admin/wp-login';

export const PAGE = {
	FRONT_PAGE: {
		object: FrontPage,
		path: '/'
	},
	WP_LOGIN: {
		object: WPLogin,
		path: '/wp-login.php'
	},
	WP_ADMIN: {
		object: WPAdmin,
		path: '/wp-admin/'
	},
	WP_ADMIN_DASHBOARD: {
		object: WPAdminDashboard,
		path: '/wp-admin/'
	},
	WP_ADMIN_POSTS: {
		object: WPAdminPosts,
		path: '/wp-admin/edit.php'
	},
	WP_ADMIN_NEW_POST: {
		object: WPAdminPostNew,
		path: '/wp-admin/post-new.php'
	},
	WP_ADMIN_EDIT_POST: {
		object: WPAdminPostEdit,
		path: '/wp-admin/post.php?post=%s&action=edit'
	},
	WP_ADMIN_CATEGORIES: {
		object: WPAdminCategories,
		path: '/wp-admin/edit-tags.php?taxonomy=category'
	},
	WP_ADMIN_TAGS: {
		object: WPAdminTags,
		path: '/wp-admin/edit-tags.php?taxonomy=post_tag'
	},
	WP_ADMIN_PAGES: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/edit.php?post_type=page'
	},
	WP_ADMIN_NEW_PAGE: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/post-new.php?post_type=page'
	},
	WP_ADMIN_EDIT_PAGE: {
		object: null,
		path: '/wp-admin/post.php?post=%s&action=edit'
	},
	WP_ADMIN_MEDIA: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/upload.php'
	},
	WP_ADMIN_NEW_MEDIA: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/media-new.php'
	},
	WP_ADMIN_COMMENTS: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/edit-comments.php'
	},
	WP_ADMIN_EDIT_COMMENT: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/comment.php?action=editcomment&c=%s'
	},
	WP_ADMIN_THEMES: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/themes.php'
	},
	WP_ADMIN_NEW_THEME: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/theme-install.php'
	},
	WP_ADMIN_CUSTOMIZE: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/customize.php'
	},
	WP_ADMIN_WIDGETS: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/widgets.php'
	},
	WP_ADMIN_EDIT_MENUS: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/nav-menus.php'
	},
	WP_ADMIN_MANAGE_MENU_LOCATIONS: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/nav-menus.php?action=locations'
	},
	WP_ADMIN_THEME_EDITOR: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/theme-editor.php'
	},
	WP_ADMIN_PLUGINS: {
		object: WPAdminPlugins,
		path: '/wp-admin/plugins.php'
	},
	WP_ADMIN_NEW_PLUGIN: {
		object: WPAdminPluginInstall,
		path: '/wp-admin/plugin-install.php'
	},
	WP_ADMIN_NEW_PLUGIN_UPLOAD: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/plugin-install.php?tab=upload'
	},
	WP_ADMIN_PLUGIN_EDITOR: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/plugin-editor.php'
	},
	WP_ADMIN_USERS: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/users.php'
	},
	WP_ADMIN_NEW_USER: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/user-new.php'
	},
	WP_ADMIN_EDIT_USER: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/user-edit.php?user_id=%s'
	},
	WP_ADMIN_YOUR_PROFILE: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/profile.php'
	},
	WP_ADMIN_TOOLS: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/tools.php'
	},
	WP_ADMIN_IMPORT: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/import.php'
	},
	WP_ADMIN_EXPORT: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/export.php'
	},
	WP_ADMIN_SETTINGS_GENERAL: {
		object: WPAdminSettingsGeneral,
		path: '/wp-admin/options-general.php'
	},
	WP_ADMIN_SETTINGS_WRITING: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/options-writing.php'
	},
	WP_ADMIN_SETTINGS_READING: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/options-reading.php'
	},
	WP_ADMIN_SETTINGS_DISCUSSION: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/options-discussion.php'
	},
	WP_ADMIN_SETTINGS_MEDIA: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/options-media.php'
	},
	WP_ADMIN_SETTINGS_PERMALINKS: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/options-permalink.php'
	},
	WP_ADMIN_SETTINGS_PERMALINK: {
		object: null, // TODO: Implement me!
		path: '/wp-admin/options-permalink.php'
	},
};

export function getPageUrl( baseUrl, page, ...args ) {
	return urljoin( baseUrl, sprintf( page.path, ...args ) );
}

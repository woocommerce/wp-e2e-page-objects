/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import WPAdmin from './wp-admin';
import WPAdminPluginInstall from './wp-admin-plugin-install';
import ComponentPluginsList from '../../components/wp-admin/component-plugins-list';

const ADD_NEW_SELECTOR = By.css( 'h1 + .page-title-action' );

const components = {
	pluginsList: ComponentPluginsList,
};

const defaultArgs = {
	url: '',
	visit: true,
	components: components,
};

export default class WPAdminPlugins extends WPAdmin {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	add() {
		helper.clickWhenClickable( this.driver, ADD_NEW_SELECTOR );
		return new WPAdminPluginInstall( this.driver, { visit: false } );
	}

	activate( pluginSlug ) {
		return this.components.pluginsList.activate( pluginSlug );
	}

	deactivate( pluginSlug ) {
		return this.components.pluginsList.deactivate( pluginSlug );
	}

	delete( pluginSlug ) {
		return this.components.pluginsList.delete( pluginSlug );
	}
}

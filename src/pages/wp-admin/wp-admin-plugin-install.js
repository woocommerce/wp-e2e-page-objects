/**
 * Internal Dependencies
 */
import ComponentPluginInstallFilter from '../../components/wp-admin/component-plugin-install-filter';
import ComponentPluginCard from '../../components/wp-admin/component-plugin-card';
import WPAdmin from './wp-admin';

const components = {
	filter: ComponentPluginInstallFilter
};

const defaultArgs = {
	url: '',
	visit: true,
	components: components
};

export default class WPAdminPluginInstall extends WPAdmin {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	search( pluginSlug ) {
		return this.components.filter.search( pluginSlug );
	}

	install( pluginSlug ) {
		const pluginCard = new ComponentPluginCard( this.driver, pluginSlug );
		return pluginCard.install();
	}

	activate( pluginSlug ) {
		const pluginCard = new ComponentPluginCard( this.driver, pluginSlug );
		return pluginCard.activate();
	}
}

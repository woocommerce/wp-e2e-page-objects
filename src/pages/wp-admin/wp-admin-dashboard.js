/**
 * Internal Dependencies
 */
import WPAdmin from './wp-admin';
import ComponentWelcomePanel from '../../components/wp-admin/component-welcome-panel';

const components = {
	welcomePanel: ComponentWelcomePanel,
};

const defaultArgs = {
	url: '',
	visit: true,
	components: components,
};

export default class WPAdminDashboard extends WPAdmin {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}
}

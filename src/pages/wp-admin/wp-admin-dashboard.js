/**
 * Internal Dependencies
 */
import Page from '../page';
import ComponentWelcomePanel from '../../components/wp-admin/component-welcome-panel';

const components = {
	welcomePanel: ComponentWelcomePanel
};

const defaultArgs = {
	url: '',
	visit: true,
	components: components
};

export default class WPAdminDashboard extends Page {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}
}

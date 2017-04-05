/**
 * Internal Dependencies
 */
import Page from '../page';
import WPAdminDashboard from './wp-admin-dashboard';
import ComponentLoginForm from '../../components/wp-admin/component-login-form';

const components = {
	loginForm: ComponentLoginForm
};

const defaultArgs = {
	url: '',
	visit: true,
	components: components
};

export default class WPLogin extends Page {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	login( username, password ) {
		this.components.loginForm.setUsername( username );
		this.components.loginForm.setPassword( password );
		this.components.loginForm.login();

		return new WPAdminDashboard( this.driver, { visit: false } );
	}
}

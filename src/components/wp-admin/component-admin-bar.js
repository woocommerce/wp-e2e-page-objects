/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';

/**
 * Internal dependencies
 */
import Component from '../component';
import ComponentAdminBarQuickLinks from './component-admin-bar-quick-links';
import ComponentAdminBarMyAccount from './component-admin-bar-my-account';

const ADMIN_BAR_SELECTOR = By.css( '#wpadminbar' );

export default class ComponentAdminBar extends Component {
	constructor( driver, selector = ADMIN_BAR_SELECTOR ) {
		super( driver, selector );
		this.quickLinks = new ComponentAdminBarQuickLinks( driver );
		this.myAccount = new ComponentAdminBarMyAccount( driver );
	}
}

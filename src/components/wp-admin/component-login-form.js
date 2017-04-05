/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import deprecate from 'deprecate';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * External dependencies
 */
import Component from '../component';

const LOGIN_FORM_SELECTOR = By.css( '#loginform' );
const USERNAME_FIELD_SELECTOR = By.css( '#user_login' );
const PASSWORD_FIELD_SELECTOR = By.css( '#user_pass' );
const LOGIN_BUTTON_SELECTOR = By.css( '#wp-submit' );

/**
 * Login form component.
 *
 * @extends Component
 */
export default class ComponentLoginForm extends Component {
	constructor( driver, selector = LOGIN_FORM_SELECTOR ) {
		super( driver, selector );
	}

	/**
	 * Set username field.
	 *
	 * @param {string} username - Username.
	 *
	 * @return {Promise} Promise that evaluates to `true` if username field is
	 *                   set successfully, `false` otherwise.
	 */
	setUsername( username ) {
		return helper.setWhenSettable( this.driver, USERNAME_FIELD_SELECTOR, username );
	}

	/**
	 * Set password field.
	 *
	 * @param {string} password - Password.
	 *
	 * @return {Promise} Promise that evaluates to `true` if password field is
	 *                   set successfully, `false` otherwise.
	 */
	setPassword( password ) {
		return helper.setWhenSettable( this.driver, PASSWORD_FIELD_SELECTOR, password );
	}

	/**
	 * Login.
	 *
	 * @return {Promise} Promise that evaluates to `true` if login button is
	 *                   clicked successfully.
	 */
	login() {
		return helper.clickWhenClickable( this.driver, LOGIN_BUTTON_SELECTOR );
	}

	/**
	 * Set username field.
	 *
	 * @deprecated Since 0.7.0
	 *
	 * @param {string} username - Username.
	 *
	 * @return {Promise} Promise that evaluates to `true` if username field is
	 *                   set successfully, `false` otherwise.
	 */
	fillUsername( username ) {
		deprecate( 'ComponentLoginForm.fillUsername() is deprecated, use ComponentLoginForm.setUsername() instead' );
		return this.setUsername( username );
	}

	/**
	 * Set password field.
	 *
	 * @deprecated Since 0.7.0
	 *
	 * @param {string} password - Password.
	 *
	 * @return {Promise} Promise that evaluates to `true` if password field is
	 *                   set successfully, `false` otherwise.
	 */
	fillPassword( password ) {
		deprecate( 'ComponentLoginForm.fillPassword() is deprecated, use ComponentLoginForm.setPassword() instead' );
		return this.setPassword( password );
	}

	/**
	 * Login.
	 *
	 * @deprecated Since 0.7.0
	 *
	 * @return {Promise} Promise that evaluates to `true` if login button is
	 *                   clicked successfully.
	 */
	submit() {
		deprecate( 'ComponentLoginForm.submit() is deprecated, use ComponentLoginForm.login instead' );
		return this.login();
	}
}

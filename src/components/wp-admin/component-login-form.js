/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * External dependencies
 */
import Component from '../component';

const LOGIN_FORM_SELECTOR = By.css( '#loginform' );
const USERNAME_FIELD_SELECTOR = By.css( '#user_login' );
const PASSWORD_FIELD_SELECTOR = By.css( '#user_pass' );
const LOGIN_BUTTON_SELECTOR = By.css( '#wp-submit' );

export default class ComponentLoginForm extends Component {
	constructor( driver, selector = LOGIN_FORM_SELECTOR ) {
		super( driver, selector );
	}

	fillUsername( username ) {
		helper.setWhenSettable(
			this.driver,
			USERNAME_FIELD_SELECTOR,
			username
		);
	}

	fillPassword( password ) {
		helper.setWhenSettable(
			this.driver,
			PASSWORD_FIELD_SELECTOR,
			password
		);
	}

	submit() {
		helper.clickWhenClickable(
			this.driver,
			LOGIN_BUTTON_SELECTOR
		);
	}
}

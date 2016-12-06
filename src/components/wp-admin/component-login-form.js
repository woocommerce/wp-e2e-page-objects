/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * External dependencies
 */
import Component from '../component';

const LOGIN_FORM_SELECTOR = '#loginform';
const USERNAME_FIELD_SELECTOR = '#user_login';
const PASSWORD_FIELD_SELECTOR = '#user_pass';
const LOGIN_BUTTON_SELECTOR = '#wp-submit';

export default class ComponentLoginForm extends Component {
	constructor( driver, selector = LOGIN_FORM_SELECTOR ) {
		super( driver, By.css( selector ) );
	}

	fillUsername( username ) {
		helper.setWhenSettable(
			this.driver,
			By.css( USERNAME_FIELD_SELECTOR ),
			username
		);
	}

	fillPassword( password ) {
		helper.setWhenSettable(
			this.driver,
			By.css( PASSWORD_FIELD_SELECTOR ),
			password
		);
	}

	submit() {
		helper.clickWhenClickable(
			this.driver,
			By.css( LOGIN_BUTTON_SELECTOR )
		);
	}
}

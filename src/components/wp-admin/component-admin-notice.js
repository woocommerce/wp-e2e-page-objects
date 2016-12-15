/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import Component from '../component';

const NOTICE_SELECTOR = By.css( '#message' );

export default class ComponentAdminNotice extends Component {
	constructor( driver, selector = NOTICE_SELECTOR ) {
		super( driver, selector, { wait: false } );
	}

	hasNotice( notice ) {
		const selector = By.xpath( this._getNoticeXpathExpression( notice ) );
		return helper.isEventuallyPresentAndDisplayed( this.driver, selector );
	}

	isDismissible( notice ) {
		const selector = By.xpath( this._getDismissButtonXpathExpression( notice ) );
		return helper.isEventuallyPresentAndDisplayed( this.driver, selector );
	}

	dismiss( notice ) {
		const selector = By.xpath( this._getDismissButtonXpathExpression( notice ) );
		return helper.clickWhenClickable( this.driver, selector );
	}

	_getNoticeXpathExpression( notice ) {
		return `//div[(contains(@class, "notice") or contains(@id, "message")) and .//*[contains(text(), "${ notice }")]]`;
	}

	_getDismissButtonXpathExpression( notice ) {
		return this._getNoticeXpathExpression( notice ) +
			'//button[@class="notice-dismiss"]';
	}
}

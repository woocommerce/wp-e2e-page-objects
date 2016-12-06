/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';

/**
 * Internal dependencies
 */
import ComponentWidget from './component-widget';

const WIDGET_SELECTOR = '.widget_recent_entries';

export default class ComponentWidgetRecentPosts extends ComponentWidget {
	constructor( driver ) {
		super( driver, By.css( WIDGET_SELECTOR ) );
	}
}

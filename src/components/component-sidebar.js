/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { forEach } from 'lodash';

/**
 * Internal dependencies
 */
import Component from './component';
import ComponentWidgetRecentPosts from './component-widget-recent-posts';
import ComponentWidgetRecentComments from './component-widget-recent-comments';

const SIDEBAR_SELECTOR = '.widget-area';

const SIDEBAR_WIDGETS = {
	recentPosts: ComponentWidgetRecentPosts,
	recentComments: ComponentWidgetRecentComments
};

export default class ComponentSidebar extends Component {
	constructor( driver, selector = SIDEBAR_SELECTOR, widgets = SIDEBAR_WIDGETS ) {
		super( driver, By.css( selector ) );

		const sidebarWidgets = {};
		forEach( widgets, ( ClassName, name ) => {
			sidebarWidgets[ name ] = new ClassName( driver );
		} );

		this.widgets = sidebarWidgets;
	}
}

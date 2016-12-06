/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * External dependencies
 */
import Component from '../component';
import ComponentPluginCard from './component-plugin-card';

const FILTER_SELECTOR = '.wp-filter';
const TAB_FEATURED_SELECTOR = '.plugin-install-featured';
const TAB_POPULAR_SELECTOR = '.plugin-install-popular';
const TAB_RECOMMENDED_SELECTOR = '.plugin-install-recommended';
const TAB_FAVORITES_SELECTOR = '.plugin-install-favorites';
const SEARCH_PLUGINS_SELECTOR = '.wp-filter-search';

export default class ComponentPluginInstallFilter extends Component {
	constructor( driver, selector = FILTER_SELECTOR ) {
		super( driver, By.css( selector ) );

		this.tabs = {};
		this.tabs.featured = driver.findElement( By.css( TAB_FEATURED_SELECTOR ) );
		this.tabs.popular = driver.findElement( By.css( TAB_POPULAR_SELECTOR ) );
		this.tabs.recommended = driver.findElement( By.css( TAB_RECOMMENDED_SELECTOR ) );
		this.tabs.favorites = driver.findElement( By.css( TAB_FAVORITES_SELECTOR ) );
	}

	search( pluginSlug ) {
		helper.setWhenSettable( this.driver, By.css( SEARCH_PLUGINS_SELECTOR ), pluginSlug );
		return new ComponentPluginCard( this.driver, pluginSlug );
	}
}

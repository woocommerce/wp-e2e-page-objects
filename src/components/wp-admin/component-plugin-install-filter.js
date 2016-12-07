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

const FILTER_SELECTOR = By.css( '.wp-filter' );
const TAB_FEATURED_SELECTOR = By.css( '.plugin-install-featured' );
const TAB_POPULAR_SELECTOR = By.css( '.plugin-install-popular' );
const TAB_RECOMMENDED_SELECTOR = By.css( '.plugin-install-recommended' );
const TAB_FAVORITES_SELECTOR = By.css( '.plugin-install-favorites' );
const SEARCH_PLUGINS_SELECTOR = By.css( '.wp-filter-search' );

export default class ComponentPluginInstallFilter extends Component {
	constructor( driver, selector = FILTER_SELECTOR ) {
		super( driver, selector );

		this.tabs = {};
		this.tabs.featured = driver.findElement( TAB_FEATURED_SELECTOR );
		this.tabs.popular = driver.findElement( TAB_POPULAR_SELECTOR );
		this.tabs.recommended = driver.findElement( TAB_RECOMMENDED_SELECTOR );
		this.tabs.favorites = driver.findElement( TAB_FAVORITES_SELECTOR );
	}

	search( pluginSlug ) {
		helper.setWhenSettable( this.driver, SEARCH_PLUGINS_SELECTOR, pluginSlug );
		return new ComponentPluginCard( this.driver, pluginSlug );
	}
}

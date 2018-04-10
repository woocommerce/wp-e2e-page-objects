/**
 * External dependencies
 */
import { By } from 'selenium-webdriver';
import { forEach } from 'lodash';

const defaultArgs = {
	url: '/',
	visit: true,
	waitMs: 10000,
	components: {},
};

export default class Page {
	constructor( driver, args = {} ) {
		this.driver = driver;

		args = Object.assign( defaultArgs, args );

		this.url = args.url;
		this.waitMs = args.waitMs;

		if ( args.visit ) {
			this.visit();
		}

		const pageComponents = {};
		forEach( args.components, ( ClassName, name ) => {
			pageComponents[ name ] = new ClassName( driver );
		} );

		this.components = pageComponents;
	}

	getCurrentUrl() {
		return this.driver.getCurrentUrl();
	}

	getTitle() {
		return this.driver.getTitle();
	}

	titleContains( pattern ) {
		return this.getTitle().then( ( title ) => {
			const re = new RegExp( pattern );
			return re.test( title );
		}, () => {
			return false;
		} );
	}

	hasText( text ) {
		const selector = By.xpath( `//body//*[contains(., "${ text }")]` );
		return this.driver.findElement( selector ).then( ( el ) => {
			return el.isDisplayed();
		}, () => {
			return false;
		} );
	}

	visit() {
		this.driver.get( this.url );
	}
}

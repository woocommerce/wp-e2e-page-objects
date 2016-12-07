/**
 * External dependencies
 */
import { forEach } from 'lodash';

const defaultArgs = {
	url: '/',
	visit: true,
	waitMs: 10000,
	components: {}
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
		this.driver.getCurrentUrl();
	}

	visit() {
		this.driver.get( this.url );
	}

	getComponents() {
		return this.components;
	}

	getComponentByName( name ) {
		return this.components[ name ];
	}
}

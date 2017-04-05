/**
 * Internal Dependencies
 */
import Page from './page';

const defaultArgs = {
	url: '/',
	visit: true
};

export default class CategoryPage extends Page {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}
}

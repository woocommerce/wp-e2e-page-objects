/**
 * Internal Dependencies
 */
import Page from './page';

const defaultArgs = {
	url: '/',
	visit: true,
};

export default class ArchivePage extends Page {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}
}

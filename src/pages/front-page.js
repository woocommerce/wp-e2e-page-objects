/**
 * Internal Dependencies
 */
import Page from './page';
import ComponentSidebar from '../components/component-sidebar';

const components = {
	sidebar: ComponentSidebar
};

const defaultArgs = {
	url: '/',
	visit: true,
	components: components
};

export default class FrontPage extends Page {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}
}

/**
 * Internal Dependencies
 */
import ComponentPostsList from '../../components/wp-admin/component-posts-list';
import Page from '../page';
import WPAdminPostEdit from './wp-admin-post-edit';

const components = {
	postsList: ComponentPostsList
};

const defaultArgs = {
	url: '',
	visit: true,
	components: components
};

export default class WPAdminPosts extends Page {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	editPostWithTitle( title ) {
		this.components.postsList.editPostWithTitle( title );
		return new WPAdminPostEdit( this.driver, { visit: false } );
	}
}

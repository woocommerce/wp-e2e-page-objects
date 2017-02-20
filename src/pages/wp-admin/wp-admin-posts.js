/**
 * Internal Dependencies
 */
import ComponentPostsList from '../../components/wp-admin/component-posts-list';
import SinglePage from '../single-page';
import WPAdmin from './wp-admin';
import WPAdminPostEdit from './wp-admin-post-edit';

const components = {
	postsList: ComponentPostsList
};

const defaultArgs = {
	url: '',
	visit: true,
	components: components
};

export default class WPAdminPosts extends WPAdmin {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	search( keyword ) {
		this.components.postsList.search( keyword );
		return this;
	}

	editPostWithTitle( title ) {
		this.components.postsList.editPostWithTitle( title );
		return new WPAdminPostEdit( this.driver, { visit: false } );
	}

	viewPostWithTitle( title ) {
		this.components.postsList.viewPostWithTitle( title );
		return new SinglePage( this.driver, { visit: false } );
	}

	trashPostWithTitle( title ) {
		this.components.postsList.trashPostWithTitle( title );
		return this;
	}
}

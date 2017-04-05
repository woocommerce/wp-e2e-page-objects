/**
 * Internal dependencies
 */
import WPAdminCategories from './wp-admin-categories';

export default class WPAdminTags extends WPAdminCategories {
	constructor( driver, args = {} ) {
		super( driver, args );
	}

	editTagWithName( name ) {
		return this.editCategoryWithName( name );
	}

	viewTagWithName( name ) {
		return this.viewCategoryWithName( name );
	}

	deleteTagWithName( name ) {
		return this.deleteCategoryWithName( name );
	}
}

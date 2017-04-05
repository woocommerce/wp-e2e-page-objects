/**
 * Internal dependencies
 */
import WPAdminPostTerms from './wp-admin-post-terms';

export default class WPAdminCategories extends WPAdminPostTerms {
	constructor( driver, args = {} ) {
		super( driver, args );
	}

	editCategoryWithName( name ) {
		return this.editTermWithName( name );
	}

	viewCategoryWithName( name ) {
		return this.viewTermWithName( name );
	}

	deleteCategoryWithName( name ) {
		return this.deleteTermWithName( name );
	}
}

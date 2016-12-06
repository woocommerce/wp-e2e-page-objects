/**
 * Internal dependencies
 */
import WPAdminPostEdit from './wp-admin-post-edit';

export default class WPAdminPostNew extends WPAdminPostEdit {
	constructor( driver, args = {} ) {
		super( driver, args );
	}
}

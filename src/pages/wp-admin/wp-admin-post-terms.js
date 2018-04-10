/**
 * Internal Dependencies
 */
import ComponentPostTermFormNew from '../../components/wp-admin/component-post-term-form-new';
import ComponentPostTermsList from '../../components/wp-admin/component-post-terms-list';
import CategoryPage from '../category-page';
import WPAdmin from './wp-admin';
import WPAdminPostTermEdit from './wp-admin-post-term-edit';

const components = {
	termsList: ComponentPostTermsList,
	form: ComponentPostTermFormNew,
};

const defaultArgs = {
	url: '',
	visit: true,
	components: components,
};

export default class WPAdminPostTerms extends WPAdmin {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
	}

	search( keyword ) {
		this.components.termsList.search( keyword );
		return this;
	}

	setName( name ) {
		return this.components.form.setName( name );
	}

	setSlug( slug ) {
		return this.components.form.setSlug( slug );
	}

	selectParent( option ) {
		return this.components.form.selectParent( option );
	}

	setDescription( description ) {
		return this.components.form.setDescription( description );
	}

	add() {
		return this.components.form.submit();
	}

	editTermWithName( name ) {
		this.components.termsList.editTermWithName( name );
		return new WPAdminPostTermEdit( this.driver, { visit: false } );
	}

	viewTermWithName( name ) {
		this.components.termsList.viewTermWithName( name );
		return new CategoryPage( this.driver, { visit: false } );
	}

	deleteTermWithName( name ) {
		this.components.termsList.deleteTermWithName( name );
		return this;
	}
}

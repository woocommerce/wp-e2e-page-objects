/**
 * Internal Dependencies
 */
import ComponentPostTermFormEdit from '../../components/wp-admin/component-post-term-form-edit';
import WPAdmin from './wp-admin';

const components = {
	form: ComponentPostTermFormEdit,
};

const defaultArgs = {
	url: '',
	visit: true,
	components: components,
};

export default class WPAdminPostTermEdit extends WPAdmin {
	constructor( driver, args = {} ) {
		args = Object.assign( defaultArgs, args );
		super( driver, args );
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

	update() {
		return this.components.form.submit();
	}
}

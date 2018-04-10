/**
 * Internal dependencies
 */
import Page from './page';
import ComponentComment from '../components/component-comment';

export default class SinglePage extends Page {
	constructor( driver, args = {} ) {
		args = Object.assign(
			{
				url: '/',
				visit: true,
				components: {
					comment: ComponentComment,
				},
			},
			args
		);
		super( driver, args );
	}

	postComment( comment, args = {} ) {
		args = Object.assign(
			{
				comment: comment,
			},
			args
		);

		const comp = this.components.comment;
		[ 'name', 'email', 'url', 'comment' ].forEach( f => {
			if ( args[ f ] ) {
				const setter = 'set' + f.charAt( 0 ).toUpperCase() + f.substr( 1 );
				comp[ setter ]( args[ f ] );
			}
		} );

		return comp.submit();
	}
}

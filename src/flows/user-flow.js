/**
 * External dependencies
 */
import { WebDriverHelper as helper } from 'wp-e2e-webdriver';

/**
 * Internal dependencies
 */
import { PAGE, getPageUrl } from '../page-map';

export default class UserFlow {
	constructor( driver, { baseUrl = 'http://example.com', username = '', password = '' } ) {
		this.driver = driver;
		this.baseUrl = baseUrl;
		this.username = username;
		this.password = password;

		helper.clearCookiesAndDeleteLocalStorage( this.driver );

		const loginPage = this.open( PAGE.WP_LOGIN );
		this.currentPage = loginPage.login( this.username, this.password );
	}

	open( page, ...args ) {
		if ( 'object' !== typeof page ) {
			throw new Error( 'page should be an object containing `path` and `oject`.' );
		}

		const PageObject = page.object;
		const pageArgs = {
			url: getPageUrl( this.baseUrl, page, ...args ),
			visit: true,
		};

		this.currentPage = new PageObject( this.driver, pageArgs );

		return this.currentPage;
	}

	createPost( post ) {
		post = Object.assign(
			{
				title: '',
				status: 'Published',
			},
			post
		);

		const newPostPage = this.open( PAGE.WP_ADMIN_NEW_POST );
		this._setPost( newPostPage, post );

		return post.status === 'Published'
			? newPostPage.publish()
			: newPostPage.save();
	}

	_setPost( page, post ) {
		// TODO(gedex): set content, status, etc.

		if ( post.title ) {
			page.setTitle( post.title );
		}

		if ( post.status ) {
			page.selectStatus( post.status );
		}
	}

	createCategory( category ) {
		category = Object.assign( { name: '' }, category );

		const categoriesPage = this.open( PAGE.WP_ADMIN_CATEGORIES );
		this._setCategory( categoriesPage, category );

		return categoriesPage.add();
	}

	_setCategory( page, category ) {
		if ( category.name ) {
			page.setName( category.name );
		}

		if ( category.slug ) {
			page.setSlug( category.slug );
		}

		if ( category.parent ) {
			page.selectParent( category.parent );
		}

		if ( category.description ) {
			page.setDescription( category.description );
		}
	}

	createTag( tag ) {
		tag = Object.assign( { name: '' }, tag );

		const tagsPage = this.open( PAGE.WP_ADMIN_TAGS );
		this._setTag( tagsPage, tag );

		return tagsPage.add();
	}

	_setTag( page, tag ) {
		if ( tag.name ) {
			page.setName( tag.name );
		}

		if ( tag.slug ) {
			page.setSlug( tag.slug );
		}

		if ( tag.description ) {
			page.setDescription( tag.description );
		}
	}

	addComment( postTitle, comment ) {
		const postsList = this.open( PAGE.WP_ADMIN_POSTS );
		const post = postsList.viewPostWithTitle( postTitle );

		return post.postComment( comment );
	}

	logout() {
		return this.currentPage.hoverMyAccountThenClickSubmenu( 'Log Out' );
	}
}

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
			visit: true
		};

		this.currentPage = new PageObject( this.driver, pageArgs );

		return this.currentPage;
	}

	createPost( post ) {
		post = Object.assign(
			{
				title: '',
				status: 'Published'
			},
			post
		);

		const newPostPage = this.open( PAGE.WP_ADMIN_NEW_POST );
		this._setPost( newPostPage, post );

		return post.status === 'Published'
			? newPostPage.publish()
			: newPostPage.save();
	}

	addComment( postTitle, comment ) {
		const postsList = this.open( PAGE.WP_ADMIN_POSTS );
		const post = postsList.viewPostWithTitle( postTitle );

		return post.postComment( comment );
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

	logout() {
		return this.currentPage.hoverMyAccountThenClickSubmenu( 'Log Out' );
	}
}

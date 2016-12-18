/**
 * External dependencies
 */
import chai from 'chai';

/**
 * Internal dependencies
 */
import { PageMap } from '../src/index';

const assert = chai.assert;

const baseUrl = 'https://example.com';

// Shortcut.
const PAGE = PageMap.PAGE;
const getPageUrl = PageMap.getPageUrl;

// Test data.
const testData = [
	[ [ baseUrl, PAGE.WP_LOGIN ], 'https://example.com/wp-login.php' ],
	[ [ baseUrl, PAGE.WP_ADMIN ], 'https://example.com/wp-admin/' ],
	[ [ baseUrl, PAGE.WP_ADMIN_DASHBOARD ], 'https://example.com/wp-admin/' ],
	[ [ baseUrl, PAGE.WP_ADMIN_POSTS ], 'https://example.com/wp-admin/edit.php' ],
	[ [ baseUrl, PAGE.WP_ADMIN_NEW_POST ], 'https://example.com/wp-admin/post-new.php' ],
	[ [ baseUrl, PAGE.WP_ADMIN_EDIT_POST, 1 ], 'https://example.com/wp-admin/post.php?post=1&action=edit' ],
	[ [ baseUrl, PAGE.WP_ADMIN_CATEGORIES ], 'https://example.com/wp-admin/edit-tags.php?taxonomy=category' ],
	[ [ baseUrl, PAGE.WP_ADMIN_TAGS ], 'https://example.com/wp-admin/edit-tags.php?taxonomy=post_tag' ],
	[ [ baseUrl, PAGE.WP_ADMIN_PAGES ], 'https://example.com/wp-admin/edit.php?post_type=page' ],
	[ [ baseUrl, PAGE.WP_ADMIN_NEW_PAGE ], 'https://example.com/wp-admin/post-new.php?post_type=page' ],
	[ [ baseUrl, PAGE.WP_ADMIN_EDIT_PAGE, 1 ], 'https://example.com/wp-admin/post.php?post=1&action=edit' ],
	[ [ baseUrl, PAGE.WP_ADMIN_COMMENTS ], 'https://example.com/wp-admin/edit-comments.php' ],
	[ [ baseUrl, PAGE.WP_ADMIN_EDIT_COMMENT, 1 ], 'https://example.com/wp-admin/comment.php?action=editcomment&c=1' ],
];

describe( 'PageMap', () => {
	it( 'should return full page URL with getPageUrl', () => {
		testData.forEach( ( test ) => {
			const actual = getPageUrl( ...test[ 0 ] );
			const expected = test[ 1 ];

			assert.equal( expected, actual );
		} );
	} );
} );

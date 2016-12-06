wp-page-objects
===============

WordPress Page Objects to be used on end-to-end tests with Selenium WebDriver.

## Install

```
npm install wp-page-objects
```

## Usage

Example of front-page assertion:

~~~js
import assert from 'assert';
import { WebDriverManager } from 'wp-e2e-webdriver';
import { FrontPage } from 'wp-e2e-page-objects';

const manager = new WebDriverManager( 'chrome', {
	baseUrl: 'http://local.wordpress.dev'
} );
const driver = manager.getDriver();

const frontPage = new FrontPage( driver, {
	url: manager.getPageUrl( '/' )
} );

assert( frontPage.sidebar.displayed() );
assert( frontPage.sidebar.widgets.recentPosts.displayed() );
assert( frontPage.sidebar.widgets.recentComments.displayed() );
~~~

Login through `/wp-login.php`:

~~~js
import { WebDriverManager, WebDriverHelper as helper } from 'wp-e2e-webdriver';

const manager = new WebDriverManager( 'chrome', {
	baseUrl: 'http://local.wordpress.dev'
} );
const driver = manager.getDriver();

helper.clearCookiesAndDeleteLocalStorage()
const wpLogin = new WPLogin( driver, { url: manager.getPageUrl( '/wp-login.php' ) } );
const dashboard = wpLogin.login( 'username', 'password' );
~~~

## Covered Page Objects

### Front-Page

Use twentysixteen theme by default, but class can be extended with
you own CSS selector.

* `FrontPage`
  * `.components.sidebar` → `ComponentSidebar`
    * `.components.widgets.recentPosts` → `ComponentWidgetRecentPosts`
    * `.components.widgets.recentComments` → `ComponentWidgetRecentComments`

### WP-Admin

Fresh install with hello-dolly plugin deactivated.

* `WPAdminDashboard`
  * `.components.welcomePanel` → `ComponentWelcomePanel`
* `WPAdminPluginInstall`
  * `.components.filter` → `ComponentPluginInstallFilter`
* `WPAdminPlugins`
  * `.components.pluginsList` → `ComponentPluginsList`
* `WPAdminPostEdit`
  * `.components.metaBoxCategories` → `ComponentMetaBoxCategories`
  * `.components.metaBoxFormat` → `ComponentMetaBoxFormat`
  * `.components.metaBoxPublish` → `ComponentMetaBoxPublish`
* `WPAdminPostNew`
  * `.components.metaBoxCategories` → `ComponentMetaBoxCategories`
  * `.components.metaBoxFormat` → `ComponentMetaBoxFormat`
  * `.components.metaBoxPublish` → `ComponentMetaBoxPublish`
* `WPAdminPosts`
  * `.components.postsList` → `ComponentPostsList`
* `WPLogin`
  * `.components.loginForm` → ComponentLoginForm

## Tests

See [README.md on test dir](./test/README.md) for running tests of this package.

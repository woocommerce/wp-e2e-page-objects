Notes on Testing this package
=============================

Currently this test is run against a local WordPress site at https://wp-e2e.dev/.
Test site is created with [vv](https://github.com/bradp/vv) with default content
on first install and use twentysixteen theme.

Eventually, a remote site will be created with the same setup.

## Running the test

```
npm test
```

## Test configs

Test config files can be found in `test/config`. To override specific config based on active environment, create a `local-{env}.json` file. It's gitignored.

## Running specific test file

```
env NODE_CONFIG_DIR='./tets/config' ./node_modules/mocha/bin/mocha --compilers js:babel-register test/front-page.js
```

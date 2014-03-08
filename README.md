# grunt-pkgrev

> Add revision number to your files based on package.json version.


## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-pkgrev --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pkgrev');
```

## The "pkgrev" task

### Overview
In your project's Gruntfile, add a section named `pkgrev` to the data object passed into `grunt.initConfig()`. 

```js
grunt.initConfig({
  pkgrev: {
      all_options: {
        options: {
          'revmap': 'test/output/all/revmap.json',
        },
        files: {
          'all': ['test/output/all/assets/**/*'],
        },
      },
      only_options: {
        options: {
          'revmap': 'test/output/only/revmap.json',
        },
        files: {
          'only': ['test/output/only/assets/**/*.{css,js,jpg}'],
        },
      },
      all_except_options: {
        options: {
          'revmap': 'test/output/except/revmap.json',
        },
        files: {
          'except': ['test/output/except/assets/**/*', '!test/output/except/**/*.{png,jpg}'],
        },
      },
    }
});
```

### Options

#### options.revmap
Type: `String`
Default value: `'revmap.json'`

The path where you want to save the generated revmap.json file. The default is in the project root.

#### Files
Type: `String` | `Array`

The files you want to rev. Currently this is a destructive operation. Use in conjunction with `copy` or similar to move original files.
Typically you would rev after is said and done inside the distribution directory. See the `Gruntfile.js` for sample flow working with `grunt-contrib-copy`, `grunt-bump`
and `grunt-usemin`.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Roadmap

### 1.4.0
- Specify `file` and/or `field` to use for version/revision number.

## Release History
2014-03-07: 1.3.7 - Initial Release (Just because I forgot to reset the version number after testing).

Contribute, Comment, Fork, Enjoy!

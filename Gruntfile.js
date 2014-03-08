/*
 * grunt-pkgrev
 * https://github.com/creativekinetix/grunt-pkgrev
 *
 * Copyright (c) 2014 Michael Boucher
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/output/**/*'],
    },
    copy: {
        all_options: {
            files: [
                {expand: true, cwd: 'test/assets/', src  : ['**'], dest : 'test/output/all/assets/'},
                {expand: true, cwd: 'test/assets/', src  : ['**'], dest : 'test/output/only/assets/'},
                {expand: true, cwd: 'test/assets/', src  : ['**'], dest : 'test/output/except/assets/'},
                {expand: true, cwd: 'test/html/', src  : ['**'], dest : 'test/output/all/'},
                {expand: true, cwd: 'test/html/', src  : ['**'], dest : 'test/output/only/'},
                {expand: true, cwd: 'test/html/', src  : ['**'], dest : 'test/output/except/'}
            ]
        }
    },
    //********************************************************************************
    //  Setup optimization tasks from markup
    //********************************************************************************
    useminPrepare: {
      all: {  
        html: ['test/html/index.html'],
        options: {
            dest: 'test/output/all'
        }
      },
      except: {  
        html: ['test/html/index.html'],
        options: {
            dest: 'test/output/except'
        }
      },
      only: {  
        html: ['test/html/index.html'],
        options: {
            dest: 'test/output/only'
        }
      }
    },

    // usemin: {
    //     html: ['test/output/all/**/*.html'],
    //     css: ['test/output/all/**/*.css'],
    //     options: {
    //         dirs: ['test/output/all'],
    //         revmap: 'test/output/all/revmap.json'
    //     }
    // },
    
    usemin: {
      allhtml: {
        options: {
          type: 'html',
          dirs: ['test/output/all'],
          revmap: 'test/output/all/revmap.json'
        },
        files: [{
          src: ['test/output/all/*.html']
        }]
      },
      excepthtml: {
        options: {
          type: 'html',
          dirs: ['test/output/except'],
          revmap: 'test/output/except/revmap.json'
        },
        files: [{
          src: ['test/output/except/*.html']
        }]
      },
      onlyhtml: {
        options: {
          type: 'html',
          dirs: ['test/output/only'],
          revmap: 'test/output/only/revmap.json'
        },
        files: [{
          src: ['test/output/only/*.html']
        }]
      },
      
      allcss: {
        options: {
          type: 'css',
          dirs: ['test/output/all'],
          revmap: 'test/output/all/revmap.json'
        },
        files: [{
          src: ['test/output/all/assets/*.css']
        }]
      },
      exceptcss: {
        options: {
          type: 'css',
          dirs: ['test/output/except'],
          revmap: 'test/output/except/revmap.json'
        },
        files: [{
          src: ['test/output/except/assets/*.css']
        }]
      },
      onlycss: {
        options: {
          type: 'css',
          dirs: ['test/output/only'],
          revmap: 'test/output/only/revmap.json'
        },
        files: [{
          src: ['test/output/only/assets/*.css']
        }]
      },
    },
    
    
    
    // BUMP VERSION
    bump: {
      options: {
        files: ['version.json'],
        updateConfigs: [],
        commit: false,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'], // '-a' for all files
        createTag: false,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
      }
    },
    
    
    
    // Configuration to be run (and then tested).
    pkgrev: {
      all_options: {
        options: {
          'revmap': 'test/output/all/revmap.json',
          'vfile':  'version.json'
        },
        files: {
          'all': ['test/output/all/assets/**/*'],
        },
      },
      only_options: {
        options: {
          'revmap': 'test/output/only/revmap.json',
          'vfile':  'version.json'
        },
        files: {
          'only': ['test/output/only/assets/**/*.{css,js,jpg}'],
        },
      },
      all_except_options: {
        options: {
          'revmap': 'test/output/except/revmap.json',
          'vfile':  'version.json'
        },
        files: {
          'except': ['test/output/except/assets/**/*', '!test/output/except/**/*.{png,jpg}'],
        },
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', 
    ['clean', 
     'copy',
     'useminPrepare',
     'bump-only:patch',
     'pkgrev',
     'usemin',
     'nodeunit'
    ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
  grunt.registerTask('testonly','nodeunit');

};

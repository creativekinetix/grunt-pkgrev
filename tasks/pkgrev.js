/*
 * grunt-pkgrev
 * https://github.com/creativekinetix/grunt-pkgrev
 *
 * Copyright (c) 2014 Michael Boucher
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  
  var fs    = require('fs'),
      path  = require('path');
  
  grunt.registerMultiTask('pkgrev', 'Asset revisioning using package.json version number. Creates revmap.json file for usemin.', function() {
    
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      'revmap': 'revmap.json',
      'vfile':  'package.json',
    });
    
    var pkg     = grunt.file.readJSON('package.json'),
        vfile   = (options.vfile === 'package.json') ? pkg : grunt.file.readJSON(options.vfile),
        revmap  = {};
    
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        
        var ext = path.extname(filepath),
            dirname = path.dirname(filepath),
            revved = [ path.basename(filepath, ext), vfile.version, ext.slice(1)].join('.');
            
        revmap[path.normalize(filepath)] = path.join(dirname, revved);
        grunt.file.write(options.revmap , JSON.stringify(revmap));    
        
        grunt.log.write('Adding revmap').ok(options.revmap);
            
        fs.renameSync(filepath, path.resolve(path.dirname(filepath), revved));
        grunt.log.write(filepath + ' ').ok(revved);
        
      });

      // Print a success message.
      grunt.log.writeln("Assets successfully revved.");
      
    });
  });

};

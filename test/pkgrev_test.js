'use strict';

var grunt   = require('grunt'),
    fs      = require('fs'),
    path    = require('path'),
    pkg     = grunt.file.readJSON('package.json'),
    vfile   = grunt.file.readJSON('version.json'), // misc file to test
    ver     = vfile.version;




var testRevs = function (revmap,files) {
  
  var pass = true;
  var err = [];
  var filepath;
  for ( var key in revmap ) {
    
    filepath = revmap[key];
    
    if(!fs.existsSync(filepath)) {
      pass = false;
      err.push(filepath+' does not exist. Version: '+ver);
    }
    
  }
  
  return { 'pass': pass , 'err': err };
  
};


var testRevmapKeys = function (revmap,files) {
  
  var pass = true;
  var err = [];
  var filepath;
  for ( var key in revmap ) {
    
    filepath = "test/assets/"+key.split('/').pop();
    
    if(!fs.existsSync(filepath)) {
      pass = false;
      err.push(key+' is not a valid key. Not original file. Version: '+ver);
    }
    
  }
  
  return { 'pass': pass , 'err': err };
  
};


var testRevmapValues = function (revmap,files) {
  
  var pass = true;
  var err = [];
  var f;
  for ( var key in revmap ) {
    
    f = revmap[key].split('/').pop();
    
    if(files.indexOf(f) < 0) {
      pass = false;
      err.push(f+' is invalid revision file. Version: '+ver);
    }
    
  }
  
  return { 'pass': pass , 'err': err };
  
};



/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.pkgrev = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  all_options: function(test) {
    test.expect(3);
    
    var revmap  = grunt.file.readJSON('test/output/all/revmap.json'),
        files   = [ 'buttons.'+ver+'.css',
                    'global.'+ver+'.css',
                    'logo.'+ver+'.png',
                    'main.'+ver+'.js',
                    'photo.'+ver+'.jpg',
                    'slideshow.'+ver+'.js'
                  ];
    
    var revs = testRevs(revmap,files);
    test.ok(revs.pass,revs.err.join(' |||| '));
    
    var keys = testRevmapKeys(revmap,files);
    test.ok(keys.pass,keys.err.join(' |||| '));
    
    var values = testRevmapValues(revmap,files);
    test.ok(values.pass,values.err.join(' |||| '));
    
    test.done();
  },
  only_options: function(test) {
    test.expect(3);
    
    var revmap  = grunt.file.readJSON('test/output/only/revmap.json'),
        files   = [ 'buttons.'+ver+'.css',
                    'global.'+ver+'.css',
                    'logo.png',
                    'main.'+ver+'.js',
                    'photo.'+ver+'.jpg',
                    'slideshow.'+ver+'.js'
                  ];
    
    
    var revs = testRevs(revmap,files);
    test.ok(revs.pass,revs.err.join(' |||| '));
    
    var keys = testRevmapKeys(revmap,files);
    test.ok(keys.pass,keys.err.join(' |||| '));
    
    var values = testRevmapValues(revmap,files);
    test.ok(values.pass,values.err.join(' |||| '));
    
    test.done();
  },
  all_except_options: function(test) {
    test.expect(3);
    
    var revmap  = grunt.file.readJSON('test/output/except/revmap.json'),
        files   = [ 'buttons.'+ver+'.css',
                    'global.'+ver+'.css',
                    'logo.png',
                    'main.'+ver+'.js',
                    'photo.jpg',
                    'slideshow.'+ver+'.js'
                  ];
    
    var revs = testRevs(revmap,files);
    test.ok(revs.pass,revs.err.join(' |||| '));
    
    var keys = testRevmapKeys(revmap,files);
    test.ok(keys.pass,keys.err.join(' |||| '));
    
    var values = testRevmapValues(revmap,files);
    test.ok(values.pass,values.err.join(' |||| '));
    
    test.done();
  },
};

'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };


  grunt.initConfig({
    yeoman: yeomanConfig,
    includeSource: {
        options: {
            basePath: '<%= yeoman.app %>'
        },
        myTarget: {
            files: {
                '<%= yeoman.app %>/index.html': '<%= yeoman.app %>/index.tpl.html'
            }
        }
    },
    watch: {
      coffee: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        files: [
          '<%= yeoman.app %>/templates/{,*/}*.html',
          '<%= yeoman.app %>/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/css/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      }
    },
    connect: {
      options: {
        port: 80,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              require('grunt-connect-rewrite/lib/utils').rewriteRequest,
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      includeSource: {
          files: [{
              dot: true,
              src: ['<%= yeoman.app %>/index.html']
          }]
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      e2e: {
        configFile: 'karma-e2e.conf.js',
        singleRun: true

      }
    },
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/components',
        relativeAssets: true
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    concat: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '.tmp/scripts/{,*/}*.js',
            '<%= yeoman.app %>/scripts/{,*/}*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/*.html'],
      //html: ['<%= yeoman.dist %>/{,*/}*.html'],
      //css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          //removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          //collapseBooleanAttributes: true,
          //removeAttributeQuotes: true,
          //removeRedundantAttributes: true,
          //useShortDoctype: true
          //removeEmptyAttributes: true,
          //removeOptionalTags: true,
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          //src: ['*.html', 'views/*.html', 'views/*/*.html'],
          src: ['*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            'sitemap.xml',
            'components/**/*',
            'data/*',
            'get/**/*',
            'support/**/*',
            'contact/**/*',
            'privacy/**/*',
            'press/**/*',
            'eternity_scripts/**/*',
            'landing_scripts/**/*',
            'images/**/*',
            'styles/font/**/*',
            'styles/remote.css',
            'localsettings.js',
			'views/**/*' // Just a fallback
          ]
        }]
      }
    },

    htmlSnapshot: {
      all: {
          options: {
              //that's the path where the snapshots should be placed
              //it's empty by default which means they will go into the directory
              //where your Gruntfile.js is placed
              snapshotPath: 'dist/snapshots/',
              //This should be either the base path to your index.html file
              //or your base URL. Currently the task does not use it's own
              //webserver. So if your site needs a webserver to be fully
              //functional configure it here.

              // I commented this out because it has no connection with local stuff
              //sitePath: localsettings.liveFrontendDomain + '/#!/',
              sitePath: 'https://www.example.com/',

              //you can choose a prefix for your snapshots
              //by default it's 'snapshot_'
              fileNamePrefix: 'sp_',
              //by default the task waits 500ms before fetching the html.
              //this is to give the page enough time to to assemble itself.
              //if your page needs more time, tweak here.
              msWaitForPages: 2000,
              //if you would rather not keep the script tags in the html snapshots
              //set `removeScripts` to true. It's false by default
              removeScripts: true,
              //he goes the list of all urls that should be fetched
              // DO FORGET TO UPDATE sitemap.xml ***
              urls: [
                  '',
                  'about',
                  'clientsignup',
                  'expertapply'
              ]
          }
      }
    },
    devserver : {
        options: {
            'port': '80',
            'base': 'app/'
        }
    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', [
    'includeSource',
    'clean:server',
    //'configureRewriteRules',
    //'coffee:dist',
    //'compass:server',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

//  grunt.registerTask('test', [
//    'clean:server',
//    //'coffee',
//    'compass',
//      'livereload-start',
//      'connect:livereload',
//    'karma'
//  ]);

  grunt.registerTask('build', [
    'clean:dist',
    //'jshint',
    //'test',
    //'coffee',
    //'compass:dist',
    'useminPrepare',
    //'imagemin',
    'cssmin',
    'htmlmin',
    'concat',
    'copy',
    //'cdnify',
    'ngmin',
    'uglify',
    //'rev',
    'usemin'
  ]);

  grunt.registerTask('default', ['server']);

};

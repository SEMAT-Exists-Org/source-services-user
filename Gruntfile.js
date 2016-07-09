'use strict';

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: ['gruntfile.js', 'application.js', 'apis/**/*.js', 'test/**/*.js'],
        options: {
          livereload: 12346
        }
      },
      html: {
        files: ['public/views/**', 'app/views/**'],
        options: {
          livereload: 12346
        }
      }
    },
    nodemon: {
      dev: {
        script: 'application.js',
        options: {
          args: [],
          ignore: ['public/**'],
          ext: 'js,html',
          nodeArgs: [],
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },
    serve: ['nodemon', 'watch'],
    concurrent: {
      serve: ['nodemon', 'watch'],
      debug: ['node-inspector', 'shell:debug', 'open:debug'],
      options: {
        logConcurrentOutput: true
      }
    },
    env : {
      options : {},
      // environment variables - see https://github.com/jsoverson/grunt-env for more information
      local: {
        FH_USE_LOCAL_DB: true
      }
    },
    'node-inspector': {
      dev: {}
    },
    shell: {
      debug: {
        options: {
          stdout: true
        },
        command: 'env NODE_PATH=. node --debug-brk application.js'
      },
      unit: {
        options: {
          stdout: true,
          stderr: true
        },
        command: 'env NODE_PATH=. ./node_modules/.bin/turbo --setUp=test/unit/global.js --tearDown=test/unit/global.js --series=true test/unit'
      },
      accept: {
        options: {
          stdout: true,
          stderr: true
        },
        command: 'env NODE_PATH=. ./node_modules/.bin/turbo --setUp=test/accept/server.js --tearDown=test/accept/server.js test/accept'
      }
    },
    open: {
      debug: {
        path: 'http://127.0.0.1:8080/debug?port=5858',
        app: 'Google Chrome'
      },
      platoReport: {
        path: './plato/index.html',
        app: 'Google Chrome'
      }
    },
    plato: {
      src: {
        options : {
          jshint : grunt.file.readJSON('.jshintrc')
        },
        files: {
          'plato': ['apis/**/*.js']
        }
      }
    },
    cucumberjs: {
      src: 'tests/features',
      options: {
        format: 'pretty',
        steps: 'tests/features/step_definitions'
      }
    }
  });

  // Load NPM tasks
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
  grunt.loadNpmTasks('grunt-cucumber');

  // Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  grunt.registerTask('run-test', ['shell:cucumberjs']);
  grunt.registerTask('test', ['cucumberjs']);
  grunt.registerTask('analysis', ['plato:src', 'open:platoReport']);
  grunt.registerTask('serve', ['env:local', 'concurrent:serve']);
  grunt.registerTask('debug', ['env:local', 'concurrent:debug']);
  grunt.registerTask('default', ['serve']);
};
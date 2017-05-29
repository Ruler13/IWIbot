/**
 * Created by Armin on 25.05.2017.
 */
'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'public/javascripts/bundle.js',
                dest: 'public/javascripts/bundle.min.js'
            }
        },
        nodeunit: {
            files: ['public/javascripts/tests/**/*.js']
        },
        jshint: {
            files: ['**/*.js', // Alle javascript files außer nachfolgende
                    '!Gruntfile.js',
                    '!node_modules/**',
                    '!tts-token.js',
                    '!stt-token.js',
                    '!public/javascripts/jquery.leanModal.min.js',
                    '!public/javascripts/bundle.js',
                    '!public/javascripts/bundle.min.js'],
            options: {
                "curly": true,
                "eqeqeq": true,
                "immed": true,
                "latedef": "nofunc",
                "newcap": true,
                "noarg": true,
                "sub": true,
                "undef": true,
                "unused": true,
                "boss": true,
                "eqnull": true,
                "node": true,
                "globals": {
                    "jQuery": true,
                    "require": true,
                    "__dirname": true,
                    "module": true,
                    "Promise": true,
                    "window": true,
                    "document": true,
                    "localStorage": true,
                    "$": true,
                    "event": true,
                    "btoa": true,
                    "fetch": true
                },
                "reporterOutput": "" // This is to ommit bug!
            }
        },

        // run once  --> grunt watch
        // After that every change on a file matching the patterns used bellow
        // will execute the corresponding task
        watch: {
            unittest: {
                files: '<%= nodeunit.files %>',
                tasks: ['nodeunit']
            },
            linting: {
                files: '<%= jshint.files %>',
                tasks: ['jshint']
            }
            /*,
            uglify: {
                files: '<%= uglify.build.src %>',
                tasks: ['uglify']
            }*/
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint'); // Linter
    grunt.loadNpmTasks('grunt-contrib-nodeunit'); // Unittest engine?
    grunt.loadNpmTasks('grunt-contrib-uglify'); // Minifier
    grunt.loadNpmTasks('grunt-contrib-watch'); //

    // Default task.
    grunt.registerTask('default', ['nodeunit','jshint']);
};
"use strict";

module.exports = function ( grunt ) {

    // Project configuration.
    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),

        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'src/css/main.css': 'src/sass/main.scss'
                }
            }
        },

        jshint: {

            options: {
                jshintrc: ".jshintrc"
            },
            defaults: [
                "src/**/*.js",
                'Gruntfile.js'
            ]
        },

        csslint: {
            strict: {
                options: {
                    csslintrc: '.csslintrc',
                    import: 2,
                    formatters: ['compact']
                },
                src: [
                    'src/**/*.css'
                ]
            }
        },

        connect: {
            mock: {
                options: {
                    base: 'src/',
                    open: true,
                    keepalive: true
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 3 versions', 'ie 8']
            },
            main: {
                expand: true,
                flatten: true,
                src: 'src/css/main.css',
                dest: 'src/css'
            }
        }

    });

    grunt.loadNpmTasks( 'grunt-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-csslint' );
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Runs all checkstyle stuff
    grunt.registerTask( 'default', [
        'sass',
        'autoprefixer',
        'jshint',
        'csslint'
    ] );

};

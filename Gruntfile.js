module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /* grab the Bootstrap js and combine it with my custom scripts
        The goal is to limit the number of http requests to increase load time
         */
        concat: {
            options: {
                stripBanners: false,
                sourceMap: true,
                banner: '',
            },
            scripts: {
                src: ['bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js', 'js/main.js'],
                dest: 'dist/js/scripts.js',
            },
        },

        /* Now minify the scripts */
        uglify: {
            scripts: {
                src: ['dist/js/scripts.js'], //input
                dest: 'dist/js/scripts.min.js' //output
            },
        },

        /* Convert the Sass into CSS */
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/css/styles.css': 'sass/styles.scss'
                }
            }
        },


        /* Make sure the CSS accounts for browser inconsistency */
        postcss: {
            options: {
                map: true,
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({ browsers: 'last 2 versions' }), // add vendor prefixes
                    require('postcss-flexbugs-fixes'),
                    //require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: 'dist/css/*.css'
            }
        },


        /* Auto Update the scripts and styles when working */
        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            styles: {
                files: ['sass/*.scss'],
                tasks: ['sass', 'postcss'],
                options: {
                    spawn: false,
                },
            },
        },

        copy: {
            images: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,svg}'],
                    dest: 'dist/images/'
                }]
            }
        },

    });
    // END GRUNT


    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'concat', 'uglify', 'sass', 'postcss']);

};
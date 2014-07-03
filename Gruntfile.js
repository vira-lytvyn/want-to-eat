module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                expand: true,
                src: 'dev/*.html',
                dest: 'build/',
                flatten: true
            },
            icons: {
                expand: true,
                cwd: 'dev/img/',
                src: ['**/*.{jpg,png,gif}'],
                dest: 'build/img/'
            }
        },
        concat: {
            script: {
                src: 'dev/js/*.js',
                dest: 'build/js/script.js'
            }
        },
        uglify: {
            compress: {
                src: 'build/js/script.js',
                dest: 'build/js/script.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'build/css/style.css': 'dev/scss/style.scss'
                }
            }
        },
        watch: {
            html: {
                files: ['dev/*.html'],
                tasks: ['copy:main']
            },
            scripts: {
                files: ['dev/js/*.js'],
                tasks: ['concat', 'uglify']
            },
            style: {
                files: ['dev/scss/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },
            images: {
                files: ['dev/img/**/*.{jpg,png,gif}'],
                tasks: ['copy:icons']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['copy', 'concat', 'uglify', 'sass']);
};
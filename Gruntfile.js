module.exports = function(grunt) {
    var banner = '/*\n<%= pkg.name %> <%= pkg.version %>';
    banner += '- <%= pkg.description %>\n<%= pkg.repository.url %>\n';
    banner += 'Built on <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n';
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'src/*.js'],
            options: {
                maxlen: 140,
                quotmark: 'single'
            }
        },
        concat: {
            options: {
                separator: ';\n',
                banner: banner
            },
            build: {
                files: [{
                    src: ['src/*.js'], 
                    dest: 'build/<%= pkg.name %>.js'
                }]
            },
        },
        uglify: {
            options: {
                banner: banner,
            },
            build: {
                files: { 
                    'build/<%= pkg.name %>.min.js': 
                        ['build/<%= pkg.name %>.js'],
                }
            }
        },
        simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            },
            all: { src: ['test/**/*.test.js'] }
        }
    });
 
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-simple-mocha');
 
    grunt.registerTask('default', 
        ['jshint', 'simplemocha', 'concat', 'uglify']);
};
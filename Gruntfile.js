module.exports = function(grunt) {

    "use strict";

    var pkg = grunt.file.readJSON("package.json"),
        key;

    grunt.initConfig({
        pkg: pkg,
        banner: "/*!\n" +
                " * <%= pkg.title %> v<%= pkg.version %>\n" +
                " * <%= pkg.homepage %>\n" +
                " *\n" +
                " * Copyright <%= grunt.template.today('yyyy') %> <%= pkg.author %>\n" +
                " * Released under the <%= pkg.license %> license\n" +
                " */\n",
        clean: {
            files: ["build/<%= pkg.version %>", "dist/"]
        },
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            files: ["*.js", "src/<%= pkg.name %>.js"]
        },
        uglify: {
            dist: {
                src: "src/<%= pkg.name %>.js",
                dest:  "dist/<%= pkg.name %>.min.js"
            }
        },
        usebanner: {
            options: {
                position: "top",
                banner: "<%= banner %>"
            },
            files: ["dist/*.js"]
        },
        copy: {
            dist: {
                expand: true,
                cwd: "src/",
                src: "*.js",
                dest: "dist/",
                filter: "isFile"
            },
            build: {
                expand: true,
                cwd: "dist/",
                src: "*.js",
                dest: "build/<%= pkg.version %>/",
                filter: "isFile"
            }
        },
        watch: {
            files: ["src/*.js"],
            tasks: "default"
        }
    });

    // Loading dependencies
    for (key in pkg.devDependencies) {
        if (key !== "grunt" && key.indexOf("grunt") === 0) {
            grunt.loadNpmTasks(key);
        }
    }

    grunt.registerTask("default", ["clean", "jshint", "uglify", "copy:dist", "usebanner", "copy:build"]);
};
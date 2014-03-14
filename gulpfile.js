(function () {
    "use strict";
    var gulp = require('gulp');
    var gutil = require('gulp-util');

    var coffee = require('gulp-coffee');

    var clean = require('gulp-clean');

    gulp.task('clean', function () {
        gulp.src('public', {
            read: false
        }).pipe(clean());
    });


    gulp.task('coffee', function () {
        gulp.src('./src/*.coffee')
            .pipe(coffee({
                bare: true
            }).on('error', gutil.log))
            .pipe(gulp.dest('./public/'));
    });

    gulp.task('copy', function () {
        return gulp.src('./src/resources/bower_components/gremlins.js/gremlins.min.js')
            .pipe(gulp.dest('./public/resources/js'));
    });

    var imagemin = require('gulp-imagemin');

    gulp.task('imagemin', function () {
        gulp.src('src/resources/images/*')
            .pipe(imagemin())
            .pipe(gulp.dest('public/resources/images'));
    });


    gulp.task('default', ['clean'], function () {
        // place code for your default task here

        gulp.run('coffee');
        gulp.run('imagemin');
        gulp.run('copy');

        gulp.watch('./src/*.coffee', function () {
            gulp.run('coffee');
        });

    });
})();

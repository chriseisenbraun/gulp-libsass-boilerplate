var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    //bourbon = require('node-bourbon'),
    neat = require('node-neat').includePaths,
     // Jade
    jade = require('gulp-jade'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

var coffeeSources = [
    'components/coffee/*.coffee'
];

var jsSources = [
    'components/lib/jquery/jquery.js',
    'components/scripts/*.js'
];

// Jade
var jadeSources = [
    'components/jade/*.jade'
];

var sassSources = [
    'components/sass/*.scss'
];

gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('coffee', function() {
    gulp.src(coffeeSources)
        .pipe(coffee({
            bare: true
        }).on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'))
});

//Jade

gulp.task('jade', function() {
    gulp.src(jadeSources)
        .pipe(jade({
          pretty: true
        }))
        .pipe(gulp.dest(''))
        .pipe(livereload());
});

gulp.task('sass', function() {
    gulp.src(sassSources)
        .pipe(sass({
            style: 'expanded',
            includePaths: ['node-neat'].concat(neat),
            lineNumbers: true
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('css'))
        .pipe(livereload());

});

gulp.task('watch', function() {
    var server = livereload();
    gulp.watch(jsSources, ['js']);
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(sassSources, ['sass']);
    gulp.watch(jadeSources, ['jade']);
    gulp.watch(['js/script.js', 'index.html'], function(e) {
        server.changed(e.path);
    });
});

gulp.task('default', ['sass', 'jade', 'js', 'coffee', 'watch']);

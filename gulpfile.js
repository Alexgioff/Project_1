var gulp = require('gulp');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');
var htmlClean = require('gulp-htmlclean');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


var paths = {
    app: 'app/**/*',
    appHTML: 'app/**/*.html',
    appCSS: 'app/**/main.css',
    appImage: 'app/assets/images/*.*',
    appJS: 'app/**/*.js',

    docs: 'docs',
    docsHTML: 'docs/index.html',
    docsImages: 'docs/assets/images/',
    docsCSS: 'docs/assets/css/*.css',
    docsJS: 'docs/assets/js/*.js'
}

gulp.task('html', function(){
    return gulp.src(paths.appHTML)
    .pipe(htmlClean())
    .pipe(gulp.dest(paths.docs));
});

gulp.task('css', function(){
 return gulp.src(paths.appCSS)
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.docs));
});

gulp.task('images', function(){
    return gulp.src(paths.appImage).pipe(gulp.dest(paths.docsImages));
})

gulp.task('js', function(){
    return gulp.src(paths.appJS)
        .pipe(uglify())
        .pipe(gulp.dest(paths.docs));
});

gulp.task('copy', ['html', 'css', 'images' ,'js'])

gulp.task('inject', ['copy'], function(){
    var css = gulp.src(paths.docsCSS);
    var js = gulp.src(paths.docsJS);

    return gulp.src(paths.docsHTML)
                .pipe(inject(css, {relative: true}))
                .pipe(inject(js, {relative: true}))
                .pipe(gulp.dest(paths.docs))
});

gulp.task('serve', ['inject'], function(){
    return gulp.src(paths.docs)
            .pipe(webserver({
                port: 3000,
                livereload: true
            }));
});

gulp.task('build', ['inject']);

gulp.task('watch', ['serve'], function(){
    gulp.watch(paths.app, ['inject']);
});

gulp.task('default', ['watch']);
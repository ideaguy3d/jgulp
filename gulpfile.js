var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
//var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('default', ['styles', 'copy-html', 'copy-images'], function() {
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('/index.html', ['copy-html']).on('change', browserSync.reload);

	browserSync.init({ server: './dist' });

	return gulp.src('/img/*')
		.pipe(imagemin({
			progressive: true,
			use: [pngquent()]
		}))
		.pipe(gulp.dest('/dist/images'));

});

gulp.task('dist', [
	'copy-html',
	'copy-images',
	'styles',
	'scripts-dist'
]);

gulp.task('scripts', function () {
	gulp.src('js/**/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', function () {
	gulp.src('js/**/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', function () {
	gulp.src('./index.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', function () {
	gulp.src('img/**/*')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('styles', function() {
	gulp.src('sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('tests', function () {
	gulp.src('tests/spec/extraSpec.js')
		.pipe(jasmine({
			integration: true, //true sets it to use Phantom, if set to false would run in node environment instead
			vendor: 'js/**/*.js'
		}));
});

browserSync.stream();




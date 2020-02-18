const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const flatten = require('gulp-flatten');


const path = {
	html: './src/html/**/*.html',
	scss: './src/scss/**/*.scss',
	js: './src/js/**/*.js',
	img: './src/images/**/*',
	fonts: './src/fonts/**/*'
}

function html() {
	return gulp.src(path.html)
		.pipe(gulp.dest('./build'))
		.pipe(browserSync.stream());
}

function scss() {
	return gulp.src(path.scss)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(cleanCSS())
		.pipe(flatten())
		.pipe(gulp.dest('./build/css'))
		.pipe(browserSync.stream());
}

function js() {
	return gulp.src(path.js)
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
}

function images() {
	return gulp.src(path.img)
		.pipe(gulp.dest('./build/images'))
		.pipe(browserSync.stream());
}

function fonts() {
	return gulp.src(path.fonts)
		.pipe(gulp.dest('./build/fonts'));
}

function clean() {
	return del(['./build/*']);
}

function watch() {
	browserSync.init({
		server: {
			baseDir: "./build/"
		}
	});
	gulp.watch(path.html, html);
	gulp.watch(path.scss, scss);
	gulp.watch(path.js, js);
	gulp.watch(path.img, images);
}

gulp.task('build', gulp.series(clean, gulp.parallel(html, scss, js, images, fonts)));
gulp.task('watch', watch);
gulp.task('dev', gulp.series('build', 'watch'));
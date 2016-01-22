const gulp = require('gulp');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const jshint = require('gulp-jshint');
require('jshint-stylish');
require('babel-core/register');

gulp.task('build', () => {
  return gulp.src( 'src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
  gulp.src(['src/**/*.js', '*.js', 'test/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function () {
	return gulp.src( 'test/*.js', { read: false } )
		.pipe( mocha( {compilers: ['js:babel-core/register']} ) );
});

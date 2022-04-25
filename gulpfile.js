const concat = require('gulp-concat');
const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const prefixer = require('autoprefixer');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

/**
 * Configuring paths
 * @type {Object}
 */

const paths = {
    src: {
        scripts: 'src/source/scripts/**/*',
        styles: 'src/source/styles/**/*.scss',
        bootstrapSrc: 'src/source/libs/bootstrap/css/source/*.scss',
    },
    build: {
        scripts: 'src/assets/js',
        styles: 'src/assets/css',
        bootstrapSrc: 'src/source/styles/bootstrap',
    }
};

function bootstrap() {
    return gulp.src([paths.src.bootstrapSrc])
        .pipe(sass())
        .pipe(gulp.dest(paths.build.bootstrapSrc));
}

function cssSrc() {
    return gulp.src([paths.src.styles])
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(postcss([prefixer()]))
        .pipe(gulp.dest(paths.build.styles));
}

function copyJs() {
    return gulp.src(paths.src.scripts)
        .pipe(babel({
            presets: ['@babel/env'],
            plugins: [
                'transform-class-properties',
            ],
        }))
        .pipe(gulp.dest(paths.build.scripts));
}

function jsVendor() {
    return gulp.src([
        'src/source/libs/bootstrap/js/bootstrap.bundle.min.js',
    ])
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.build.scripts));
}

const styles = gulp.series(bootstrap, cssSrc);
const scripts = gulp.series(jsVendor, copyJs);

exports.styles = (styles);
exports.scripts =(scripts);


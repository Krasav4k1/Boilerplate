/**
 * Gulpfile
 * Gulp configuration for tasks
 *
 * @author Andriu Blyzniuk
 */
const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const ngAnnotate = require('gulp-ng-annotate');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const sass = require('gulp-sass');
const newer = require('gulp-newer');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const promise = require('es6-promise').Promise;
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const server = require('karma').Server;
const flatten = require('gulp-flatten');

const gulpProtractorAngular = require('gulp-angular-protractor');

const staticDir = 'src/main/resources/static/';
const webAppDir = 'src/main/webapp/';

gulp.task('source-concat-js', () => gulp.src([
        'node_modules/lodash/lodash.js',
        'node_modules/angular/angular.min.js',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        'node_modules/ng-lodash/build/ng-lodash.js',
        'node_modules/angular-animate/angular-animate.min.js',
        'node_modules/angular-aria/angular-aria.min.js',
        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
        'node_modules/moment/moment.js',
        'node_modules/angular-moment/angular-moment.js',
        'node_modules/angular-bootstrap-toggle-switch/dist/js/bootstrap-switch.min.js',
    ])
        .pipe(newer(`${staticDir}source.min.js`))
        .pipe(concat('source.min.js'))
        .pipe(gulp.dest(staticDir))
);

gulp.task('source-concat-css', function () {
    return gulp.src([
        // path to the ui
    ])
        .pipe(newer(staticDir + 'source.min.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(concat('source.min.css'))
        .pipe(gulp.dest(staticDir))
});


gulp.task('app-concat', () => gulp.src([
        `${webAppDir}app.js`,
        `${webAppDir}routes.js`,
        `${webAppDir}controller/*.js`,
        `${webAppDir}components/**/*.js`,
        `${webAppDir}shared/**/*.js`,
        `${webAppDir}service/*.js`,
        `${webAppDir}enum/*.js`
    ])
        .pipe(newer(staticDir + 'app.min.js'))
        .pipe(concat('app.min.js'))
        .pipe(babel({presets: ['es2015']}))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest(staticDir))
        .pipe(browserSync.reload({
            stream: true
        }))
);


gulp.task('html-replace-index', () => gulp.src([
        `${webAppDir}index.html`
    ])
        .pipe(newer(staticDir))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(staticDir))
);

gulp.task('html-replace', () => gulp.src([
        `${webAppDir}template/*.html`,
        `${webAppDir}components/**/*.html`,
        `${webAppDir}shared/**/*.html`
    ])
        .pipe(newer(staticDir))
        .pipe(flatten())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(`${staticDir}/template`))
        .pipe(browserSync.reload({
            stream: true
        }))
);

gulp.task('css-transpile', () => gulp.src([
        `${webAppDir}scss/**/*.scss`,
        `${webAppDir}components/**/*.scss`,
        `${webAppDir}shared/**/*.scss`

    ])
        .pipe(sourcemaps.init())
        .pipe(newer({dest: staticDir, ext: '.css'}))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('app.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(staticDir))
        .pipe(browserSync.reload({
            stream: true
        }))
);

gulp.task('replace-image',() => gulp.src([
        `${webAppDir}image/*`
    ])
        .pipe(newer(`${staticDir}image/`))
        .pipe(gulp.dest(`${staticDir}image/`))
);

gulp.task('replace-font', function () {
    return gulp.src([
        webAppDir + 'font/*'
    ])
        .pipe(newer(staticDir + 'font/'))
        .pipe(gulp.dest(staticDir + 'font/'))
});

gulp.task('default', [
    'clean',
    'source-concat-js',
    'source-concat-css',
    'app-concat',
    'html-replace-index',
    'html-replace',
    'css-transpile',
    'replace-image',
    'replace-font'
]);

gulp.task('clean', () => del.sync(staticDir));

gulp.task('watch', () => {
    gulp.watch(`${webAppDir}**/*.js`, ['app-concat']);
    gulp.watch(`${webAppDir}template/**/*.html`, ['html-replace']);
    gulp.watch(`${webAppDir}shared/**/*.html`, ['html-replace']);
    gulp.watch(`${webAppDir}components/**/*.html`, ['html-replace']);
    gulp.watch(`${webAppDir}scss/**/*.scss`, ['css-transpile']);
    gulp.watch(`${webAppDir}components/**/*.scss`, ['css-transpile']);
});


gulp.task('testJS', function (done) {
    new server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('browserSync', ['watch'] , function() {
    browserSync.init({
        server: {
            baseDir: "./src/main/resources/static",
        },
        // proxy: {
        //     target: "http://localhost:8080",
        //     ws: true,
        // }
    })
});

gulp.task('protractor', function() {
    gulp
        .src(['src/test/client/End-2-End/**/*.js'])
        .pipe(gulpProtractorAngular({
            'configFile': 'protractor.conf.js',
    'debug': false,
    'autoStartStopServer': false
}))
.on('error', function(e) {
    console.log(e);
});
});











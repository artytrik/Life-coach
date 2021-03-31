const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const del = require('del');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const imgCompress = require('imagemin-jpeg-recompress');

const dirs = {
  src: 'source',
  dest: 'build'
}

const sources = {
  scripts: `${dirs.src}/js/**/*.js`,
}

gulp.task('style', () => (
  gulp.src('source/sass/style.scss')
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream()))
);

gulp.task('js', () => (
  gulp.src(sources.scripts)
    .pipe(babel({ presets: ['@babel/preset-env']}))
    .pipe(gulp.dest(`${dirs.dest}/js`))
));

gulp.task('img', function() {
  return gulp.src('source/img/**/*')
  .pipe(imagemin([
    imgCompress({
      loops: 4,
      min: 70,
      max: 80,
      quality: 'high'
    }),
    imagemin.gifsicle(),
    imagemin.optipng(),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest('build/img'));
});

gulp.task('serve', () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('style'));
  gulp.watch('source/img/**/*.{png,jpg,svg,webp}', gulp.series('copy', 'reload'));
  gulp.watch('source/*.html', gulp.series('copy', 'reload'));
  gulp.watch('source/js/**/*.js', gulp.series('js', 'reload'));
  gulp.watch('source/*.php', gulp.series('copy', 'reload'));
});

gulp.task('reload', (done) => {
  server.reload();
  done();
});

gulp.task('copy', () => (
  gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/*.html',
    'source/img/**/*.{png,jpg,svg,webp}',
    'source/*.php'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
));

gulp.task('clean', () => (
  del('build')
));

gulp.task('build', gulp.series('clean', gulp.parallel('copy', 'style', 'js', 'img')));

gulp.task('start', gulp.series('build', 'serve'));

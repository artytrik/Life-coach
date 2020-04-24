const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const del = require('del');
const ghPages = require('gulp-gh-pages');

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
});

gulp.task('reload', (done) => {
  server.reload();
  done();
});

gulp.task('copy', () => (
  gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/*.html',
    'source/img/**/*.{png,jpg,svg,webp}'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
));

gulp.task('clean', () => (
  del('build')
));

gulp.task('deploy', () => (
  gulp.src('./build/**/*')
    .pipe(ghPages())
  )
);

gulp.task('build', gulp.series('clean', gulp.parallel('copy', 'style')));

gulp.task('start', gulp.series('build', 'serve'));

const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('./package.json'));

const autoprefixer = require('autoprefixer');
const cssSorter = require('css-declaration-sorter');
const gulp = require('gulp');
const cache = require('gulp-cached');
const concat = require('gulp-concat');
const inject = require('gulp-inject-string');
const postcss = require('gulp-postcss');
const StreamQueue = require('streamqueue');

const rollup = require('gulp-better-rollup');
const rollupTypescript = require('rollup-plugin-typescript');
const tslint = require('gulp-tslint');

const sortcss = () => {
    const postcssPlugins = [cssSorter({ order: 'smacss' })];

    return gulp
        .src(`src/${pkg.name}.css`, { base: '.' })
        .pipe(cache('sorting'))
        .pipe(postcss(postcssPlugins))
        .pipe(gulp.dest('.'));
};

const build = () => {
    return new StreamQueue({ objectMode: true })
        .queue(
            gulp.src(`src/${pkg.name}.meta.js`)
                .pipe(inject.replace(/\${version}/g, pkg.version)) // update version number
                .pipe(gulp.dest('dist')),
            gulp.src(`src/${pkg.name}.css`)
                .pipe(postcss([autoprefixer()]))
                .pipe(inject.replace(/\/\*[^]*?\*\//g, '')) // remove comments
                .pipe(inject.replace(/\n+/g, '\n')) // remove blank lines
                .pipe(inject.prepend('const css = `'))
                .pipe(inject.append('`;')),
            gulp.src(`src/${pkg.name}.ts`)
                .pipe(rollup({ plugins: [rollupTypescript()] }, { format: 'es' })),
        )
        .done()
        .pipe(concat(`${pkg.name}.user.js`))
        .pipe(gulp.dest('dist'))
        .pipe(tslint({ fix: true }));
};

const watchFiles = () => {
    gulp.watch(`src/${pkg.name}.css`, gulp.series(sortcss, build));
    gulp.watch('src/*.ts', build);
};

exports.sortcss = sortcss;
exports.watch = watchFiles;
exports.build = build;
exports.default = build;

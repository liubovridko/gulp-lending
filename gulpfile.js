import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';
import { copy, copyLanguages } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { server } from './gulp/tasks/server.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';

global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

function watcher() {
  gulp.watch(path.watch.files, copy); //gulp.series(copy,ftp)
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.languages, copyLanguages); 
}

//поcледовательное выполнение шрифтов
const fonts = gulp.series(ttfToWoff, fontsStyle);

const mainTasks = gulp.series(fonts, gulp.parallel(copy, copyLanguages, html, scss, js, images));
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server)); //developer mode
const build = gulp.series(reset, mainTasks); //production mode
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);
export { dev };
export { build };
export { deployZIP };
export { deployFTP };

gulp.task('default', dev);

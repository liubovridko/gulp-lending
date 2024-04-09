export const copy = () => {
	return app.gulp
		.src(app.path.src.files)
		.pipe(app.gulp.dest(app.path.build.files));
};

export const copyLanguages = () => {
	return app.gulp.src(app.path.src.languages)
		 .pipe(app.gulp.dest(app.path.build.languages));
};


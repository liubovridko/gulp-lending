import * as nodePath from "path";

const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = "./public";
const srcFolder = "./src";

export const path = {
	build: {
		js: `${buildFolder}/js/`,
		images: `${buildFolder}/img/`,
		css: `${buildFolder}/css/`,
		fonts: `${buildFolder}/fonts/`,
		html: `${buildFolder}`,
		files: `${buildFolder}/files/`,
		languages: `${buildFolder}/translations/`,
	},
	src: {
		js: `${srcFolder}/js/app.js`,
		images: `${srcFolder}/img/**/**/*.{jpeg,jpg,webp,gif,png}`,
		svg: `${srcFolder}/img/**/*.svg`,
		scss: `${srcFolder}/scss/app.scss`,
		html: `${srcFolder}/*.html`, //.pug
		files: `${srcFolder}/files/**/*.*`,
		languages: `${srcFolder}/translations/**/*.*`,
	},
	watch: {
		js: `${srcFolder}/js/**/*.js`,
		images: `${srcFolder}/img/**/*.{jpeg,jpg,svg,webp,gif,png}`,
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`, //.pug
		files: `${srcFolder}/files/**/*.*`,
		languages: `${srcFolder}/translations/**/*.*`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: "htdocs",
};

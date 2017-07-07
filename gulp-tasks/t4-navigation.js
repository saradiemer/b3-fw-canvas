var gulp = require('gulp');
var replace = require('gulp-replace');
var htmlreplace = require('gulp-html-replace');

var config = {
	publicDir: './public',
	T4Dir: './T4',
};
gulp.task('t4_nav', function() {
	// place code for your default task here
	console.log('[gulp]: T4 Navigation');
	return gulp.src(config.T4Dir + '/T4*.html')
		.pipe(htmlreplace({
		'customjs': '<t4 type="navigation" id="406"/>',
		'navtitle': '<title><t4 type="navigation" id="630"/><t4 type="title" append-content="true" append-element="Title" separator="| " />| <t4 type="navigation" id="77"/>: Undergraduate Admission</title>',
		'pageid': '<meta name="PageID" content="<t4 type="navigation" id="462"/>" />',
		'ogtitle': '<meta property="og:title" content="<t4 type="navigation" id="166"/> <t4 type="title" />: Loyola University Chicago" />',
		'ogdescription': '<meta property="og:description" content="<t4 type="navigation" id="167"/>" />',
		'ogsitename': '<meta property="og:site_name" content="Loyola University Chicago - <t4 type="navigation" id="77"/>" />',
		'customcss': '<t4 type="navigation" id="223"/>',
		'linkhome': '<t4 type="navigation" id="267"/>',
		'universitymenu': '<t4 type="navigation" id="538"/>',
		'sitemenu': '<t4 type="navigation" id="251"/>',
		'homefooter': '<t4 type="navigation" id="536"/>',
		'globalquicklinks': '<t4 type="media" id="77813" formatter="plain/text"/>',
		'ledephoto': '<t4 type="navigation" id="667"/>',
		'ledecaption': '<t4 type="navigation" id="668"/>',
		'rightcolumn': '<t4 type="navigation" id="669"/>',
		'sidemainnav': '<t4 type="navigation" id="670"/>',
		'headernav': '<t4 type="navigation" id="674"/>',
		'calltoaction': '<t4 type="navigation" id="675"/>',
		'socialmedia': '<t4 type="navigation" id="677"/>',
		'aside': '<t4 type="navigation" id="678"/>',
		}, {
		keepUnassigned: false,
		keepBlockTags: true,
		resolvePaths: false
}))
	.pipe(gulp.dest(config.T4Dir));
});

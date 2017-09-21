fis.config.set('project.exclude', [/^\/release\//i]);
var jadeConf = {
	pretty : true
};
fis.config.set('settings.parser.jade', jadeConf);

fis.config.set('modules.parser.jade', 'jade');
fis.config.set('roadmap.ext.jade', 'html');
fis.config.set('modules.parser.less', 'less');
fis.config.set('roadmap.ext.less', 'css');
fis.config.merge({
	roadmap : {
		path : [
			{
				reg : /^\/less\/([^_]*\.less$)/i,
				release : '/content/$1'
			}
			,
			{
				reg : '*.jade',
				release : '/$&'
			}
			,
			{
				reg : 'scripts/**.js',
				release : '/$&'
			}
			,
			{
				reg : 'fonts/**',
				release : '/content$&'
			}
			,
			{
				reg : 'images/**',
				release : '/$&'
			}
			,
			{
				reg : 'content/**',
				release : '/$&'
			}
			,
			{
				reg : /.*/i,
				release : false
			}

		]
	}
});

fis.config.set('modules.postprocessor.css', 'autoprefixer');

fis.config.merge({
    settings : {
        postprocessor : {
          autoprefixer : {
              // detail config (https://github.com/postcss/autoprefixer#browsers)
              "browsers": ["Android >= 2.3", "ChromeAndroid > 1%", "iOS >= 4"],
              "cascade": true
            }
        }
    }
});
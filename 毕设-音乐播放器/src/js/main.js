//配置文件路径
require.config({
	baseUrl: 'src/js',
	paths: {
		'jquery': 'lib/jquery-3.2.1'
	}
})
//加载模块入口
requirejs(['app/index'])
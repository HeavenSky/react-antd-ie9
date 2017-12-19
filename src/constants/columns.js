export const SIDER_MENU = [
	{
		key: '/home', title: '首页', icon: 'home',
		sub: [
			{
				key: '/home/buttons', title: '按钮', icon: 'mobile',
				sub: [
					{ key: '/home/buttons/spins', title: '加载中', icon: 'pause', },
					{ key: '/home/buttons/modals', title: '对话框', icon: 'question', },
				],
			},
			{ key: '/home/icons', title: '图标', icon: 'scan', },
		],
	},
	{ key: '/hello', title: '你好', icon: 'smile', },
	{
		key: '/test', title: '测试', icon: 'notification',
		sub: [
			{
				key: '/test/cloud', title: '按钮', icon: 'cloud',
				group: [
					{ key: '/test/cloud/spins', title: '加载中', icon: 'folder', },
					{ key: '/test/cloud/modals', title: '对话框', icon: 'meh', },
				],
			},
			{
				key: '/test/icons', title: '图标', icon: 'lock',
				group: [
					{ key: '/test/icons/spins', title: '加载中', icon: 'desktop', },
					{ key: '/test/icons/modals', title: '对话框', icon: 'download', },
				],
			},
		],
	},
	{ key: '/appstore', title: '应用商店', icon: 'appstore', disabled: true, },
	{ key: '/laptop', title: '平板电脑', icon: 'laptop', },
	{ key: '/inbox', title: '收件箱', icon: 'inbox', },
	{ key: '/user', title: '用户', icon: 'user', },
]
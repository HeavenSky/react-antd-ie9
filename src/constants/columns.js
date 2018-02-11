export const SIDER_MENU = [
	{
		key: "/home", label: "首页", icon: "home",
		sub: [
			{
				key: "/home/buttons", label: "按钮", icon: "mobile",
				sub: [
					{ key: "/home/buttons/spins", label: "加载中", icon: "pause" },
					{ key: "/home/buttons/modals", label: "对话框", icon: "question" },
				],
			},
			{ key: "/home/icons", label: "图标", icon: "scan" },
		],
	},
	{ key: "/hello", label: "你好", icon: "smile" },
	{
		key: "/test", label: "测试", icon: "notification",
		sub: [
			{
				key: "/test/cloud", label: "按钮", icon: "cloud",
				group: [
					{ key: "/test/cloud/spins", label: "加载中", icon: "folder" },
					{ key: "/test/cloud/modals", label: "对话框", icon: "meh" },
				],
			},
			{
				key: "/test/icons", label: "图标", icon: "lock",
				group: [
					{ key: "/test/icons/spins", label: "加载中", icon: "desktop" },
					{ key: "/test/icons/modals", label: "对话框", icon: "download" },
				],
			},
		],
	},
	{ key: "/appstore", label: "应用商店", icon: "appstore", disabled: true },
	{ key: "/laptop", label: "平板电脑", icon: "laptop" },
	{ key: "/inbox", label: "收件箱", icon: "inbox" },
	{ key: "/user", label: "用户", icon: "user" },
];
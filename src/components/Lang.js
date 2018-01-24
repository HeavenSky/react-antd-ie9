import React from "react";
import { LocaleProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
// antd 3.x 默认语言英文
const enUS = null;
const Lang = props => {
	const { language, children, ...res } = props;
	let locale;
	switch (language) {
		case "cn":
			locale = zhCN;
			moment.locale("zh-cn");
			break;
		case "en":
			locale = enUS;
			moment.locale("en");
			break;
		default:
			locale = zhCN;
			moment.locale("zh-cn");
	}
	return <LocaleProvider
		locale={locale}
		{...res}
	>
		{children}
	</LocaleProvider>;
};
export default Lang;
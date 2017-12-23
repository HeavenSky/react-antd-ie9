export const verIE = () => {
	// 返回值{ver:IE版本,mod:文档模式版本}, 只能获取11以下的版本信息
	if ( /*@cc_on !@*/ false) {
		const ver =  /*@cc_on @_jscript_version@*/ -0;
		const mod = document.documentMode;
		return { ver, mod };
	} else {
		return ({});
	}
}
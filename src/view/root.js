import React from 'react';
import { Layout } from 'antd';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import { SIDER_MENU } from 'constants/columns';
import Menu from 'components/Menu';
import './root.less';

const Home = props => '主页';
const Test = props => '测试';
const NoAu = props => '法海不懂爱,页面出不来...';
const { Header, Footer, Sider, Content } = Layout;
export default props => <HashRouter>
	<Layout>
		<Sider className='sider' breakpoint='lg' collapsedWidth='80' >
			<div className='logo' />
			<Menu theme='dark' mode='inline' menus={SIDER_MENU} />
		</Sider>
		<Layout>
			<Header className='header' />
			<Content>
				<Switch>
					<Redirect from='/hello' to='/test' />
					<Route path='/home' component={Home} />
					<Route path='/test' component={Test} />
					<Route path='/404' component={NoAu} />
					<Redirect to='/404' />
				</Switch>
			</Content>
			<Footer />
		</Layout>
	</Layout>
</HashRouter>
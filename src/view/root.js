import React from 'react';
import { Layout } from 'antd';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { SIDER_MENU } from 'constants/columns';
import Menu from 'components/Menu';
import './root.less';

const Home = props => 'Home';
const Test = props => 'Test';
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
					<Route path='/home' component={Home} />
					<Route path='/test' component={Test} />
					<Route component={Test} />
				</Switch>
			</Content>
			<Footer />
		</Layout>
	</Layout>
</HashRouter>
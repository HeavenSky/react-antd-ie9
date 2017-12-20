import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import Home from 'bundle-loader?lazy&name=home!components/Home';
import Test from 'bundle-loader?lazy&name=test!components/Test';

import Menu from 'components/Menu';
import Loading from 'components/Loading';
import { SIDER_MENU } from 'constants/columns';
import { bundle } from 'utils/bundle';
import './root.less';

const createBundle = bundle(Loading);
export default props => <HashRouter>
	<Layout>
		<Sider
			className='sider'
			breakpoint='lg'
			collapsedWidth='80'
		>
			<div className='logo' />
			<Menu
				menus={SIDER_MENU}
				theme='dark'
				mode='inline'
			/>
		</Sider>
		<Layout>
			<Header className='header' />
			<Content>
				<Switch>
					<Route path='/home' component={createBundle(Home)} />
					<Route path='/test' component={createBundle(Test)} />
					<Route component={createBundle(Test)} />
				</Switch>
			</Content>
			<Footer />
		</Layout>
	</Layout>
</HashRouter>
import React from 'react';
import { HashRouter, Switch, Redirect, Route } from 'react-router-dom';
import { Layout, Icon } from 'antd';

import Home from 'bundle-loader?lazy&name=home!components/Home';
import Test from 'bundle-loader?lazy&name=test!components/Test';

import Menu from '../components/Menu';
import Loading from '../components/Loading';
import { SIDER_MENU } from '../constants/columns';
import { newBundle } from 'utils/bundle';
import './root.less';

const { Header, Footer, Sider, Content } = Layout;
const createBundle = newBundle(Loading);

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
			<Header className='header'>
				<Menu
					menus={SIDER_MENU}
					theme='dark'
					mode='horizontal'
				/>
			</Header>
			<Content>
				<Switch>
					<Route path='/home' component={createBundle(Home)} />
					<Route path='/test' component={createBundle(Test)} />
					<Route component={createBundle(Test)} />
				</Switch>
			</Content>
			<Footer>HeavenSky</Footer>
		</Layout>
	</Layout>
</HashRouter>
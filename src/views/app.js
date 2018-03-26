import React from "react";
import { Router } from "react-router-dom";
import { Layout } from "antd";

import { SIDER_URLS, SIDER_MENU } from "../constants/columns";
import { RouteMenu } from "../components/Menu";
import { RouteList } from "../components/Route";
import history from "../utils/history";
import routes from "./routes";
import "./app.less";

const { Header, Footer, Sider, Content } = Layout;
const App = props =>
	<Router history={history}>
		<Layout>
			<Sider
				className="sider"
				breakpoint="md"
				collapsedWidth="80"
			>
				<div className="logo" />
				<RouteMenu
					theme="dark"
					mode="inline"
					menus={SIDER_MENU}
					urls={SIDER_URLS}
				/>
			</Sider>
			<Layout>
				<Header className="header" />
				<Content>
					<RouteList routes={routes} />
				</Content>
				<Footer />
			</Layout>
		</Layout>
	</Router>;
export default App;
import React, { Component } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { Layout, Alert } from "antd";

import Todo from "./_todo";
import Count from "./_count";
import Async from "./_async";
import { SIDER_MENU } from "../constants/columns";
import Menu from "../components/Menu";
import "./root.less";

const { Header, Footer, Sider, Content } = Layout;
const Home = props => "主页";
const Test = props => "测试";

class NoAu extends Component {
	state = { arr: [1, 2, 3, 4, 5, 6, 7, 8] };
	componentDidMount() {
		const wrap = $(".sort-test");
		wrap.sortable({
			axis: "y",
			items: "> .item",
			stop: (event, ui) => {
				// http://api.jqueryui.com/sortable/#method-toArray
				const arr = wrap.sortable("toArray", { attribute: "data-idx" });
				// cancel the sort so the DOM is untouched
				wrap.sortable("cancel");
				// Update the state
				this.setState({ arr });
			},
		}).disableSelection();
	};
	render() {
		const { arr } = this.state;
		return <div>
			<div className="sort-test">
				<div key="other" className="it-margin">
					<Alert message="法海不懂爱,页面出不来..." />
				</div>
				{arr.map(
					v => <div key={v} className="it-margin item" data-idx={v}>
						<Alert message={v} />
					</div>
				)}
			</div>
		</div>;
	};
};

const RootComponent = props => <HashRouter>
	<Layout>
		<Sider className="sider" breakpoint="lg" collapsedWidth="80" >
			<div className="logo" />
			<Menu theme="dark" mode="inline" menus={SIDER_MENU} />
		</Sider>
		<Layout>
			<Header className="header" />
			<Content>
				<Switch>
					<Redirect exact strict from="/" to="/home" />
					<Route path="/home" component={Home} />
					<Route path="/test" component={Test} />
					<Route path="/404" component={NoAu} />
					<Redirect to="/404" />
				</Switch>
			</Content>
			<Footer />
		</Layout>
	</Layout>
</HashRouter>;
export default RootComponent;
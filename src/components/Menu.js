import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const renderMenuItem =
	({ key, title, icon, link, ...props }) => (
		<Menu.Item
			key={key || link}
			{...props}
		>
			<Link to={link || key}>
				{icon && <Icon type={icon} />}
				<span>{title}</span>
			</Link>
		</Menu.Item>
	);
const renderGroupMenu =
	({ key, title, icon, link, group, ...props }) => (
		<Menu.ItemGroup
			key={key || link}
			title={
				<span>
					{icon && <Icon type={icon} />}
					<span>{title}</span>
				</span>
			}
			{...props}
		>
			{group.map(renderMenuItem)}
		</Menu.ItemGroup>
	);
const renderGroupItem = item =>
	item.group && item.group.length ?
		renderGroupMenu(item) : renderMenuItem(item);
const renderSubMenu =
	({ key, title, icon, link, sub, ...props }) => (
		<Menu.SubMenu
			key={key || link}
			title={
				<span>
					{icon && <Icon type={icon} />}
					<span>{title}</span>
				</span>
			}
			{...props}
		>
			{sub.map(renderSubItem)}
		</Menu.SubMenu>
	);
const renderSubItem = item =>
	item.sub && item.sub.length ?
		renderSubMenu(item) : renderGroupItem(item);

export default ({ menus, ...props }) =>
	<Menu {...props}>{menus && menus.map(renderSubItem)}</Menu>
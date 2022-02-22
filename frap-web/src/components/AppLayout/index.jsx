import {useEffect, useState} from "react";
import { Layout, Menu,Avatar,message } from 'antd';
import {DesktopOutlined, PieChartOutlined, SettingOutlined, UserOutlined, PoweroffOutlined} from '@ant-design/icons';
import {Outlet, Link, useLocation, matchRoutes,useNavigate} from "react-router-dom";

import "./index.css"

function Index() {
	const { Header, Content, Footer, Sider } = Layout;
	const location = useLocation()
	const navigate = useNavigate()
	const [defaultSelectedKeys,setdefaultSelectedKeys] = useState([])
	const [isInit,setIsInit] = useState(false)
	const [user,setUser] = useState(null)
	useEffect(()=>{
		if(sessionStorage.getItem('user')){
			setUser(JSON.parse(sessionStorage.getItem('user')))
		}else{
			message.error('请先登录！').then()
			navigate('/login')
		}
		setdefaultSelectedKeys([location.pathname])
		setIsInit(true)
	},[location.pathname])
	if(!isInit){
		return null
	}
	const Logout =()=>{
		message.success('注销成功',1).then(()=>{
			sessionStorage.clear()
			navigate('/login')
		})
	}
	return (
		<Layout className="layout-container">
			<Header className="header">
				<div className="logo">
					<img src={require("../../static/img/logo.png")} alt="logo" width="45px" height="40px"/>
					<span>&nbsp;考勤管理平台</span>
				</div>
				<div className="avatar">
					<span>欢迎：{user?user.name:null}</span>
					<Avatar size="large" src='https://joeschmoe.io/api/v1/random' style={{background:'white'}} />
				</div>
				<div className='logout' onClick={Logout}>
					<PoweroffOutlined />
				</div>
			</Header>
			<Layout>
				<Sider className="sider-background">
					<Menu theme="light" defaultSelectedKeys={defaultSelectedKeys} mode="inline">
						<Menu.Item key="/" icon={<PieChartOutlined />}>
							<Link to="/">考勤管理</Link>
						</Menu.Item>

						<Menu.Item key="/user" icon={<UserOutlined />}>
							<Link to="/user">员工档案</Link>
						</Menu.Item>
						<Menu.Item key="/adsetting" icon={<SettingOutlined />}>
							<Link to="/adsetting">考勤设置</Link>
						</Menu.Item>
						<Menu.Item key="/account" icon={<DesktopOutlined />}>
							<Link to="/account">账号管理</Link>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout style={{ padding: '0 24px 24px' }}>
					<Content className="content">
						<Outlet/>
					</Content>
					<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
				</Layout>
			</Layout>
		</Layout>
	);
}

export default Index;
import React, {useEffect, useState} from 'react';
import {Button, Card,Form, Input, Layout, Radio,message} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './index.css'

const {Header} = Layout

function Index(props) {
	const navgiate = useNavigate()
	const [form] = Form.useForm()
	const [isAdmin,setIsAdmin] = useState(false)
	useEffect(()=>{
		if(sessionStorage.getItem('user')){
			message.error('请勿重复登陆',).then()
			navgiate('/')
		}
	})
	const setAdmin = (e) => {
		if (e.target.value==='admin'){
			setIsAdmin(true)
			form.setFieldsValue({department:'无'})
		}else{
			setIsAdmin(false)
			form.setFieldsValue({department:''})
		}
	}
	const login = async (value) => {
		try {
			const data = await axios.post('http://127.0.0.1:8000/adminuser/login/',value)
			message.success(data.data.message,1).then(()=>{
				sessionStorage.setItem('user',JSON.stringify(data.data.user))
				navgiate('/')
			})
		}catch (e) {
			message.error(e.response.data.message)
		}
	}
	return (
		<>
			<Layout>
				<Header>
					<div className="login-logo">
						<img src={require("../../static/img/logo.png")} alt="logo" width="45px" height="40px"/>
						<span>&nbsp;考勤管理平台</span>
					</div>
				</Header>
			</Layout>
			<Card title="登录" className='login-card' hoverable={true}>
				<Form labelCol={{span:6}} form={form} onFinish={login} preserve={false}>
					<Form.Item label="用户名" name="name" rules={[{required: true,message:'不得为空'}]}>
						<Input placeholder="请输入用户名"/>
					</Form.Item>
					<Form.Item label="密码" name="password" rules={[{required: true,message:'不得为空'}]}>
						<Input.Password placeholder='请输入密码'/>
					</Form.Item>
					<Form.Item label="角色" name="role" rules={[{required: true,message:'请选择角色'}]}>
						<Radio.Group onChange={setAdmin}>
							<Radio value="admin">admin</Radio>
							<Radio value="普通管理员">普通管理员</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="部门" name="department" hidden={isAdmin} rules={[{required: true,message:'不得为空'}]}>
						<Input placeholder='请输入部门'/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">登录</Button>
					</Form.Item>
				</Form>
			</Card>
		</>
	);
}

export default Index;
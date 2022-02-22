import React, {useEffect, useState} from 'react';
import {Button, Table, Modal, Input, Radio, message, Form, Row, Col,Popconfirm } from "antd";
import axios from "axios";

const { Column } = Table;
function Index(props) {
	const [showUpdateUser,setShowUpdateUser] = useState(false)
	const [showAddUser,setShowAddUser] = useState(false)
	const [formData,setFormData] = useState([])
	const [isAdmin,setIsAdmin] = useState(false)
	const [isUpdatePassword,setIsUpdatePassword] = useState(false)
	const [form1] = Form.useForm();
	const [form2] = Form.useForm();
	useEffect(()=>{
		document.title="账号管理"
		getAdminUser()
	},[])
	const getAdminUser = async () =>{
		const data = await axios.get('http://127.0.0.1:8000/adminuser/')
		data.data.map((item)=>{
			item.key = item.id
		})
		setFormData(data.data)
	}
	const handleCancel = () => {
		setShowUpdateUser(false)
		setShowAddUser(false)
		form1.resetFields()
		form2.resetFields()
	}
	const addUser = () => {
		setShowAddUser(true)
	}
	const setAdmin = (e) => {
		if (e.target.value==='admin'){
			setIsAdmin(true)
			form1.setFieldsValue({department:'无'})
			form2.setFieldsValue({department:'无'})
		}else{
			setIsAdmin(false)
			form1.setFieldsValue({department:''})
			form2.setFieldsValue({department:''})
		}
	}
	const addFinish = async (values) => {
		try {
			const data = await axios.post('http://127.0.0.1:8000/adminuser/',values)
			message.success(data.data.message)
			setShowAddUser(false)
			await getAdminUser()
			form1.resetFields()
		}catch (e) {
			message.error(e.response.data.message)
			if(e.response.status === 500){
				console.log(e.response.data.err_message)
			}
		}
	}
	const setUpdatePassword = (e) => {
		if(e.target.value==='是'){
			setIsUpdatePassword(false)
		}else{
			setIsUpdatePassword(true)
		}
	}
	const updateUser = (record) => {
		return ()=>{
			if(record.role==='admin'){
				setIsAdmin(true)
			}else{
				setIsAdmin(false)
			}
			form2.setFieldsValue(record)
			form2.setFieldsValue({UpdatePassword:'否',password:'',old_password:''})
			setIsUpdatePassword(true)
			setShowUpdateUser(true)
		}
	}
	const updateFinish = async (values) => {
		delete values.UpdatePassword
		try {
			const data = await axios.put('http://127.0.0.1:8000/adminuser/',values)
			message.success(data.data.message)
			await getAdminUser()
			setShowUpdateUser(false)
		}catch (e) {
			message.error(e.response.data.message)
			if(e.response.status === 500){
				console.log(e.response.data.err_message)
			}
		}
	}
	const removeUser = async (record) => {
		try {
			const data = await axios.delete('http://127.0.0.1:8000/adminuser/',{data:{id:record.id}})
			message.success(data.data.message,0.5)
			await getAdminUser()
		}catch (e) {
			message.error(e.response.data.message)
		}
	}
	return (
		<>
			<div className="top">
				<div style={{float:'left',fontSize:'24px',marginBottom:'10px'}}>账号管理</div>
				{JSON.parse(sessionStorage.getItem('user')).role==='admin'?
					<Button type='primary' ghost className="addBtn" onClick={addUser} style={{float:'right',marginBottom:'10px'}}>新增</Button>
					:null}
			</div>
			<Table dataSource={formData} >
				<Column title="序号" align={"center"} dataIndex='id' key='id'/>
				<Column title="用户名" align={"center"} dataIndex="name" key="name" />
				<Column title="部门" align={"center"} dataIndex="department" key="department" />
				<Column title="权限" align={"center"} dataIndex="role" key="role" />
				<Column title="操作" align={"center"} key="action" render={(text,record)=>(
					<>
						{
							JSON.parse(sessionStorage.getItem('user')).role==='admin'?
								<>
									<Button size={"small"} type='primary' style={{marginRight:'2px'}} onClick={updateUser(record)}>修改</Button>
									<Popconfirm
										title="是否删除？"
										onConfirm={()=>{removeUser(record)}}
										okText="是"
										cancelText="否"
									>
										<Button size={"small"} type='danger'>删除</Button>
									</Popconfirm>
								</>
								:<Button disabled={true}>无权限</Button>

						}
					</>
				)}/>
			</Table>
			<Modal title="添加管理员" visible={showAddUser} footer={null} closable={false}>
				<Form labelCol={{span:6}} form={form1} onFinish={addFinish} preserve={false}>
					<Form.Item label="用户名" name="name" rules={[{required: true,message:'不得为空'}]}>
						<Input placeholder="请输入用户名"/>
					</Form.Item>
					<Form.Item label="密码" name="password" rules={[{required: true,message:'不得为空'}]}>
						<Input.Password placeholder='请输入密码'/>
					</Form.Item>
					<Form.Item label="角色" name="role" rules={[{required: true,message:'不得为空'}]}>
						<Radio.Group onChange={setAdmin}>
							<Radio value="admin">admin</Radio>
							<Radio value="普通管理员">普通管理员</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="部门" name="department" hidden={isAdmin} rules={[{required: true,message:'不得为空'}]}>
						<Input placeholder='请输入部门'/>
					</Form.Item>
					<Form.Item>
						<Row justify={"center"}>
							<Col span={8}>
								<Button type="primary" htmlType="submit" >添加</Button>
							</Col>
							<Col span={4}>
								<Button onClick={handleCancel}>取消</Button>
							</Col>
						</Row>
					</Form.Item>
				</Form>
			</Modal>
			<Modal title="修改信息" visible={showUpdateUser} footer={null} closable={false}>
				<Form labelCol={{span:6}} form={form2} onFinish={updateFinish} preserve={false}>
					<Form.Item label="序号" name="id">
						<Input disabled={true}/>
					</Form.Item>
					<Form.Item label="用户名" name="name" rules={[{required: true,message:'不得为空'}]}>
						<Input placeholder="请输入用户名"/>
					</Form.Item>
					<Form.Item label="修改密码" name="UpdatePassword" rules={[{required: true}]}>
						<Radio.Group onChange={setUpdatePassword}>
							<Radio value="是">是</Radio>
							<Radio value="否">否</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="旧密码" hidden={isUpdatePassword} name="old_password" rules={[{required: !isUpdatePassword,message:'不得为空'}]}>
						<Input.Password placeholder='请输入旧密码'/>
					</Form.Item>
					<Form.Item label="新密码" hidden={isUpdatePassword} name="password" rules={[{required: !isUpdatePassword,message:'不得为空'}]}>
						<Input.Password placeholder='请输入新密码'/>
					</Form.Item>
					<Form.Item label="角色" name="role" rules={[{required: true,message:'不得为空'}]}>
						<Radio.Group onChange={setAdmin}>
							<Radio value="admin">admin</Radio>
							<Radio value="普通管理员">普通管理员</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="部门" name="department" hidden={isAdmin} rules={[{required: true,message:'不得为空'}]}>
						<Input placeholder='请输入部门'/>
					</Form.Item>
					<Form.Item>
						<Row justify={"center"}>
							<Col span={8}>
								<Button type="primary" htmlType="submit" >修改</Button>
							</Col>
							<Col span={4}>
								<Button onClick={handleCancel}>取消</Button>
							</Col>
						</Row>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}

export default Index;
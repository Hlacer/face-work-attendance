import React, {useEffect, useState} from 'react';
import {Table, Upload, message, Button, Drawer, Form, Input, Radio,Popconfirm} from "antd";
import {UploadOutlined,LoadingOutlined} from '@ant-design/icons'
import './index.css'
import axios from "axios";

const { Column } = Table;
function Index(props) {
	const [addDrawer, setAddDrawer] = useState(false);
	const [updateDrawer, setUpdateDrawer] = useState(false);
	const [formData,setFormData] = useState([])
	const [loding,setLoding] = useState(false)
	const [form1] = Form.useForm();
	const [form2] = Form.useForm();
	const config = {
		beforeUpload:file=>{
			setLoding(true)
			const isExcel = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			if(!isExcel){
				message.error('请上传xls/xlsx表格文件')
			}
			return isExcel || Upload.LIST_IGNORE
		},
		name: 'staff_excel',
		action: 'http://127.0.0.1:8000/userinfo/',
		accept:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
		onChange(info) {
			if (info.file.status === 'done') {
				console.log(info);
				getStaffUser().then(()=>{
					message.success(info.file.response.message)
					setLoding(false)
				})
			} else if (info.file.status === 'error') {
				message.error(info.file.response.message)
				console.log(info.file.response.err_message)
			}
		},
	};
	useEffect(()=>{
		document.title="员工档案"
		getStaffUser()
	},[])
	const getStaffUser = async () =>{
		const data = await axios.get('http://localhost:8000/userinfo/')
		data.data.map((item)=>{
			item.key = item.user_id
		})
		setFormData(data.data)
	}
	const addUser = () => {
		setAddDrawer(true)
	}
	const addFinish = async (values) => {
		try {
			const data = await axios.post('http://127.0.0.1:8000/userinfo/',values)
			message.success(data.data.message)
			await getStaffUser()
			form1.resetFields()
			setAddDrawer(false)
		}catch (e) {
			message.error(e.response.data.message)
			if(e.response.status === 500){
				console.log(e.response.data.err_message)
			}
		}
	};
	const updateUser = (record) => {
		return ()=>{
			form2.setFieldsValue(record)
			setUpdateDrawer(true)
		}
	}
	const updateFinish = async (values) => {
		try {
			const data = await axios.put('http://127.0.0.1:8000/userinfo/',values)
			message.success(data.data.message)
			await getStaffUser()
			setUpdateDrawer(false)
		}catch (e) {
			message.error(e.response.data.message)
			if(e.response.status === 500){
				console.log(e.response.data.err_message)
			}
		}
	};
	const removeUser = async (record) => {
		try {
			const data = await axios.delete('http://127.0.0.1:8000/userinfo/',{data:{user_id:record.user_id}})
			message.success(data.data.message,0.5)
			await getStaffUser()
		}catch (e) {
			message.error(e.response.data.message)
		}
	}
	return (
		<>
			<div className="top">
				<div style={{float:'left',fontSize:'24px'}}>员工档案</div>
				<Upload {...config} showUploadList={false} className='uploadBtn'>
					<Button icon={<UploadOutlined />} >{loding?<LoadingOutlined />:null}导入</Button>
				</Upload>
				<Button type='primary' ghost className="addBtn" onClick={addUser}>新增</Button>
			</div>
			<Table dataSource={formData} >
				<Column title="工号" align={"center"} dataIndex="user_id" key="user_id"/>
				<Column title="姓名" align={"center"} dataIndex="user_name" key="user_name" />
				<Column title="性别" align={"center"} dataIndex='user_gender' key="user_gender" />
				<Column title="部门" align={"center"} dataIndex="user_dept" key="user_dept" />
				<Column title="手机号" align={"center"} dataIndex="user_phone" key="user_phone"/>
				<Column title="添加日期" align={"center"} dataIndex="create_time" key="create_time"/>
				<Column title='人脸采集' align={"center"} dataIndex="isFace" key="isFace"/>
				<Column title="操作" align={"center"} key="action" render={(text,record)=>(
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
				)}/>
			</Table>
			<Drawer title="添加员工" placement="right" closable={false} onClose={()=>{setAddDrawer(false)}} visible={addDrawer}>
				<Form form={form1} onFinish={addFinish}>
					<Form.Item label="工号" name="user_id" rules={[{required: true,message:'不得为空'}]}>
						<Input placeholder="请输入工号"/>
					</Form.Item>
					<Form.Item label="姓名" name="user_name" rules={[{required: true,message:'不得为空'}]}>
						<Input placeholder="请输入姓名"/>
					</Form.Item>
					<Form.Item label="性别" name="user_gender" rules={[{required: true,message:'不得为空'}]}>
						<Radio.Group>
							<Radio value="男">男</Radio>
							<Radio value="女">女</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="部门" name="user_dept" rules={[{required: true,message:'不得为空'}]}>
						<Input placeholder="请输入部门"/>
					</Form.Item>
					<Form.Item label="手机" name="user_phone" rules={[{required: true,message:'不得为空'}]}>
						<Input placeholder="请输入手机号"/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" >添加</Button>
					</Form.Item>
				</Form>
			</Drawer>
			<Drawer title="修改信息" placement="right" closable={false} onClose={()=>{setUpdateDrawer(false)}} visible={updateDrawer}>
				<Form form={form2} onFinish={updateFinish}>
					<Form.Item label="工号" name="user_id" rules={[{required: true}]}>
						<Input disabled={true}/>
					</Form.Item>
					<Form.Item label="姓名" name="user_name" rules={[{required: true,message:'不得为空'}]}>
						<Input placeholder="请输入姓名"/>
					</Form.Item>
					<Form.Item label="性别" name="user_gender" rules={[{required: true,message:'不得为空'}]}>
						<Radio.Group>
							<Radio value="男">男</Radio>
							<Radio value="女">女</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="部门" name="user_dept" rules={[{required: true,message:'不得为空'}]}>
						<Input placeholder="请输入部门"/>
					</Form.Item>
					<Form.Item label="手机" name="user_phone" rules={[{required: true,message:'不得为空'}]}>
						<Input placeholder="请输入手机号"/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" >修改</Button>
					</Form.Item>
				</Form>
			</Drawer>
		</>
	);
}

export default Index;
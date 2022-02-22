import React, {useEffect, useState} from 'react';
import {Button, Card, DatePicker, Form, Input, message, Select, Table} from 'antd';
import moment from "moment";
import "moment/locale/zh-cn"
import locale from "antd/es/date-picker/locale/zh_CN";
import axios from "axios";

const { Column } = Table;
const { Option } = Select
function Index(props) {
	const [data,setData] = useState([])
	useEffect(()=>{
		getAllAd()
	},[])
	const getAllAd =async () => {
		const data = await axios.get('http://127.0.0.1:8000/attendance/face/')
		data.data.map((item,index)=>{
			item.key = index
			item.late = item.late===true?'是':'否'
			item.early_out = item.early_out===true?'是':'否'
		})
		setData(data.data)
	}
	const [date,setDate] = useState([moment().format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')])
	const [form] = Form.useForm();
	const onFinish =async (values) => {
		values.start_time = date[0]
		values.end_time = date[1]
		const {data} = await axios.post('http://127.0.0.1:8000/attendance/search/',values)
		data.data.map((item,index)=>{
			item.key = index
			item.late = item.late===true?'是':'否'
			item.early_out = item.early_out===true?'是':'否'
		})
		setData(data.data)
		if(data.data.length===0){
			message.error('没有数据')
		}else{
			message.success(data.message)
		}
	};
	const choseDate = (date,dateString) =>{
		setDate(dateString)
	}
	const resetData = async () => {
		await getAllAd()
	}
	return (
		<>
			<Card style={{marginTop:"16px"}}>
				<div className="nav-menu">
					<div className="right">
						<Form form={form} onFinish={onFinish}>
							<Form.Item name="user_id" className="form-item">
								<Input placeholder="请输入工号"/>
							</Form.Item>
							<Form.Item name="department" className="form-item">
								<Select placeholder="请选择部门">
									<Option value="设计部">设计部</Option>
									<Option value="人事部">人事部</Option>
									<Option value="信息技术部">信息技术部</Option>
								</Select>
							</Form.Item>
							<Form.Item name="time" className="form-item" initialValue={[moment(),moment()]}>
								<DatePicker.RangePicker locale={locale} onChange={choseDate}/>
							</Form.Item>
							<Form.Item className="form-item">
								<Button type="primary" htmlType="submit" >
									搜索
								</Button>
								<Button type={"default"} onClick={resetData}>
									重置
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
				<Table dataSource={data}>
					<Column title="工号" align={"center"} dataIndex="user_id" key="key" />
					<Column title="姓名" align={"center"} dataIndex="user_name" key="user_name" />
					<Column title="部门" align={"center"} dataIndex="user_dept" key="user_dept" />
					<Column title="日期" align={"center"} dataIndex="attendance_date" key="attendance_date"/>
					<Column title="签到时间" align={"center"} dataIndex="attendance_time" key="attendance_time"/>
					<Column title="签退时间" align={"center"} dataIndex="attendance_out_time" key="attendance_out_time"/>
					<Column title="状态" align={"center"} dataIndex="attendance_state" key="attendance_state"/>
					<Column title="是否迟到" align={"center"} dataIndex="late" key="late"/>
					<Column title="是否早退" align={"center"} dataIndex="early_out" key="early_out"/>
				</Table>
			</Card>
		</>
	);
}

export default Index;
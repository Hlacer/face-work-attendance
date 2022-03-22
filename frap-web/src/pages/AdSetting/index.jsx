import React, {useEffect, useState} from 'react';
import {Card, Row, Col, Form, Input, Button, TimePicker, message} from "antd";
import moment from "moment";
import AMapLoader from '@amap/amap-jsapi-loader'
import axios from "axios";

import "./index.css"


function Index(props) {
	const [isUpdata,setIsUpdata] = useState(false)
	const [adId,setAdId] = useState(null)
	const [form] = Form.useForm()
	useEffect(()=>{
		document.title="考勤设置"
		getAdSetting()
	},[])
	AMapLoader.load({
		key:"50455aa733ab794c8e3cdfecdca1ffe9",
		version:"2.0",
		plugins:['AMap.Geolocation','AMap.AutoComplete']
	}).then((AMap)=>{
		const map = new AMap.Map("container",{
			resizeEnable: true,
			zoom:15,
		});
		const geoLocation = new AMap.Geolocation({
			enableHighAccuracy: true,
			timeout: 10000,
			offset: [10, 20],
			zoomToAccuracy: true,
			position: 'RB'
		})
			geoLocation.getCurrentPosition()
		map.addControl(geoLocation);
		const authOptions = new AMap.AutoComplete({input:'input_tip'})
		authOptions.on('select',(e)=>{
			const poi = e.poi
			const marker = new AMap.Marker({
				position:[poi.location.lng,poi.location.lat],
				title:poi.name
			})
			map.clearMap()
			map.add(marker)
			map.setFitView()
			form.setFieldsValue({attendance_place:poi.name,attendance_coordinate:`${poi.location.lng},${poi.location.lat}`})
		})
	}).catch(e=>{
		console.log(e);
	})
	const getAdSetting = async () => {
		const {data} = await axios.get('http://localhost:8000/attendance/')
		if(data){
			setIsUpdata(true)
			data.attendance_time = moment(data.attendance_time,'HH:mm')
			data.out_time = moment(data.out_time,'HH:mm')
			form.setFieldsValue(data)
			setAdId(data.time_id)
		}
	}
	const finish = async (value) => {
		value.attendance_time = moment(value.attendance_time).format('HH:mm')
		value.out_time = moment(value.out_time).format('HH:mm')
		if(isUpdata){
			value.time_id = adId
			try {
				const data = await axios.put('http://localhost:8000/attendance/',value)
				message.success(data.data.message)
				await getAdSetting()
			}catch (e) {
				message.error(e.response.data.message)
				if(e.response.status === 500){
					console.log(e.response.data.err_message)
				}
			}
		}else{
			try {
				const data = await axios.post('http://localhost:8000/attendance/',value)
				message.success(data.data.message)
				await getAdSetting()

			}catch (e) {
				message.error(e.response.data.message)
				if(e.response.status === 500){
					console.log(e.response.data.err_message)
				}
			}
		}
	}
	const reset = () => {
		form.resetFields()
	}
	return (
		<>
			<div style={{fontSize:'24px',marginBottom:'10px',textAlign:"left"}}>考勤设置</div>
			<Card>
				<Row gutter={18}>
					<Col span={10}>
						<Form form={form} onFinish={finish} labelCol={{span:5}} >
							<Form.Item label="签到地点" name="attendance_place" rules={[{required: true,message:'不得为空'}]}>
								<Input placeholder="请输入地址" id='input_tip'/>
							</Form.Item>
							<Form.Item label="坐标" name="attendance_coordinate" rules={[{required: true,message:'不得为空'}]}>
								<Input />
							</Form.Item>
							<Form.Item label="签到时间" name="attendance_time" rules={[{required: true,message:'不得为空'}]}>
								<TimePicker format="HH:mm"/>
							</Form.Item>
							<Form.Item label="签退时间" name="out_time" rules={[{required: true,message:'不得为空'}]}>
								<TimePicker format="HH:mm"/>
							</Form.Item>
							<Form.Item>
								<Button type='default' className='btn' onClick={reset}>重置</Button>
								<Button type="primary" htmlType="submit" className='btn'>
									{isUpdata?'修改':'提交'}
								</Button>
							</Form.Item>
						</Form>
					</Col>
					<Col span={14}>
						<div id="container" />
					</Col>
				</Row>
			</Card>
		</>
	);
}

export default Index;
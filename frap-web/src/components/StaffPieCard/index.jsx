import React, {useEffect, useState} from "react";
import {Pie} from "@ant-design/charts";
import {Button, Card, DatePicker, Select, Space,message} from "antd";
import moment from "moment";
import "moment/locale/zh-cn"
import locale from "antd/es/date-picker/locale/zh_CN";
import axios from "axios";

function Index(){
	const { Option } = Select
	const [type, setType] = useState('date')
	const [pickDate,setPickDate] = useState(moment)
	const [data,setData] = useState([])
	const [outDate,setOutDate] = useState([moment().format('YYYY-MM-DD')])
	useEffect(()=>{
		getStaffTable()
	},[])
	const getStaffTable = async (date) => {
		try {
			const data = await axios.get(`http://127.0.0.1:8000/attendance/user_table/${date?date:moment().format('YYYY-MM-DD')}`)
			setData(data.data)
		}catch (e) {
			// message.error(e.response.data.message)
			setData(e.response.data.data)
		}
	}
	const getTimeRangeTable = async (start_time,end_time) => {
		try {
			const data = await axios.get(`http://127.0.0.1:8000/attendance/user_table/${start_time}/${end_time}`)
			setData(data.data)
		}catch (e) {
			// message.error(e.response.data.message)
			setData(e.response.data.data)
		}
	}
	const config = {
		width:600,
		height:200,
		appendPadding: 10,
		data:data,
		angleField: 'value',
		colorField: 'type',
		radius: 0.9,
		legend: {layout:"horizontal", position: 'top'},
		color: ['#4caf50', '#757575', '#f44336','#ff9800'],
		label: {
			type: 'inner',
			offset: '30%',
			content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
			style: {
				fontSize: 16,
				textAlign: 'center',
			},
		},
		interactions: [
			{
				type: 'element-active',
			},
		],
	};
	const PickerWithType=({ type, onChange })=>{
		return <DatePicker locale={locale} picker={type} onChange={onChange} defaultValue={pickDate} />;
	}
	const setDate = async (date,dateString) =>{
		if(type==='week'){
			const startTime = moment(date).startOf('week').format('YYYY-MM-DD')
			const endTime = moment(date).endOf('week').format('YYYY-MM-DD')
			setOutDate([startTime,endTime])
			setPickDate(date)
			await getTimeRangeTable(startTime, endTime)
		}
		if(type==='month'){
			const startTime = moment(date).startOf('month').format('YYYY-MM-DD')
			const endTime = moment(date).endOf('month').format('YYYY-MM-DD')
			setOutDate([startTime,endTime])
			setPickDate(date)
			await getTimeRangeTable(startTime, endTime)
		}
		if(type==='date'){
			setOutDate([dateString])
			setPickDate(date)
			await getStaffTable(dateString)
		}
	}
	const setTypePicker = (value) => {
		setType(value)
		if(value==='date'){
			setPickDate(moment())
			getStaffTable(moment().format('YYYY-MM-DD'))
			setOutDate([moment().format('YYYY-MM-DD')])
		}
		if(value==='week'){
			const startTime = moment().startOf('week').format('YYYY-MM-DD')
			const endTime = moment().endOf('week').format('YYYY-MM-DD')
			setOutDate([startTime,endTime])
			setPickDate(moment())
			getTimeRangeTable(startTime, endTime)
		}
		if(value==='month'){
			const startTime = moment().startOf('month').format('YYYY-MM-DD')
			const endTime = moment().endOf('month').format('YYYY-MM-DD')
			setOutDate([startTime,endTime])
			setPickDate(moment())
			getTimeRangeTable(startTime, endTime)
		}
	}
	const OutPutStaff = () =>{
		if(outDate.length===1){
			console.log(outDate[0])
			window.location.href = `http://127.0.0.1:8000/attendance/user_excel/${outDate[0]}`
		}else{
			console.log(outDate[0],outDate[1])
			window.location.href = `http://127.0.0.1:8000/attendance/user_excel/${outDate[0]}/${outDate[1]}`
		}
	}
	return 	(
		<Card title="员工考勤率" extra={<Button type="primary" onClick={OutPutStaff} ghost>导出</Button>}>
			<div style={{float:"left",width:"75%"}}>
				<Pie {...config}/>
				<div className="data-picker">
					<Space style={{textAlign:"center"}}>
						<Select value={type} onChange={value => {setTypePicker(value)}}>
							<Option value="date">日</Option>
							<Option value="week">周</Option>
							<Option value="month">月</Option>
						</Select>
						<PickerWithType type={type} onChange={(date,dateString)=>{setDate(date,dateString)}}/>
					</Space>
				</div>
			</div>
			{
				data.map((item,index)=>{
					let color = ''
					switch (item.type) {
						case '出勤':
							color = '#55B35B'
							break
						case '迟到':
							color = '#7c7c7c'
							break
						case '缺勤':
							color = '#F54D40'
							break
						case '早退':
							color = '#ff9800'
							break
					}
					return (
						<div  className="manager-count" key={index}>
							<div className="tip" style={{color:color}}>{item.type}人数：</div>
							<div className="number">{item.value}</div>
						</div>
					)
				})
			}
		</Card>
	)
}

export default Index
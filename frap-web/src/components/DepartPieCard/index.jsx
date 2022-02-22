import React, {useEffect, useState} from 'react';
import {Button, Card, DatePicker, Select, Space} from "antd";
import {Line} from "@ant-design/charts"
import "moment/locale/zh-cn"
import locale from "antd/es/date-picker/locale/zh_CN";
import moment from "moment";
import axios from "axios";

function Index() {
	const { Option } = Select;
	const [type, setType] = useState('week');
	const [pickDate,setPickDate] = useState(moment)
	const [dep,setDep] = useState('人事部')
	const [data,setData] = useState([])
	const [count,setCount] = useState([])
	const [outDate,setOutDate] = useState([moment().startOf('week').format('YYYY-MM-DD'),moment().endOf('week').format('YYYY-MM-DD')])
	function PickerWithType({ type, onChange }) {
		return <DatePicker locale={locale} picker={type} onChange={onChange} defaultValue={pickDate}/>;
	}
	useEffect(()=>{
		getDepartmentTable()
		return ()=>{
			setData([])
		}
	},[])
	const getDepartmentTable = async (department,start_time,end_time) => {
		const {data} = await axios.get(`http://127.0.0.1:8000/attendance/dept_table/${department?department:dep}/
		${start_time?start_time:outDate[0]}/${end_time?end_time:outDate[1]}`)
		setData(data.data)
		setCount(data.count)
	}
	const config = {
		width:800,
		height:200,
		data,
		xField: 'date',
		yField: 'value',
		seriesField: 'type',
		color: ['#4caf50', '#757575', '#f44336','#ff9800'],
	};
	const setDate = (date,dateString) =>{
		if(type==='week'){
			setPickDate(date)
			const startTime = moment(date).startOf('week').format('YYYY-MM-DD')
			const endTime = moment(date).endOf('week').format('YYYY-MM-DD')
			setOutDate([startTime,endTime])
			setPickDate(date)
			getDepartmentTable(dep,startTime, endTime)
		}
		if(type==='month'){
			setPickDate(date)
			const startTime = moment(date).startOf('month').format('YYYY-MM-DD')
			const endTime = moment(date).endOf('month').format('YYYY-MM-DD')
			setOutDate([startTime,endTime])
			setPickDate(date)
			getDepartmentTable(dep,startTime, endTime)
		}
	}
	const setTypePicker = (value) => {
		setType(value)
		if(value==='week'){
			const startTime = moment().startOf('week').format('YYYY-MM-DD')
			const endTime = moment().endOf('week').format('YYYY-MM-DD')
			setOutDate([startTime,endTime])
			setPickDate(moment())
			getDepartmentTable(dep,startTime, endTime)
		}
		if(value==='month'){
			const startTime = moment().startOf('month').format('YYYY-MM-DD')
			const endTime = moment().endOf('month').format('YYYY-MM-DD')
			setOutDate([startTime,endTime])
			setPickDate(moment())
			getDepartmentTable(dep,startTime, endTime)
		}
	}
	const choseDep = (val) =>{
		setDep(val)
		getDepartmentTable(val,outDate[0], outDate[1])
	}
	const OutPutDep = () =>{
		window.location.href = `http://127.0.0.1:8000/attendance/dept_excel/${dep}/${outDate[0]}/${outDate[1]}`
	}
	return (
		<Card title="部门考勤率" extra={<Button type="primary" onClick={OutPutDep} ghost>导出</Button>}>
			<div style={{float:"left",width:"75%"}}>
				<Line {...config} />
				<div className="data-picker">
					<Space>
						<Select value={type} onChange={value => {setTypePicker(value)}}>
							<Option value="week">周</Option>
							<Option value="month">月</Option>
						</Select>
						<PickerWithType type={type} onChange={(date,dateString)=>{setDate(date,dateString)}}/>
						<Select value={dep} onChange={choseDep}>
							<Option value="人事部">人事部</Option>
							<Option value="设计部">设计部</Option>
							<Option value="信息部">信息部</Option>
						</Select>
					</Space>
				</div>
			</div>
			{
				count.map((item,index)=>{
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
	);
}

export default Index;
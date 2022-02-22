import React, {useEffect} from 'react';
import {Row, Col} from 'antd';

import StaffPieCard from "../../components/StaffPieCard";
import DepartPieCard from "../../components/DepartPieCard";
import AdTable from "../../components/AdTable";
import "./index.css"
function Index(props) {
	useEffect(()=>{
		document.title="考勤管理"
	})
	return (
		<>
			<div className="left">考勤管理</div>
			<Row gutter={16}>
				<Col span={10} >
					<StaffPieCard/>
				</Col>
				<Col span={14} >
					<DepartPieCard/>
				</Col>
			</Row>
			<AdTable/>
		</>
	);
}

export default Index;
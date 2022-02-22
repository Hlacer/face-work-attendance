import {Card, Col, Row} from "antd";
import React, {useState} from "react";
import moment from "moment";

function Index(){
	const [titleTime,setTitleTime] = useState(moment().format("YYYY-MM-DD"))
	return(
		<Card title={`员工考勤情况（${titleTime}）`}>
			<Row gutter={16}>
				<Col span={6}>
					<Card hoverable={true}>
						<Card.Meta description="现有员工（人）"/>
						<div className="count" style={{fontSize:"36px"}}>2534</div>
					</Card>
				</Col>
				<Col span={6}>
					<Card hoverable={true}>
						<Card.Meta description="出勤人数（人）"/>
						<div className="count" style={{fontSize:"36px",color:"#4caf50"}}>1856</div>
					</Card>
				</Col>
				<Col span={6}>
					<Card hoverable={true}>
						<Card.Meta description="迟到人数（人）"/>
						<div className="count" style={{fontSize:"36px",color:"#f44336"}}>235</div>
					</Card>
				</Col>
				<Col span={6}>
					<Card hoverable={true}>
						<Card.Meta description="缺勤人数（人）"/>
						<div className="count" style={{fontSize:"36px",color:"#757575"}}>13</div>
					</Card>
				</Col>
			</Row>
		</Card>
	)
}
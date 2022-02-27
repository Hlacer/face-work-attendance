import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './index.css'
function Index(props) {
	const navgiate = useNavigate()
	let [time,setTime] = useState(5)
	useEffect(()=>{
		const timer = setInterval(()=>{
			setTime(time-=1)
			if(time === 0){
				clearInterval(timer)
				navgiate('/')
			}
		},1000)
	})
	return (
		<div className="container">
			<div className="content">
				<div className="title">404</div>
				<div>{time}秒后返回首页</div>
			</div>
		</div>
	);
}

export default Index;
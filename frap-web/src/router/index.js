/*路由文件，包含项目所有路由*/
import {lazy,Suspense} from "react";
import {Spin} from "antd";

import Index from "../components/AppLayout";
import NotFound from "../pages/NotFound";

const Login = lazy(()=>import("../pages/Login"))
const Admanage = lazy(()=>import("../pages/AdManage"))
const AdSetting = lazy(()=>import("../pages/AdSetting"))
const StaffFile = lazy(()=>import("../pages/StaffFile"))
const Acmanage = lazy(()=>import("../pages/AccountManage"))

const LazyLoad = (children) => {
	return (
		<Suspense fallback={<Spin delay={500}/>}>
			{children}
		</Suspense>
	)
}
const router = [
	{
		path: "/",
		element:<Index/>,
		children:[
			{index:true,element:LazyLoad(<Admanage/>)},
			{path:'/adsetting',element:LazyLoad(<AdSetting/>)},
			{path:'/user',element:LazyLoad(<StaffFile/>)},
			{path:'/account',element:LazyLoad(<Acmanage/>)},
		]
	},
	{
		path: "/login",
		element: LazyLoad(<Login/>)
	},
	{
		path: "*",
		element: <NotFound/>
	}
]

export default router
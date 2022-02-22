import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter,useRoutes} from "react-router-dom";

import router from "./router";
import "./index.css"

function App() {
    return useRoutes(router)
}

ReactDOM.render(
  <BrowserRouter>
      <App/>
  </BrowserRouter>,
  document.getElementById('root')
)

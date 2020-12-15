import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import store from './redux/store.js'

ReactDOM.render(<App store={store}/>,document.getElementById("root"))

store.subscribe(()=>{   //监听数据然后更新组件
    ReactDOM.render(<App store={store}/>,document.getElementById("root"))
})
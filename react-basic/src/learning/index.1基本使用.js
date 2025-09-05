// import React from 'react'
// import ReactDOM from 'react-dom'

// // 使用JSX创建react元素
// const title = <h1>Hello JSX <span>这是span</span></h1>

// // 渲染react元素
// ReactDOM.render(title, document.getElementById('root'))

// This error occurs because in React 18+, ReactDOM.render has been replaced by ReactDOM.createRoot.
// To fix it, update your code as follows:

import React from 'react'
import ReactDOM from 'react-dom/client'

// 使用JSX创建react元素
const title = <h1>Hello JSX <span>这是span</span></h1>

// 渲染react元素
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(title)
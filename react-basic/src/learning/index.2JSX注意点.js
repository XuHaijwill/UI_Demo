import React from 'react'
import ReactDOM from 'react-dom/client'

/* 
  JSX注意点：
*/

const title = (
  <h1 className="title">
    Hello JSX 
    <span />
  </h1>
)

// 渲染react元素
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(title)
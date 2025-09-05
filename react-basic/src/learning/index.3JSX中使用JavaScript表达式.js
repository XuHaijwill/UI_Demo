import React from 'react'
import ReactDOM from 'react-dom/client'

/* 
  JSX中使用JavaScript表达式
*/
const name = 'Jack'
const age = 19

const title = (
  <h1>
    Hello JSX, {name}, 年龄：{age}
  </h1>
)

// 渲染react元素
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(title)
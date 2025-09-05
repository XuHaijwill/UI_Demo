# web前端常用的五种方式搭建本地静态html页面服务器

## 方式一：live-server

- 直接使用live-server

  > live-server是一款npm工具，可以在项目目录启动一个node服务，然后直接在浏览器中预览，并且**自动全局监听实时更新**。
  >
  > 两种安装方式：
  >
  > ```
  > 全局安装 npm i live-server -g
  > 本地安装  npm i live-server --save-dev
  > ```
  >
  > ###  直接使用live-server
  >
  > 首先在项目下npm初始化:npm init -y;
  >
  > 然后可以选择全局安装或者本地安装live-server，然后在package.json的scripts属性中添加如下代码：
  >
  > ```
  > "scripts": {
  > "server": "live-server ./ --port=8181 --host=localhost --proxy=/api:http://www.abc.com/api/"
  > }
  > ```
  >
  > 其中包括了代理设置proxy。
  >
  > 然后npm run server执行下就会自动打开当前工程，默认指向index.html页面。

- 使用node

  > 首先本地安装live-server，执行如下指令：
  >
  > ```
  >  npm i live-server --save-dev
  > ```
  >
  > 然后在该项目下新建一个build.js，代码如下：
  >
  > [![复制代码](https://assets.cnblogs.com/images/copycode.gif)](javascript:void(0);)
  >
  > ```
  > var liveServer = require("live-server");
  > 
  >  var params = {
  >      port: 8181,
  >      host: "localhost",
  >      open: true,
  >      file: "index.html", 
  >      wait: 1000,
  >      logLevel: 2,  
  >     proxy: [['/api','http://www.abc.com/api/']]
  >  };
  >  liveServer.start(params);
  > ```
  >
  > [![复制代码](https://assets.cnblogs.com/images/copycode.gif)](javascript:void(0);)
  >
  > 最后在package.json的scripts下添加如下代码：
  >
  > ```
  > "scripts": {
  >     "dev": "node build.js"
  > }
  > ```
  >
  > 最后执行npm run dev就启动了本地静态页面，路径即是：http://localhost:8081/
  >
  > 详细参考地址：https://www.npmjs.com/package/live-server

## 方式二：http-server

> 全局安装http-server
>
> ```
> npm i -g http-server
> ```
>
> 用法：
>
> ```
> http-server [path] [options]
> ```
>
> 其中的path默认指向工程路径下的./public，如果不存在那么使用./。
>
> options就是常见的配置，比如端口、代理地址等，常用配置：
>
> - -p or --port Port to use (defaults to 8080). It will also read from process.env.PORT. （设置端口）
> - -a Address to use (defaults to 0.0.0.0) （设置访问地址）
> - -P or --proxy Proxies all requests which can't be resolved locally to the given url. e.g.: -P http://someurl.com（设置代理地址）
> - -o [path] Open browser window after starting the server. Optionally provide a URL path to open. e.g.: -o /other/dir/ （默认打开浏览器）
>
> cmd进入静态目录工程，可执行如下操作：
>
> ```
> http-server ./ -o --port 8085 --proxy http://192.168.11.120:8888/
> ```
>
> 当然该条命令也可以缩写成如下：
>
> ```
> hs ./ -o -p 8085 -P http://192.168.11.120:8888/
> ```
>
> 我们也可以初始化package.json，执行npm init -y，然后在package.json中的scripts字段中添加如下代码：
>
> ```
> "scripts": {
>     "dev": "http-server  ./ -o --port 8089 --proxy http://192.168.11.120:8888/"
> }
> ```
>
> 最后执行npm run dev 也是一样的，使用http-server主要缺点是不能使浏览器自动刷新。
>
>  官网github地址：https://github.com/http-party/http-server

## 方式三：express搭建

> ### 使用express简单搭建
>
> 使用express搭建前端静态页面环境，在工程下新建`build`文件夹，建一个`dev.js`(开发环境启动文件)以及`index.js`（配置文件、如端口）。
>
> 我们只需要安装`express`以及`http-proxy-middleware`即可，如下：
>
> ```
> npm i express http-proxy-middleware -D
> ```
>
> index.js代码：
>
> [![复制代码](https://assets.cnblogs.com/images/copycode.gif)](javascript:void(0);)
>
> ```
> module.exports = {
>     port: 8081,
>     host: 'localhost',
>  proxyTable: [{
>         api: '/api',
>         target: 'http://192.168.1.112:8081/' }]
> }
> ```
>
> [![复制代码](https://assets.cnblogs.com/images/copycode.gif)](javascript:void(0);)
>
> dev.js代码如下：
>
> [![复制代码](https://assets.cnblogs.com/images/copycode.gif)](javascript:void(0);)
>
> ```
> const express = require('express');
> const { createProxyMiddleware } = require('http-proxy-middleware');
> const {port = 8080,proxyTable = []} = require('./index.js');
> 
> const app = express();
> app.use('/', express.static('./')); // 设置静态资源访问路径
> proxyTable.forEach((item) => app.use(createProxyMiddleware(item.api, {
>     target: item.target, // 目标服务器 host
>     changeOrigin: true, // // 默认false，是否需要改变原始主机头为目标URL
>     ws: true // 是否代理websockets
> })))
> 
> app.listen(port,() => {
>     console.log(`listen：${port}`);
> })
> ```
>
> [![复制代码](https://assets.cnblogs.com/images/copycode.gif)](javascript:void(0);)
>
> 在package.json中配置启动快捷键，如下：
>
> ```
> "scripts": {
>     "dev": "node config/dev.js"
> }
> ```
>
> 运行`npm run dev` 即可启动本地服务器，本地运行`localhost:8081`即可（默认运行工程下的静态文件index.html），如果需要方法其他静态页面添加相应路径即可。
>
> 其中`http-proxy-middleware`实际就是将`http-proxy`封装，使用起来更加方便简单,老版本http-proxy-middleware参考：[http-proxy-middleware使用方法和实现原理（源码解读）](https://www.cnblogs.com/zhaoweikai/p/9969282.html),其中[新版本的http-proxy-middleware使用方式参考github](https://www.npmjs.com/package/http-proxy-middleware)
>
> ### 使用browser-sync实现热更新优化
>
> 代码如下：
>
> [![复制代码](https://assets.cnblogs.com/images/copycode.gif)](javascript:void(0);)
>
> ```
> const express = require('express');
> const path = require('path');
> const timeout = require('connect-timeout');
> const { createProxyMiddleware } = require('http-proxy-middleware');
> const { port = 8080, proxyTable = [], host = 'localhost' } = require('./index.js');
> 
> const app = express();
> const pathname = path.resolve(__dirname, '../');
> const bs = require('browser-sync').create('server');
> 
> app.use(timeout(60 * 1e3));
> app.use((req, res, next) => {
>     if (!req.timedout) next();
> });
> app.use('/', express.static(`${pathname}`)); // 设置静态资源访问路径
> proxyTable.forEach((item) => app.use(createProxyMiddleware(item.api, {
>     target: item.target, // 目标服务器 host
>     changeOrigin: true, // // 默认false，是否需要改变原始主机头为目标URL
>     ws: true // 是否代理websockets
> })))
> 
> app.listen(port, () => {
>     bs.init({ // 开始一个Browsersync代理
>         proxy: `http://${host}:${port}`,
>         notify: true, // 通知
>         port: 8085, 
>         // files: ['**'] // files 必须带上，不带上修改文件不会刷新；可以指定文件类型、文件等方式
>         files: [`${pathname}/resources/**/*.html`,`${pathname}/index.html`,`${pathname}/public/**/*.js`,`${pathname}/public/**/*.css`]
>     }) 
> })
> ```
>
> [![复制代码](https://assets.cnblogs.com/images/copycode.gif)](javascript:void(0);)
>
> 当然也可以用watch方法监听文件的变化，更改代码如下：
>
> [![复制代码](https://assets.cnblogs.com/images/copycode.gif)](javascript:void(0);)
>
> ```
> const express = require('express');
> const path = require('path');
> const timeout = require('connect-timeout');
> const { createProxyMiddleware } = require('http-proxy-middleware');
> const { port = 8080, hotUpdate = false, proxyTable = [], host = 'localhost' } = require('./index.js');
> 
> const app = express();
> const pathname = path.resolve(__dirname, '../');
> const bs = require('browser-sync').create('server');
> 
> app.use(timeout(60 * 1e3));
> app.use((req, res, next) => {
>     if (!req.timedout) next();
> });
> app.use('/', express.static(`${pathname}`)); // 设置静态资源访问路径
> proxyTable.forEach((item) => app.use(createProxyMiddleware(item.api, {
>     target: item.target, // 目标服务器 host
>     changeOrigin: true, // // 默认false，是否需要改变原始主机头为目标URL
>     ws: true // 是否代理websockets
> })))
> 
> bs.watch(`${pathname}/resources/**/*.html`).on("change", bs.reload);
> bs.watch(`${pathname}/index.html`).on("change", bs.reload);
> bs.watch(`${pathname}/public/**/*.js`, function(event, file) {
>     if (event === 'change') {
>         bs.reload('*.js')
>     }
> })
> bs.watch(`${pathname}/public/**/*.css`, function(event, file) {
>     if (event === 'change') {
>         bs.reload('*.css')
>     }
> })
> 
> app.listen(port, () => {
>     bs.init({ // 开始一个Browsersync代理
>         proxy: `http://${host}:${port}`,
>         notify: true, // 通知
>         port: 8085
>     }) 
> })
> ```
>
> [![复制代码](https://assets.cnblogs.com/images/copycode.gif)](javascript:void(0);)
>
> > 注：Browsersync让浏览器实时、快速响应文件变化并自动刷新，[Browsersync说明文档](http://www.browsersync.cn/docs/api/)

## 方式四：使用node内置模块http启动服务

> [![复制代码](https://assets.cnblogs.com/images/copycode.gif)](javascript:void(0);)
>
> ```
> const http = require('http');
> const fs = require('fs');
> const path = require('path');
> const httpProxy = require('http-proxy');
> const childProcess = require('child_process'); // 可自动打开浏览器
> const filepath = path.resolve(__dirname,'./');
> const proxy = httpProxy.createProxyServer(); // 创建代理服务器
> const {proxyTable = []} = require('./config/index.js');
> 
> http.createServer(function(req,res){
>     fs.readFile(filepath + req.url,function(err,data) {
>         proxyTable.forEach((item) => {
>             if(req.url.indexOf(item.api) !== -1) { // 匹配上接口代理
>                 proxy.web(req,res,{target: item.target});
>                 proxy.on('error',function(e) { // 代理失败处理
>                     console.log(e);
>                 })
>             } else {
>                 if(err) {
>                     res.writeHeader(404,{'content-type': 'text/html;charset="utf-8"'});
>                     res.write('<h1>404错误</h1><p>你访问的页面/内容不存在</p>');
>                     res.end();
>                 } else {
>                     res.write(data);
>                     res.end();
>                 }
>             }
>         })
>         
>     })
> }).listen(8080,() => {
>     console.log('服务启动了');
> });
> 
> childProcess.exec('start http://localhost:8080/index.html');
> ```
>
> [![复制代码](https://assets.cnblogs.com/images/copycode.gif)](javascript:void(0);)
>
> 然后在地址栏输入localhost:8080/index.html （其中我的index.html就放在根路径，根据具体路径填写）
>
> 换一种方式：
>
> [![复制代码](https://assets.cnblogs.com/images/copycode.gif)](javascript:void(0);)
>
> ```
> const http = require('http');
> const fs = require('fs');
> const path = require('path');
> const httpProxy = require('http-proxy');
> const childProcess = require('child_process'); // 可自动打开浏览器
> const filepath = path.resolve(__dirname,'./');
> const proxy = httpProxy.createProxyServer(); // 创建代理服务器
> const {proxyTable = []} = require('./config/index.js');
> const server = new http.Server();
> 
> server.on('request',function(req,res){
>     fs.readFile(filepath + req.url,function(err,data) {
>         proxyTable.forEach((item) => {
>             if(req.url.indexOf(item.api) !== -1) { // 匹配上接口代理
>                 proxy.web(req,res,{target: item.target});
>                 proxy.on('error',function(e) { // 代理失败处理
>                     console.log(e);
>                 })
>             } else {
>                 if(err) {
>                     res.writeHeader(404,{'content-type': 'text/html;charset="utf-8"'});
>                     res.write('<h1>404错误</h1><p>你访问的页面/内容不存在</p>');
>                     res.end();
>                 } else {
>                     res.write(data);
>                     res.end();
>                 }
>             }
>         })
>         
>     })
> })
> 
> server.listen(8080,() => {
>     console.log('服务启动了');
> });
> 
> childProcess.exec('start http://localhost:8080/index.html');
> ```
>
> [![复制代码](https://assets.cnblogs.com/images/copycode.gif)](javascript:void(0);)

## 方式五：Nginx配置

> conf主要的配置代码：
>
> [![复制代码](https://assets.cnblogs.com/images/copycode.gif)](javascript:void(0);)
>
> ```
> http {
>     # nginx负载均衡配置
>     upstream dynamic_balance {
>         #ip_hash;
>         server 192.168.100.123: 8081;
>     }
>     # 省略其他
>     server {
>         listen 80;
>         server_name localhost;
>         #访问工程路径
>         root website;
>         index index.html index.htm;
>         
>         #转发把原http请求的Header中的Host字段也放到转发的请求
>         proxy_set_header Host $host;
>         #获取用户真实IP
>         proxy_set_header X - real - ip $remote_addr;
>         proxy_set_header X - Forwarded - For $proxy_add_x_forwarded_for;
>         
>         #接口转发
>         location /base/ {
>             proxy_pass http: //dynamic_balance; 
>         }
>         
>         #启用history模式（ 什么请求都只返回index.html）
>         location / {
>             try_files $uri $uri / /index.html;
>         }
>     }
> }
> ```
>
> [![复制代码](https://assets.cnblogs.com/images/copycode.gif)](javascript:void(0);)



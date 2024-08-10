const path = require('path')
const fs = require('fs')

// 注意：  ../ 会抵消前面的路径
// const pathStr = path.join('/a', '/b/c', '../../', './d', 'e')
// console.log(pathStr)  // /a/b/d/e

// fs.readFile(__dirname + '/files/1.txt')

fs.readFile(path.join(__dirname, './files/1.txt'), 'utf8', function(err, dataStr) {
  if (err) {
    return console.log(err.message)
  }
  console.log(dataStr)
})


// 定义文件的存放路径
const fpath = 'C:/xhj/git/github/FrontEndDemo/nodejs/files/index.html'

// const fullName = path.basename(fpath)
// console.log(fullName)

const nameWithoutExt = path.basename(fpath, '.html')
console.log("filename:" + nameWithoutExt)

const fext = path.extname(fpath)
console.log("fext::" + fext)
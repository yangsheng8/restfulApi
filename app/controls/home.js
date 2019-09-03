/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 23:10:04
 * @LastEditTime: 2019-08-25 18:13:46
 * @LastEditors: Please set LastEditors
 */
const path = require('path');
class HomeCtrl{
    index(ctx){
        ctx.body = '<h1>这是主页</h1>';
    }
    upload(ctx){
      const file = ctx.request.files.file;
     const basename = path.basename(file.path);
      ctx.body = {url:`${ctx.origin}/uploads/${basename}`}
    }
}

module.exports = new HomeCtrl();
/*
 * @Description: 读取app文件，进行批量注册
 * @Author: your name
 * @Date: 2019-08-14 17:12:51
 * @LastEditTime: 2019-08-14 22:51:51
 * @LastEditors: Please set LastEditors
 */
const fs = require('fs');
module.exports = (app)=>{
    fs.readdirSync(__dirname).forEach(file=>{
        if(file==='index.js'){
            return ;
        }
        const route = require(`./${file}`);
        app.use(route.routes()).use(route.allowedMethods());
    });

}
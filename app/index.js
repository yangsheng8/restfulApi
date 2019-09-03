/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 16:23:34
 * @LastEditTime: 2019-08-25 18:27:30
 * @LastEditors: Please set LastEditors
 */

const Koa = require('koa');
const koabody = require('koa-body');
const koaStatic = require('koa-static');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
//引入mongoose
const mongoose = require('mongoose');
const app = new Koa();
const routing = require('./routes');
const {connectionStr} = require("./config");
const path = require('path');

//连接数据库
mongoose.connect(connectionStr,{useNewUrlParser: true},()=>{
    console.log("MongoDB 连接成功~")
});

mongoose.connection.on('error',console.error);

app.use(koaStatic(path.join(__dirname,'/public')))
app.use(error({
    postFormat:(e,{stack,...rest})=>process.env.NODE_ENV ==='production'?rest:{stack,...rest}
}));
app.use(koabody({
    multipart:true,
    formidable:{
        uploadDir:path.join(__dirname,'/public/uploads'),
        keepExtensions: true
    }
}))
app.use(parameter(app))
routing(app);


app.listen(3000,()=>{
    console.log('localhost:3000')
});
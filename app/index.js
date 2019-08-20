/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 16:23:34
 * @LastEditTime: 2019-08-17 21:19:12
 * @LastEditors: Please set LastEditors
 */

const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
//引入mongoose
const mongoose = require('mongoose');
const app = new Koa();
const routing = require('./routes');
const {connectionStr} = require("./config");

//连接数据库
mongoose.connect(connectionStr,{useNewUrlParser: true},()=>{
    console.log("MongoDB 连接成功~")
});

mongoose.connection.on('error',console.error);




app.use(error({
    postFormat:(e,{stack,...rest})=>process.env.NODE_ENV ==='production'?rest:{stack,...rest}
}));
app.use(bodyparser())
app.use(parameter(app))
routing(app);


app.listen(3000,()=>{
    console.log('localhost:3000')
});
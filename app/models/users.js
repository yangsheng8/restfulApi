/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 21:42:12
 * @LastEditTime: 2019-08-19 21:10:06
 * @LastEditors: Please set LastEditors
 */
const mongoose = require('mongoose');
const { Schema,model } =  mongoose;
const userSchema = new Schema({
    __v:{type:Number,select:false},
    name:{type:String,required:true},
    password:{type:String,required:true,select:false}
})

 module.exports = model('User',userSchema);
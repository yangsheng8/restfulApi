/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 21:42:12
 * @LastEditTime: 2019-08-26 11:25:07
 * @LastEditors: Please set LastEditors
 */
const mongoose = require('mongoose');
const { Schema,model } =  mongoose;
const topicSchema = new Schema({
    __v:{type:Number,select:false},
    name:{type:String,required:true},
    avatar_url:{type:String},
    introduction:{type:String,select:false},
})

 module.exports = model('Topic',topicSchema);
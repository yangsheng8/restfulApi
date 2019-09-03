/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 21:42:12
 * @LastEditTime: 2019-08-29 07:28:22
 * @LastEditors: Please set LastEditors
 */
const mongoose = require('mongoose');
const { Schema,model } =  mongoose;
const questionSchema = new Schema({
    __v:{type:Number,select:false},
    title:{type:String,required:true},
    description:{type:String},
    questioner:{type:Schema.Types.ObjectId,ref:'User',required:true,select:false},
    topics:{type:[{type:Schema.Types.ObjectId,ref:'Topic'}],select:false}
})

 module.exports = model('Question',questionSchema);
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 21:42:12
 * @LastEditTime: 2019-09-03 21:50:03
 * @LastEditors: Please set LastEditors
 */
const mongoose = require('mongoose');
const { Schema,model } =  mongoose;
const commentSchema = new Schema({
    __v:{type:Number,select:false},
    content:{type:String,required:true},
    commentator:{type:Schema.Types.ObjectId,ref:'User',required:true,select:false},
    questionId:{type:String,required:false},
    answerId:{type:String,required:false},
    rootCommentId:{type:String},
    replyTo:{type:Schema.Types.ObjectId,ref:'User'}
},{timestamps:true})

 module.exports = model('Comment',commentSchema);
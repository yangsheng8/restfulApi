/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 21:42:12
 * @LastEditTime: 2019-09-02 18:16:30
 * @LastEditors: Please set LastEditors
 */
const mongoose = require('mongoose');
const { Schema,model } =  mongoose;
const answerSchema = new Schema({
    __v:{type:Number,select:false},
    content:{type:String,required:true},
    answerer:{type:Schema.Types.ObjectId,ref:'User',required:true,select:false},
    questionId:{type:String,required:false},
    voteCount:{type:Number,required:true,default:0}
})

 module.exports = model('Answer',answerSchema);
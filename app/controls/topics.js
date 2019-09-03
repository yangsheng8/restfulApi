/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 23:10:17
 * @LastEditTime: 2019-08-29 06:52:59
 * @LastEditors: Please set LastEditors
 */
const Topic = require('../models/topics');
const User = require('../models/users');
const Question = require('../models/questions');

class TopicsCtl {
  async find(ctx){
    //默认显示条目为10
    const { per_page =10} = ctx.query;
    //当前是第几页
    const page = Math.max(ctx.query.page *1 ,1)-1;
    //显示几条
    const perPage =Math.max(per_page*1,1) ;
    ctx.body = await Topic
    .find({name: new RegExp(ctx.query.q)})
    .limit(perPage)
    .skip(page*perPage);
  }
  async checkTopicExist(ctx,next){
    const topic = await Topic.findById(ctx.params.id);
    if(!topic){ctx.throw(404,'话题不存在');}
    await next();
    }
  async findById(ctx){
     const { fields = '' } = ctx.query;
     const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('');
     const topic = await Topic.findById(ctx.params.id).select(selectFields);
     ctx.body = topic;
    }
    async create(ctx){
       ctx.verifyParams({
         name:{type:'string',required:true},
         avatar_url:{type:'string',required:false},
         introduction:{type:'string',required:false}
       });
       const topic = await new Topic(ctx.request.body).save();
       ctx.body = topic;
    }
    async update(ctx){
       ctx.verifyParams({
         name:{type:'string',required:false},
         avatar_url:{type:'string',required:false},
         introduction:{type:'string',required:false}
       });
       const topic = await Topic.findByIdAndUpdate(ctx.params.id,ctx.request.body)
       ctx.body  =  topic;
      }
      //获取话题关注的粉丝
      async listTopicFollowers(ctx){
        const users = await User.find({followingTopics:ctx.params.id});
        ctx.body = users;
      }

      //实现话题的问题列表接口
      async listQuestions(ctx){
        const questions = await Question.find({topics:ctx.params.id});
        ctx.body = questions;
      }
}

module.exports = new TopicsCtl();
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 23:10:17
 * @LastEditTime: 2019-09-02 23:44:25
 * @LastEditors: Please set LastEditors
 */
const Answer = require('../models/answers');

class AnswersCtl {
  async find(ctx){
    //默认显示条目为10
    const { per_page =10} = ctx.query;
    //当前是第几页
    const page = Math.max(ctx.query.page *1 ,1)-1;
    //显示几条
    const perPage =Math.max(per_page*1,1) ;
    const q = new RegExp(ctx.query.q);
    ctx.body = await Answer
    .find({ content:q,questionId:ctx.params.questionId })
    .limit(perPage)
    .skip(page*perPage);
  }
  async checkAnswerExist(ctx,next){
    const answer = await Answer.findById(ctx.params.id).select('+answerer');
    if(!answer){ctx.throw(404,'答案不存在');}
    //只有在删改查答案时候才检查此逻辑，赞和踩不检查
    if(ctx.params.questionId && answer.questionId !== ctx.params.questionId){
      ctx.throw(404,'该问题下没有此答案');
    }
    //把返回的一条数据存储到ctx.state中
    ctx.state.answer = answer;
    await next();
    }
  async findById(ctx){
     const { fields = '' } = ctx.query;
     const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('');
     const answer = await Answer.findById(ctx.params.id).select(selectFields).populate('answerer');
     ctx.body = answer;
    }
    //增
    async create(ctx){
      console.log(ctx.request.body);
    
       ctx.verifyParams({
         content:{type:'string',required:true},
       });
       const answerer = ctx.state.user._id;
       const { questionId } = ctx.params;
       const answer = await new Answer({...ctx.request.body,answerer,questionId}).save();
       ctx.body = answer;
    }
    //检查回答者是否属于当前登录人
    async checkAnswerer(ctx, next) {
      const { answer } = ctx.state;
      if (answer.answerer.toString() !== ctx.state.user._id) { ctx.throw(403, '没有权限'); }
      await next();
    }
    async update(ctx){
       ctx.verifyParams({
         content:{type:'string',required:false},
       });
      await ctx.state.answer.update(ctx.request.body);
       ctx.body  =  ctx.state.answer;
      }

      async delete(ctx){
        await Answer.findByIdAndRemove(ctx.params.id);
        ctx.status = 204;
      }

}

module.exports = new AnswersCtl();
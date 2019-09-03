/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 23:10:17
 * @LastEditTime: 2019-09-03 21:35:51
 * @LastEditors: Please set LastEditors
 */
const Comment = require('../models/comments');

class CommentsCtl {
  async find(ctx){
    //默认显示条目为10
    const { per_page =10} = ctx.query;
    //当前是第几页
    const page = Math.max(ctx.query.page *1 ,1)-1;
    //显示几条
    const perPage =Math.max(per_page*1,1) ;
    const q = new RegExp(ctx.query.q);
    const {questionId,answerId} = ctx.params;
    const {rootCommentId} = ctx.query;
    ctx.body = await Comment
    .find({ content:q,questionId,answerId,rootCommentId })
    .limit(perPage)
    .skip(page*perPage)
    .populate('commentator replyTo');
  }
  //检查评论是否存在
  async checkCommentExist(ctx,next){
    const comment = await Comment.findById(ctx.params.id).select('+commentator');
    if(!comment){ctx.throw(404,'评论不存在');}
    if(ctx.params.questionId && comment.questionId !== ctx.params.questionId){
      ctx.throw(404,'该问题下没有此评论');
    }
    if(ctx.params.answerId && comment.answerId !== ctx.params.answerId){
      ctx.throw(404,'该答案下没有此评论');
    }
    //把返回的一条数据存储到ctx.state中
    ctx.state.comment = comment;
    await next();
    }
  async findById(ctx){
     const { fields = '' } = ctx.query;
     const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('');
     const comment = await Comment.findById(ctx.params.id).select(selectFields).populate('commentator');
     ctx.body = comment;
    }
    //增
    async create(ctx){

       ctx.verifyParams({
         content:{type:'string',required:true},
         rootCommentId:{type:'string',required:false},
         replyTo:{type:'string',required:false}
       });
       const commentator = ctx.state.user._id;
       const { questionId,answerId } = ctx.params;
       const comment = await new Comment({...ctx.request.body,commentator,questionId,answerId}).save();
       ctx.body = comment;
    }
    //检查评论者是否属于当前登录人
    async checkCommentator(ctx, next) {
      const { comment } = ctx.state;
      if (comment.commentator.toString() !== ctx.state.user._id) { ctx.throw(403, '没有权限'); }
      await next();
    }
    async update(ctx){
       ctx.verifyParams({
         content:{type:'string',required:false},
       });
       //一个二级评论在某一个一级评论下，就永远是二级评论，不可能变了。
       //只允许更新 content 属性
       const { content } = ctx.request.body;
      await ctx.state.comment.update({content});
       ctx.body  =  ctx.state.comment;
      }

      async delete(ctx){
        await Comment.findByIdAndRemove(ctx.params.id);
        ctx.status = 204;
      }

}

module.exports = new CommentsCtl();
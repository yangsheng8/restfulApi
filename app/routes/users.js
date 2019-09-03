/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 17:06:22
 * @LastEditTime: 2019-09-02 23:00:05
 * @LastEditors: Please set LastEditors
 */
const jwt = require('koa-jwt');
const Router = require("koa-router");
const router = new Router({ prefix: "/users" });
const { 
    find, 
    findById, 
    create, 
    update, 
    deluser,
    login,
    checkOwner,
    listFollowing,
    checkUserExist,
    follow,
    unfollow,
    listFollowers,
    followTopic,
    unfollowTopic,
    listFollowingTopics,
    listQuestions,
    listLikingAnswers,likeAnswer,unlikeAnswer,
    listDislikingAnswers,dislikeAnswer,undislikeAnswer,
    listCollectingAnswers,collectingAnswer,unCollectingAnswer
 } = require("../controls/users");

 const {checkTopicExist} = require("../controls/topics");
 const { checkAnswerExist }  = require("../controls/answers");

 const { secret } = require('../config');   
const auth = jwt({secret});

//查列表
router.get("/", find);
//增
router.post("/", create);
//查用户
router.get("/:id", findById);
//更新
router.patch("/:id", auth, checkOwner, update);
//删除
router.delete("/:id", auth, checkOwner, deluser);
//登录接口
router.post('/login',login);
//获取粉丝列表
router.get('/:id/following',listFollowing);
//获取某人的粉丝列表
router.get('/:id/followers',listFollowers);
//关注某人
router.put('/following/:id',auth,checkUserExist,follow);
//取消关注某人
router.delete('/following/:id',auth,checkUserExist,unfollow);
//获取某个用户的关注话题列表
router.get('/:id/listFollowingTopics',listFollowingTopics);
//关注话题
router.put('/followTopics/:id',auth,checkTopicExist,followTopic);
//取消关注话题
router.delete('/unfollowTopics/:id',auth,checkTopicExist,unfollowTopic);
//获取用户提问的列表
router.get('/:id/questions',listQuestions);

//获取用户赞列表
router.get('/:id/likeingAnswers',listLikingAnswers);
//赞
router.put('/likeingAnswers/:id',auth,checkAnswerExist,likeAnswer,undislikeAnswer);
//取消赞
router.delete('/likeingAnswers/:id',auth,checkAnswerExist,unlikeAnswer);
//获取用户踩列表
router.get('/:id/dislikeingAnswers',listDislikingAnswers);
//踩
router.put('/dislikeingAnswers/:id',auth,checkAnswerExist,dislikeAnswer,unlikeAnswer);
//取消踩
router.delete('/dislikeingAnswers/:id',auth,checkAnswerExist,undislikeAnswer);

//获取用户收藏列表
router.get('/:id/collectingAnswers',listCollectingAnswers);
//收藏
router.put('/collectingAnswers/:id',auth,checkAnswerExist,collectingAnswer);
//取消收藏
router.delete('/collectingAnswers/:id',auth,checkAnswerExist,unCollectingAnswer);



module.exports = router;

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 17:06:22
 * @LastEditTime: 2019-08-29 07:18:47
 * @LastEditors: Please set LastEditors
 */
const jwt = require('koa-jwt');
const Router = require("koa-router");
const router = new Router({ prefix: "/topics" });
const { 
    find, 
    findById, 
    create, 
    update,
    checkTopicExist,
    listTopicFollowers,
    listQuestions
 } = require("../controls/topics");

 const { secret } = require('../config');   
const auth = jwt({secret});

//查列表
router.get("/", find);
//增
router.post("/", auth,create);
// //查用户
 router.get("/:id", checkTopicExist ,findById);
// //更新
 router.patch("/:id",auth, checkTopicExist ,update);
//获取话题的粉丝
router.get('/:id/followers',checkTopicExist,listTopicFollowers)

router.get('/:id/questions',checkTopicExist ,listQuestions)

module.exports = router;

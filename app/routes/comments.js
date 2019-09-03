/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 17:06:22
 * @LastEditTime: 2019-09-03 20:36:42
 * @LastEditors: Please set LastEditors
 */
const jwt = require('koa-jwt');
const Router = require("koa-router");
const router = new Router({ prefix: "/questions/:questionId/answers/:answerId/comment" });
const { 
    find, 
    findById, 
    create, 
    update,
    delete:del,
    checkCommentExist,
    checkCommentator
 } = require("../controls/comments");

 const { secret } = require('../config');   
const auth = jwt({secret});

router.get("/", find);
router.post("/", auth,create);
router.get("/:id", checkCommentExist ,findById);
router.patch("/:id",auth, checkCommentExist ,checkCommentator, update);
router.delete('/:id',auth,checkCommentExist,checkCommentator ,del)



module.exports = router;

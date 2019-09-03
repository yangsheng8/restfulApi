/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 17:06:22
 * @LastEditTime: 2019-08-28 23:13:51
 * @LastEditors: Please set LastEditors
 */
const jwt = require('koa-jwt');
const Router = require("koa-router");
const router = new Router({ prefix: "/questions" });
const { 
    find, 
    findById, 
    create, 
    update,
    checkQuestionExist,
    checkQuestioner,
    deleteQuestion
 } = require("../controls/questions");

 const { secret } = require('../config');   
const auth = jwt({secret});

router.get("/", find);
router.post("/", auth,create);
router.get("/:id", checkQuestionExist ,findById);
router.patch("/:id",auth, checkQuestionExist ,checkQuestioner, update);
router.delete('/:id',auth,checkQuestionExist,checkQuestioner ,deleteQuestion)



module.exports = router;

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 17:06:22
 * @LastEditTime: 2019-08-19 23:53:02
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
    del,
    login,
    checkOwner
 } = require("../controls/users");

 const { secret } = require('../config');   
const auth = jwt({secret});

//查列表
router.get("/", find);
//增
router.post("/", create);
//查用户
router.get("/:id", findById);
//更新
router.patch("/:id",auth,checkOwner, update);
//删除
router.delete("/:id",auth,checkOwner,del);
//登录接口
router.post('/login',login);

module.exports = router;

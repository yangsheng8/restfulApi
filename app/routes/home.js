/*
 * @Description: 首页
 * @Author: your name
 * @Date: 2019-08-14 17:06:08
 * @LastEditTime: 2019-08-14 23:14:01
 * @LastEditors: Please set LastEditors
 */
const Router = require('koa-router');
const router = new Router();
const {index} = require('../controls/home');
router.get('/',index)

module.exports =  router;
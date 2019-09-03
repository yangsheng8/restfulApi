/*
 * @Description: 首页
 * @Author: your name
 * @Date: 2019-08-14 17:06:08
 * @LastEditTime: 2019-08-25 16:57:27
 * @LastEditors: Please set LastEditors
 */
const Router = require('koa-router');
const router = new Router();
const {index,upload} = require('../controls/home');
router.get('/',index);
router.post('/upload',upload);
module.exports =  router;
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 23:10:04
 * @LastEditTime: 2019-08-14 23:12:24
 * @LastEditors: Please set LastEditors
 */
class HomeCtrl{
    index(ctx){
        ctx.body = '<h1>这是主页</h1>';
    }
}

module.exports = new HomeCtrl();
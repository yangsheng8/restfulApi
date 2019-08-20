/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 23:10:17
 * @LastEditTime: 2019-08-19 23:35:47
 * @LastEditors: Please set LastEditors
 */
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/users')
const {secret} = require('../config');

class UserCtl {
  async find(ctx){
    ctx.body = await User.find();
  }
  async findById(ctx){
   const user =await User.findById(ctx.params.id);
   if(!user){
     ctx.throw(404,'用户不存在')
   }
   ctx.body = user;

  }
 async create(ctx){
    ctx.verifyParams({
       name:{type:'string',required:true},
       password:{type:'string',required:true}
    })
    const {name} = ctx.request.body;
    const repeatedUser = await User.findOne({name});
    if(repeatedUser){
      ctx.throw(409,'用户名已经被占用');
    }
    let user = await new User(ctx.request.body).save(function(err){
       if(!err){
          console.log("保存成功~~");
       }
    })
    ctx.body = user;
  }

  async checkOwner(ctx,next){
    if(ctx.params.id  !== ctx.state.user._id){
        ctx.throw(403,'没有权限')
    }
    await next();
  }
 async update(ctx){
    ctx.verifyParams({
      name:{type:'string',required:false},
      password:{type:'string',required:false}
   })
   await User.updateOne({_id:ctx.params.id},{$set:ctx.request.body},function(err){
     if(!err){
       console.log("修改成功~~~");
       ctx.body = "修改成功!";
     }
   })
 
 
  }

 async del(ctx){
    const user = await User.findByIdAndRemove(ctx.params.id);
    if(!user){ctx.throw(404,'用户不存在')}
    ctx.status = 204;
  }

  async login(ctx){
    ctx.verifyParams({
      name:{type:'string',required:true},
      password:{type:'string',required:true}
    });
    const user  = await User.findOne(ctx.request.body);
    if(!user){ctx.throw(401,'用户名或密码不正确')}
    const {_id,name} = user;
    const token = jsonwebtoken.sign({_id,name},secret,{expiresIn:'1d'});
    ctx.body = {token};

  }


}

module.exports = new UserCtl();
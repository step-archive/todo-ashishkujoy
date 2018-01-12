let request = require('./requestSimulator.js');
let app = require('../app.js');
let th = require('./testHelpers.js');


describe('app',function(){
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        th.status_is_not_found(res);
        done();
      })
    })
  })
  describe('GET /',()=>{
    it('redirects to index.html',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.should_be_redirected_to(res,'/index.html');
        th.body_contains(res,'');
        done();
      })
    })
  })
  describe('GET /index.html',()=>{
    it('gives the index page',(done)=>{
      request(app,{method:'GET',url:'/index.html'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Welcome To ToDo App');
        done();
      })
    })
  })
  describe('GET /userpage',()=>{
    it('should redirect to login page if user is not logged in',function(done){
      request(app,{method:'GET',url:'/userpage',cookies:{}},res=>{
        th.should_be_redirected_to(res,'/login.html');
        done();
      })
    })
    it('give the userpage',(done)=>{
      request(app,{method:'GET',url:'/userpage',headers:{cookie:"sessionid=123456"}},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'user page');
        done();
      })
    })
  })
  describe('POST /login',()=>{
    it('should redirect to userpage',function(done){
      request(app,{method:'POST',url:'/login',body:'username=ashish'},res=>{
        th.should_be_redirected_to(res,'/userpage');
        done();
      })
    })
  })
})

var models = require('../models');
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');


router.get('/', function (req, res, next) {
  res.send("cool");
  });


  router.post('/post', function (req, res, next) {
  console.log("........",req.body.postDescription)
    return models.post.create({
      userId:req.body.userId,//check it name        +++done
      title: req.body.title,
      titleDescription: req.body.titleDescription,
      subDomain: req.body.subDomain,
      readTime: req.body.readTime,
      postDescription: req.body.postDescription,
      tag:req.body.tag//tag         +++done
  
    }).then(p => (res.send(p)));
  });

router.put('/posts/:postID', function (req, res, next) {

  models.post.update({                        //mapping of request data to data in database
    title: req.body.title,
    title_des: req.body.titleDescription,
    auth_name: req.body.authorName,
    sub_domain: req.body.subDomain,
    date_created: req.body.dateCreated,
    read_times: req.body.readTime,
    post_des: req.body.postDescription,
    image: req.body.image

  }, { where: { id: req.params.postID } })  //select which row to update
    .then((record) => {
      models.post.findAll({
        where: { id: req.params.postID }
      }).then((result) => res.json(result))
    });
});    //remove this



router.delete('/posts/:postID', function (req, res, next) {
 const id = req.params.postID
 models.post.findAll({
  where: { id: req.params.postID }
}).then((result) => { models.post.destroy({where: { id: req.params.postID }});res.json(result)})

});// no need


router.get('/posts/:postID', function (req, res, next) {

  models.post.findAll({
    where: { id: req.params.postID },
    
    include : [models.user]
    
  }).then((result) => res.json({data:result[0]}))
});//add data key prefix                        +++done

//query all posts
router.get('/posts', function (req, res, next) {
  
  models.post.findAll({
    order:[['id','DESC']],
    include: [ models.user ]
  }).then((result) => res.json({data:result}))
});

//query with tags                   
router.get('/posts/tags/:tag', function (req, res, next) {
  console.log(">>>>>>>>>><<<<<<<<<",req.params.tag)
  models.post.findAll({
    order:[['id','DESC']],
    include: [ models.user ],where:{
      
      tag:req.params.tag
    }
  }).then((result) => res.json({data:result}))
});//change to tag + add data key prefix                  +++done

router.post('/posts/:postID/comment', function (req, res, next) {

  return models.comment.create({
      
    postId: req.params.postID,
    userId: req.body.userId,
    commentData: req.body.commentData,
    commentBy: req.body.commentBy,
    

  }).then(p => (res.send(p)));
});

router.patch('/posts/:postID/comments/:commentID', function (req, res, next) {
  
  models.comment.update({                        //mapping of request data to data in database
  
    post_id: req.params.postID,
    comment_data: req.body.commentData,
    comment_date: req.body.commentDate,
    comment_by: req.body.commentBy,
    image: req.body.image

  }, { where: { id: req.params.commentID ,post_id:req.params.postID} })  //select which row to update
    .then((record) => {
      models.comment.findAll({
        where: { id: req.params.commentID ,post_id:req.params.postID}
      }).then((result) => res.json(result))
    });

});//no need
router.delete('/posts/:postID/comments/:commentID', function (req, res, next) {
  const id = req.params.postID
 models.comment.findAll({
  where: { id: req.params.commentID ,post_id:req.params.postID}
}).then((result) => { models.comment.destroy({ where: { id: req.params.commentID ,post_id:req.params.postID}});res.json(result)})

});// no need

router.get('/posts/:postID/comments', function (req, res, next) {
  
  models.comment.findAll({
    include: [models.user],
    order:[['id','DESC']],
    where: {postId:req.params.postID}
  }).then((result) => res.json({data:result}))

});// add data key prefix             +++done

//signup
router.post("/signup",function(req,res,next){
  models.user.create({
    userName:req.body.userName,
    email:req.body.email,
    password:req.body.password,
    image:req.body.image
  }).then(data=>(res.send(data)));
});

//signin
router.post("/signin",function(req,res,next){
  console.log('.............')
  models.user.findAll({
   where:{ email:req.body.email,
    password:req.body.password}
  }).then(p=>(res.send(p)));
});

//auth
router.post("/auth",function(req,res,next){
  res.cookie('token','...',{httpOnly:true}).sendStatus(200);
})

module.exports = router;

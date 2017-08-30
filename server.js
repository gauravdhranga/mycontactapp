var express = require('express');
var app = express();
var session = require('express-session');
var mongojs = require('mongojs');
var db = mongojs('mycontact',['contactlist','login']);
var bodyparser = require('body-parser');

app.use(express.static(__dirname + "/dist"));
app.use(bodyparser.json());

app.use(session({secret: 'ssshhhhh'}));
var sess = null;
var data;


app.get('/mycontactapp',function(req, res){
  console.log("i received get request");
  if (sess==null){
    res.json({flag:false});
  } else {

    db.contactlist.find({username: sess.username}, function (err, docs) {
      console.log(docs);
      res.json({flag:true,doc:docs});
    });
  }
});
app.post('/mycontactapp',function(req, res){
  console.log(req.body);
  if(sess != null) {
    console.log(sess);
  }else{
    console.log('session is not initialised');
  }
  data = req.body;
  data.username = sess.username;
  db.contactlist.insert(data,function(err,doc){
    res.json(doc);
  });
  });

app.post('/signup',function(req, res){
  console.log(req.body);

  db.login.insert(req.body,function(err,doc){
    res.json(doc);
  });
});

app.post('/logindata',function(req, res){

  db.login.findOne({username:req.body.username,password:req.body.password},function(err,docs){
    if(err || !docs) {
      res.json({flag:false});
    }
    else{
      sess = req.session;
      sess.username = req.body.username;
      sess.firstname = docs.firstname;
      console.log(sess);
      res.json({flag:true, user: docs.firstname});
    }
  });

});
app.delete('/mycontactapp/:id', function(req, res){
  var id = req.params.id;
  console.log(id);

  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
    res.json(doc);
  });
});
app.get('/find/:id', function(req, res){
  var id = req.params.id;
  console.log(id);

  db.contactlist.find({_id: mongojs.ObjectId(id)}, function(err,doc){
    res.json(doc);
  });
});
app.get('/mycontactapp/:id', function(req, res){
  var id = req.params.id;
  console.log(id);

  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
    res.json(doc);
  });
});
app.get('/search/:name', function(req, res){
  var id = req.params.name;
  console.log(id);
  db.contactlist.find({name: {$regex: id,$options:"$i"},username:sess.username}, function(err,docs){
      console.log(docs);
      res.json(docs);
  });
});
app.put('/mycontactapp/:id', function(req, res){
  var id = req.params.id;
  console.log(req.body.name);

  db.contactlist.findAndModify({query:{_id: mongojs.ObjectId(id)},
    update: {$set:{name:req.body.name, email:req.body.email, contact:req.body.contact}},new:true}, function(err,doc){
    res.json(doc);
  });
});
app.get('/logout',function(req,res){

  req.session.destroy(function(err){
    if(err){
      console.log(err);
    }else{
      sess = null;
    }
  });
  res.json({name:'gaurav'});

});
app.use('*',function(req,res){
  res.sendFile('D:/testAngular/mycontactapp/dist/index.html');
})
app.listen(3000);
console.log("server running on port 3000");

var express = require('express');
var router = express.Router();
const passport =require('passport')
const Student = require("../models/userModel")
const upload = require('./mult')
passport.use(Student.createStrategy());
const path =require ('path')
const fs =require('fs');
const mailer = require('./nodemail.js');




function isLoggedin(req,res,next){
if (req.isAuthenticated()){
  return next()
}else{
  res.redirect('/')
}
}



/* GET home page. */
/* GET route. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "School" });
});

router.get("/loginerror", function (req, res, next) {
  res.render("loginerror", { title: "School" });
});
router.get("/register", function (req, res, next) {
  res.render("register", { title: "School" });
});

router.get("/home",isLoggedin, function (req, res, next) {
      res.render("home", { title: "School",user:req.user});
      // res.json(req.user)
      
     
});

router.get("/profile",isLoggedin, function (req, res, next) {
  res.render("profile", { title: "School" ,user:req.user});
});

router.get("/books",isLoggedin, function (req, res, next) {
  res.render("books", { title: "School" ,user:req.user});
});
router.get("/results",isLoggedin, function (req, res, next) {
      res.render("results", { title: "School" ,user:req.user});

});
router.get("/editprofile",isLoggedin, function (req, res, next) {
  res.render("editprofile", { title: "School" ,user:req.user });
});

router.get("/delete",isLoggedin, function (req, res, next) {
  res.render("delete");
});
router.get("/reset",isLoggedin, function (req, res, next) {
  res.render("reset", { title: "School" ,user:req.user });
});

router.get("/forgot", function (req, res, next) {
  res.render("forgot", { title: "School" });
});

router.get("/passwordreset/:id", function (req, res, next) {
  res.render("passwordreset", { title: "School",id:req.params.id });
});




router.get("/docs/:id",isLoggedin, function (req, res, next) {
  res.render("docs", { user:req.params.id });
});


router.get("/teacher/:id", function (req, res, next) {
  Student.findOne({username:req.params.id},(err, docs)=>{
    if (err){
      console.log(err);
  }else{
    console.log(docs)
      res.render('teacher', {title: "School", user: docs});
      }
  });
  })
  



router.get("/list", function (req, res, next) {

  Student.find({}, function(err, docs) {
    if (err){
        console.log(err);
    }else{
        res.render('list', {title: "School", data: docs});
        }
    });

});






router.get('/signout',isLoggedin, function(req, res, next) {
  req.logout(()=>{
    res.redirect('/')
  })
});

router.get('/deleteprofile',isLoggedin, function(req, res, next) {
  Student.findOneAndDelete({_id:req.user._id},(err, docs)=>{})
  res.redirect('/')
});


//-------------------------------------------
//POST
router.post('/register', function(req, res, next) {
  const { name, username, mother, father, email, classs, password } = req.body;
  Student.register({ name, username, mother, father, email, classs }, password)
  .then(()=>{res.redirect("/")})
  .catch((err)=>{console.log(err)
    res.json(req.body)
  })
});



router.post('/',passport.authenticate("local",{
  successRedirect:"/home",
  failureRedirect:"/loginerror"
}), function(req, res, next) {
 
});


// router.post("/edit",isLoggedin, function (req, res, next) {
//   upload(req, res, function (err) {


//     const updateStudent={
//       name:req.body.name,
//     username:req.body.username,
//     email:req.body.email,
//     mother:req.body.mother,
//     father:req.body.father,
//     classs:req.body.classs,
//     }
//       if (req.files['dp']){
//         if(req.user.dp !== "dummy.png"){
//      fs,unlinkSync(path.join(__dirname,"..","public","images",req.user.dp))
//         } 
//         // updateStudent.dp=req.files['dp'][0].filename;
//     }
// Student.findByIdAndUpdate(req.user._id,updateStudent).then
//       // console.log(req.files['dp'][0].filename)
//       res.redirect("/profile");
//   })
// });




router.post("/edit",isLoggedin, function (req, res, next) {

  let userId = req.user._id

  upload(req, res, function (err) {
    if (req.body.name){
      Student.findOneAndUpdate({_id:userId},{name:req.body.name},null,(err, docs)=>{})
    }
    if (req.body.username){
      Student.findOneAndUpdate({_id:userId},{username:req.body.username},null,(err, docs)=>{})
    }
        if (req.body.email){
      Student.findOneAndUpdate({_id:userId},{email:req.body.email},null,(err, docs)=>{})
    }
      if (req.body.mother){
      Student.findOneAndUpdate({_id:userId},{mother:req.body.mother},null,(err, docs)=>{})
    }
      if (req.body.father){
      Student.findOneAndUpdate({_id:userId},{father:req.body.father},null,(err, docs)=>{})
    }
    if (req.body.classs){
      Student.findOneAndUpdate({_id:userId},{classs:req.body.classs},null,(err, docs)=>{})
    } 

    if (req.files['dp']){
      if(req.user.dp!=='dummy.png'){
        fs.unlinkSync(path.join(__dirname,"..","public","images",req.user.dp))
      }
      Student.findOneAndUpdate({_id:userId},{dp:req.files['dp'][0].filename},null,(err, docs)=>{})
    } 
    if (req.files['adhar']){
      if(req.user.adhar!=='adhar.jpg'){
        fs.unlinkSync(path.join(__dirname,"..","public","images",req.user.adhar))
      }
      Student.findOneAndUpdate({_id:userId},{dp:req.files['adhar'][0].filename},null,(err, docs)=>{})
    }
      if (req.files['bank']){
      if(req.user.bank!=='bank.jpg'){
        fs.unlinkSync(path.join(__dirname,"..","public","images",req.user.bank))
      }
      Student.findOneAndUpdate({_id:userId},{dp:req.files['bank'][0].filename},null,(err, docs)=>{})
    } 
  })
        res.redirect("/profile")
});


router.post("/reset",isLoggedin, function (req, res, next) {
  Student.findById(req.user._id)
  .then((user)=>{
    user.changePassword(
      req.body.oldpass,req.body.newpass,
      (err)=>{ 
        if(err){
          return
          res.send(err)
        }else{
          res.redirect('/signout')
        }
      }
    )
  })
});

// router.post("/forgot", function (req, res, next) {
//   Student.findOne({email:req.body.email},(err, docs)=> {
//     if (err){
//         console.log(err)
//         res.send(err)
//     }else{
//       if(docs===null){
//         console.log(docs)
//         res.render("forgoterr", { title: "School" });
//       }else{
//         mailer(req.body.email,"Reset Password","http://localhost:3000/passwordreset")
//         console.log(docs)
//       }
      
//         // console.log("Original Doc : ",docs);
//     }
//   })
  
// });

router.post("/forgot", function (req, res, next) {
  Student.findOne({email:req.body.email}).then(student=>{
    if(!student){
      res.send("user not found")
    }
    student.token=1
    student.save()
    const pageUrl=req.protocol+
    "://"+
    req.get("host")+
    "/passwordreset/"+
    student._id;
    mailer(req.body.email,"Reset Password",pageUrl)
    res.send("mail sent")
  })
  
});


router.post("/passwordreset/:id", function (req, res, next) {

  if(req.body.newpass===req.body.conpass){

    Student.findById(req.params.id).then((student)=>{
      if(student.token==1){
        student.setPassword(req.body.conpass,(err)=>{
          if(err){
            res.send(err)
          }else{

            student.token=0
          student.save();
          res.redirect('/signout')
          } 
  })
      }else{
        res.send('invelid operation')
      }
    })
  }else{
    res.send('password mismatch')
  }
})



  
   
         
      

  

 





// router.post("/passwordreset/:id", function (req, res, next) {
// if(req.body.newpass===req.body.conpass){
//   Student.findById(req.params.id).then(user=>{
// user.setPassword(req.body.conpass,(err)=>{
//   if(err){
//     res.send(err)
//   }
// })
//   }).catch(err=>res.send(err))
// }
//   res.redirect('/')
// });


router.post("/teacher/:id", function (req, res, next) {
  if (req.body.hindi){
    Student.findOneAndUpdate({username:req.params.id},{hindi:req.body.hindi},null,(err, docs)=>{})
  }
  if (req.body.english){
    Student.findOneAndUpdate({username:req.params.id},{english:req.body.english},null,(err, docs)=>{})
  }
  if (req.body.maths){
    Student.findOneAndUpdate({username:req.params.id},{maths:req.body.maths},null,(err, docs)=>{})
  }
  if (req.body.sanskrit){
    Student.findOneAndUpdate({username:req.params.id},{sanskrit:req.body.sanskrit},null,(err, docs)=>{})
  }
  if (req.body.science){
    Student.findOneAndUpdate({username:req.params.id},{science:req.body.science},null,(err, docs)=>{})
  }
  if (req.body.sostd){
    Student.findOneAndUpdate({username:req.params.id},{sostd:req.body.sostd},null,(err, docs)=>{})
  }
  if (req.body.parent){
    Student.findOne({username:req.params.id},null,(err, docs)=>{

      mailer(docs.email,"Student update",req.body.parent)
    })
  }
res.redirect(`/teacher/${req.params.id}`) 
  })


module.exports = router;

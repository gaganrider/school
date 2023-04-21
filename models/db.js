const mongoose = require("mongoose")
mongoose.set('strictQuery', false);


try{
    mongoose.connect("mongodb://localhost:27017/student")
    // mongoose.connect('mongodb+srv://gaganrider:gagan12345@cluster0.fdmwvpi.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>{
        console.log("connected to database")
  
    })
}
catch(err){
    console.log(err)
}


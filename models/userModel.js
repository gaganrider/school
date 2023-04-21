const mongoose = require ("mongoose");
const plm= require("passport-local-mongoose");

const studentSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    mother:{
        type:String,
        require:true,
    },
    father:{
        type:String,
        require:true,
    },
    classs:{
        type:Number,
        require:true,
    },
    dp:{
        type:String,
        default:"dummy.png"
    },
    password:{
        type:String,
        require:true,
    },
    adhar:{
        type:String,
        default:"adhar.jpg"
    },
    bank:{
        type:String,
        default:"bank.jpg"
    },
    hindi:{
        type:Number,
        default:0,
    },
    english:{
        type:Number,
        default:0,
    },
    maths:{
       type:Number,
        default:0,
    },
    science:{
        type:Number,
        default:0,
    },
    sostd:{
        type:Number,
        default:0,
    },
    sanskrit:{
        type:Number,
        default:0,
    },
    token:0
})
studentSchema.plugin(plm);
const Student = mongoose.model("Student",studentSchema)
module.exports = Student
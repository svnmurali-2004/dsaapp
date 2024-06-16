const mongoose=require("mongoose");
const questionSchema=new mongoose.Schema({
    // questions:{
    //     type:Array,
    //     required:true
    // },
    // sections:{
    //     type:Array,
    //     required:true
    // },
    // categories:{
    //     type:Array,
    //     required:true
    // },
    // totalquestions:{
    //     type:Number,
    //     required:true
    // }
},{strict:false})  
const questions=mongoose.model("questions",questionSchema,'questions');
module.exports =questions;
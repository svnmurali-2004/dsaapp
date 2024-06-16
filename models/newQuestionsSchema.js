const mongoose = require('mongoose');
const newQuestionsSchema = new mongoose.Schema({
    
        "_id":{
            type:Number,
            required:true
        },
        "title": {
            type:String,
            required:true
        },
        "qlink":{
            type:String,
            required:true
        },
        "sollink": {
            type:String,
            required:true
        },
        
        "difficulty": {
            type:String,
            required:true
        },
        "description":{
            type:String,
            required:true
        },
        
      
}, { strict: false });

const newQuestions = mongoose.model('newQuestions', newQuestionsSchema, 'newQuestions');
module.exports = newQuestions;
const mongoose=require('mongoose');
const { title } = require('process');

const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    roasts:[{
        type:String,
        trim:true,
    }]
}, {timestamps:true});

module.exports=mongoose.model('Movie',movieSchema);
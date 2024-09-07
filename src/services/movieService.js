const Movie = require('../models/Movie');
const { authSchema } =require('../models/auth.models')
const Joi=require('joi');
const bcrypt=require('bcrypt');

exports.getAllMovies=async()=>{
    return await Movie.find();
};

exports.creatMovie=async(movieData)=>{
    const movie=new Movie(movieData);
    return await movie.save();
};

exports.getMovieById=async(id)=>{
    return await Movie.findById(id);
};

exports.addRoast=async(id,roast)=>{
    const movie=await Movie.findById(id);
    if(!movie) return null;
    movie.roasts.push(roast);
    return await movie.save();    
};


exports.validateUser = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
            'any.only': 'Passwords do not match',
        }),
    });
    return schema.validate(data);
};

// module.exports=validateUser;
// User registration function
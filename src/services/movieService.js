const Movie = require('../models/Movie');

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
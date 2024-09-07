const movieService = require('../services/movieService')


exports.getAllMovies=async(req,res)=>{
  try{
    const movies = await movieService.getAllMovies();
    res.json(movies);
  }catch(error){
    res.status(500).json({message:error.message});
  }
};

exports.createMovie=async (req,res)=>{
  try {
    const movie=await movieService.creatMovie(req.body);
    res.json(movie)
  }catch(error){
    res.status(400).json({message:error.message});
  }
};

exports.addRoast=async(req,res)=>{
  try{
    const movie=await movieService.addRoast(req.params.id,req.body.roast);
    if(!movie){
      return res.status(404).json({message:'Movie not found'});
    }
    res.json(movie);
  }catch(error){
    res.status(500).json({message:error.message});
  }
};

exports.getMovieById=async(req,res)=>{
  try{
    const movie= movieService.getMovieById(req.params.id);
    if(!movie){
      return res.status(404).json({message:'Movie not found'});
    }
    res.json(movie);
  }catch(error){
    res.status(500).json({ message: error.message });
  }
};

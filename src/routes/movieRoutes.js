const express=require('express');
const router=express.Router();
const movieController=require('../controllers/movieController');


router.get('/',movieController.getAllMovies);
router.post('/',movieController.createMovie);
router.get('/:id',movieController.getMovieById);
router.post('/:id/roast',movieController.addRoast);

module.exports=router;
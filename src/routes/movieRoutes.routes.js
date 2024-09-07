const express=require('express');
const router=express.Router();
const movieController=require('../controllers/movieController');
const authController=require('../controllers/authController');


router.get('/',movieController.getAllMovies);
router.post('/',movieController.createMovie);
router.get('/:id',movieController.getMovieById);
router.post('/:id/roast',movieController.addRoast);
router.post('/register',authController.register);
router.post('/login',authController.login);

module.exports=router;
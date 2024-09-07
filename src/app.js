const express=require('express');
const cors=require('cors');
const helmet=require('helmet');
const connectDB=require('./config/database');
const movieRoutes=require('./routes/movieRoutes');

const app=express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json())


// Routes
app.use('/api/movie',movieRoutes);

// Error handling middleware
app.use((err,res,req,next)=>{
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

module.exports=app;
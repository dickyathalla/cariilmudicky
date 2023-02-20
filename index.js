require('dotenv').config()
const express =require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const usersRouter=require('./router/usersRouter.js')
const adminRouter=require('./router/adminRouter.js')
// const categoryRouter=require('./router/categoryRouter.js')
const app = express()
//getModel
const adminModels = require("./models/admin.js");

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
// index page
// app.get('/', function(req, res) {
//     var mascots = [
//         { name: 'Sammy', email: "sammy@gamil.com", password: 2012},
//         { name: 'Tux', email: "tux@gamil.com", password: 1996},
//         { name: 'Moby Dock', email: "moby@gamil.com", password: 2013}
//     ];
//     var tagline = "No programming concept is complete without a cute animal mascot.";

//     res.render('pages/index', {
//         mascots: mascots,
//         tagline: tagline
//     });
// });

// login page
// app.get('/login', function(req, res){
//     res.render('pages/login');
// });

// //register page
// app.get('/register', function(req, res){
//     res.render('pages/login');
// });

// about page
// app.get('/about', function(req, res) {
//     res.render('pages/about');
// });

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true})
const database=mongoose.connection;
try {
    app.use(cors());
    app.use(express.json());
    app.use(usersRouter);
    app.use(adminRouter);
    // app.use(categoryRouter);
    app.listen(process.env.PORT,()=>console.log("Server ready on port", process.env.PORT))
    database.once("open",()=>console.log("Database connected"))
} catch (error) {
    database.on("error",()=>console.log(error))
}



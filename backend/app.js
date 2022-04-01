const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts-routes');
const usersRoutes = require('./routes/users-routes')
const HttpError = require("./models/http-error");
const mongoUrl = 'mongodb+srv://mike:QNQAmcQp59F9qrrt@cluster0.93nvw.mongodb.net/newsappprod?retryWrites=true&w=majority'

const app = express();

// middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})

app.use('/api' , (req, res, next)=> {
    res.json({ message :'Welcome to awesome server !!!!'})
})


app.use('/api/posts' ,); // => /api/posts ....
// app.use('/api/users' ,); // => /api/users ....


// error case last rote !!!
app.use((error,req, res, next) => {
    if(res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message : error.message || 'Unknown error occurred'})
})

mongoose.
connect(mongoUrl).
then(()=>{
    app.listen(5000);
}).catch((err)=>{
    console.log(err);
})

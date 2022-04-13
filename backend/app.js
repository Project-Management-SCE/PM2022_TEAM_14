const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users-routes');
const postsRoutes = require('./routes/posts-routes');
const adminRoutes = require('./routes/admin-routes');
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

app.use('/api/posts' ,postsRoutes); // => /api/posts ....
app.use('/api/users' ,usersRoutes); // => /api/users ....
app.use('/api/admin', adminRoutes); // => /api/admin ....

// error for unsupported routes
app.use((req, res, next)=>{
    const error = new HttpError('Could not find this route', 401)
    next(error)
})


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

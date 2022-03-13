const express = require('express');
const bodyParser = require("body-parser");


const app = express();

// middleware
app.use(bodyParser.json());


app.use('/api' , (req, res, next)=> {
    res.json({ message :'Welcome to awesome server !!!!'})
})

//
// app.use('/api/posts' ,); // => /api/posts ....
// app.use('/api/users' ,); // => /api/users ....

app.listen(5000);

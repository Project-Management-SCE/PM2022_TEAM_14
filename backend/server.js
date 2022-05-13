const mongoose = require("mongoose");
const app = require("./app");
const mongoUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.93nvw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

open = async () => {
        mongoose.
        connect(mongoUrl).
        then(()=>{
            app.listen(5000);
        }).catch((err)=>{
            console.log(err);
        })
}

close = async () => {
    await mongoose.connection.close()
}

open()

exports.close = close
exports.open = open
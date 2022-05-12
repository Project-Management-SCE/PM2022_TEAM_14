const mongoose = require("mongoose");
const app = require("./app");
const mongoUrl = 'mongodb+srv://mike:QNQAmcQp59F9qrrt@cluster0.93nvw.mongodb.net/newsappprod?retryWrites=true&w=majority'

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
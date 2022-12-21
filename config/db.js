const mongoose = require("mongoose");

const connectDb = async() => {

    try {
        
        mongoose.connect( process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("MongoDB connected");

    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDb; 
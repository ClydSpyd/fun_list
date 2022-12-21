const mongoose = require("mongoose");

const connectDb = async() => {
    console.log('testing')
    console.log(process.env.TEST_STRING)
    try {
        
        console.log(process.env.MONGO_URI)
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
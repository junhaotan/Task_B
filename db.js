const mongoose = require('mongoose');

module.exports = async function connection() {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        await mongoose.connect("mongodb+srv://admin:admin@cluster0.vl3kf.mongodb.net/test", connectionParams);

        console.log("Connected to User Account MongoDB");
    } catch (error) {
        console.log(error, "Could not connect to User Account MongoDB");
    }
};
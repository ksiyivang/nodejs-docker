const express = require("express");
const mongoose = require("mongoose")
const app = express();

const { MONGO_IP, MONGO_PASSWORD, MONGO_USERNAME, MONGO_PORT } = require("./config/config")
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    // autoIndex: false, // Don't build indexes
    // poolSize: 10, // Maintain up to 10 socket connections
    // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    // family: 4 // Use IPv4, skip trying IPv6
};

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}?authSource=admin`

mongoose.connect(url, options)
    .then(() => {
        console.log("successfully connect to mongdDB...at ")
    })
    .catch((err) => {
        console.log("Error cann't connect to mongoDB...at ", err)
    })

app.get("/", (req, res) => {
    res.send("<h2>Hi, There.</h2>")
})


const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`listening on port ${port}`))
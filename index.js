const express = require("express");
const mongoose = require("mongoose")
const app = express();

const { MONGO_IP, MONGO_PASSWORD, MONGO_USERNAME, MONGO_PORT } = require("./config/config")
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}?authSource=admin`

const connectWithRetry = () => {
    mongoose.connect(url, options)
        .then(() => {
            console.log("successfully connect to mongdDB...at ")
        })
        .catch((err) => {
            console.log("Error cann't connect to mongoDB...at ", err)
            setTimeout(connectWithRetry, 5000)
        })
}

connectWithRetry();

app.get("/", (req, res) => {
    res.send("<h2>Hi, There.</h2>")
})


const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`listening on port ${port}`))
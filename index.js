const express = require("express");
const mongoose = require("mongoose")
const { MONGO_IP, MONGO_PASSWORD, MONGO_USERNAME, MONGO_PORT, REDIS_URL, SESSION_SECRET, REDIS_PORT } = require("./config/config");

const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")
const redis = require("redis")
const session = require("express-session");


let RedisStore = require("connect-redis")(session)
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

const app = express();

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}?authSource=admin`

// ensure retry Mongodb connection 
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

// redis db
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 60000
    }
}))

// express
app.use(express.json())


// localhost:8000/api/v1/posts

app.get("/", (req, res) => {
    res.send("<h2>Hi, There.</h2>")
})

app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`listening on port ${port}`))
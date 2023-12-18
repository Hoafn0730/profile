const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');

const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;
const RedisStore = connectRedis.default;
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379,
});
redisClient.connect().catch(console.error);

app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Store data in redis
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: 'secret$%^134',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // if true only transmit cookie over https
            httpOnly: false, // if true prevent client side JS from reading the cookie
            maxAge: 1000 * 60 * 10, // session max age in miliseconds
        },
    }),
);

routes(app);

app.listen(port, () => {
    console.log(`Example app listening on port: http://localhost:${port}`);
});

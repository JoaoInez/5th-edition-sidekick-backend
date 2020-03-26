const express = require("express");
const { v4: uuidv4 } = require("uuid");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient();
const passport = require("./passport");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 3001;
const routes = require("./routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    genid: () => {
      return uuidv4();
    },
    store: new RedisStore({ client: redisClient }),
    secret: "secret",
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);

mongoose.connect("mongodb://localhost/fes", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

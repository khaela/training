const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 9056;
const config = require('./config/config');
const dbcontext = require('./services/db.context');

//Routes
const StoreRouter = require('./route/store.route');
const StoreController = require('./controllers/store.controller');
const UserRouter = require('./route/user.route');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routing
app.use(StoreRouter);
app.use(UserRouter);
//app.use(StoreController);


//Aunthentication
config.authenticate()
.then(() =>  {
    config.sync ({ force: process.env.RESET || false});
    console.log("Connected to Database");
})
.catch ((err) =>  {
    console.log(err);
} )

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Connected to PORT ${port}`);
});

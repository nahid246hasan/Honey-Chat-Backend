const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const { cookie } = require('express-validator');
const {notFoundHandler, errorHandler}=require('./middlewares/common/errorHandler');
const loginRouter=require('./router/loginRouter');
const inboxRouter=require('./router/inboxRouter');
const usersRouter=require('./router/usersRouter');


dotenv.config();

//Database Connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {}).then(() => {
    console.log('DB Connected');
}).catch((err) => {
    console.log(err.message);
});

//request parser
app.use(express.json());

//set static folder


//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//Routing setup
app.use('/',loginRouter);
app.use('/users',usersRouter);
app.use('/inbox',inboxRouter);

//404 not found error handling
app.use(notFoundHandler); 

//common error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})
const express=require('express');
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dotenv=require('dotenv');
dotenv.config();

const cookieParser=require('cookie-parser');
app.use(cookieParser());

const connectToDb=require('./config/mongodb.config');
connectToDb();

const {connectDb}=require('./config/mysqldb.config');
connectDb();

//creating tables only once when new table is created or schema is changed
require('./models/teacher.table');
const create=require('./config/create.table');
create();

const apiRoutes=require('./routes/api.routes');
app.use('/api',apiRoutes);
const uiRoutes=require('./routes/ui.routes');
app.use('/',uiRoutes);

app.set('view engine', 'ejs');

app.use(express.static("public"));


app.listen(3000,()=>{
    console.log("server running at 3000 port");
})
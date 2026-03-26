const express=require('express');
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dotenv=require('dotenv');
dotenv.config();


const apiRoutes=require('./routes/api.routes');
app.use('/api',apiRoutes);
const uiRoutes=require('./routes/ui.routes');
app.use('/',uiRoutes);

app.set('view engine', 'ejs');



app.listen(3000,()=>{
    console.log("server running at 3000 port");
})
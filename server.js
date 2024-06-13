const express = require('express')
const app = express()

const db=require('./db');

const bodyParser=require('body-parser');
app.use(bodyParser.json());/*body parser first extract body data in json format,
then convert it into object,then store into req.body*/


const MenuItem=require('./models/MenuItem');
app.get('/', function (req, res) {
  res.send('Hello World')
})



//Import the router file
const personRoute=require('./routes/personRoutes');
const menuItemRoutes=require('./routes/menuitemRoutes');
//use the routes
app.use('/person',personRoute);
app.use('/menu',menuItemRoutes);

app.listen(3000,()=>{
  console.log('listening on port 3000');
})
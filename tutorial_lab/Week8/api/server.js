//const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
global.Vocab = require('./models/VocabModel.js');
const routes = require('./routes/VocabRoutes.js');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://jimmyson2004:pason0175@pason.qogx3.mongodb.net/?retryWrites=true&w=majority&appName=Pason',{useNewUrlParser: true});
const port = process.env.PORT || 3000;
const app = express();  
app.use(cors());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());
routes(app);
app.listen(port);
app.use((req,res)=>{
    res.status(404).send({url: `${req.originalUrl} not found`});
});
console.log('server started on port: ' + port);




app.get('/',(req, res)=>{res.send('hello world pason.web3!')});
 


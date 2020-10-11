const express=require("express")
const bodyParser=require('body-parser')
const path = require('path');

const rootDir= require('./util/path');
const prescription=require('./router/prescription')
const app=express();
app.set('view engine','ejs')
app.set('views','views')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir,'public')))

app.use(prescription)

app.use((req, res, next)=>{
    res.status(404).send('<h2>Page not found</h2>')
})

app.listen(3000);
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true,useUnifiedTopology: true});
const port = 8000;
function func1(){
   return new Promise(function (resolve,reject){
      setTimeout(()=>{
         const error = false;
         if(!error){
            console.log('your promise has been resolved')
            resolve();
         }
         else{
            console.log('your promise has not been resolved')
            reject('sorry not fulfillded');
         }
      },2000);
   })
}

var contactSchema = new mongoose.Schema({
   name: String,
   phone: String,
   email: String,
   address: String,
   desc: String
 });

var Contact = mongoose.model('Contact', contactSchema);

app.use('/static',express.static('static'));
app.use(express.urlencoded())
app.set('view engine','pug');

app.set('views',path.join(__dirname,'views'));

app.get('/', (req,res)=>{
   res.status(200).render('home.pug');
});

app.get('/contact', (req,res)=>{
   res.status(200).render('contact.pug');
});
 app.post("/contact",(req,res)=>{
    var myData = new Contact(req.body)
    myData.save(()=> {
      
     }) 
 
    func1().then(function(){
          res.send("this item has been saved to database");
    }).catch(function(error){
          res.status(400).send("this item was not saved to database")
    });
   
 })
 
 
app.listen(port,()=>{

    console.log(`the enable port name is ${port}`);
})
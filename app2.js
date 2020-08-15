const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/mihir', {useNewUrlParser: true,useUnifiedTopology: true});
const port = 3000;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("we are connected") // we're connected!
});

const kittySchema = new mongoose.Schema({
   name: String,
   phone: String,
   email: String,
   address: String,
   desc: String
 });

 kittySchema.methods.speak = function () {
   const greeting ="My name is "+ this.name
   console.log(greeting);
 }

 const Kitten = mongoose.model('mihirkitty', kittySchema);

const mihirkitty = new Kitten({ name: 'mihirkitty' });
//console.log(mihirkitty.name); 
//mihirkitty.speak();

mihirkitty.save(function (err, mihirkitty) {
    if (err) return console.error(err);
    mihirkitty.speak();
  });
  Kitten.find({ name:"mihirkitty"},function (err, kittens ) {
    if (err) return console.error(err);
    console.log(kittens);
  })
  app.get('/', (req,res)=>{
    res.status(200).render('home.pug');
 });
 app.post('/contact',(req,res)=>{
  res.status(200).render('contact.pug');
  res.send("this item has been saved to database");
 })
 app.listen(port,()=>{

    console.log(`the enable port name is ${port}`);
})
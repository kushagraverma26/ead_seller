const express = require('express');
var mongoose = require('mongoose');
bodyParser = require('body-parser');
const app = express();
const port = 3000;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


var authRoutes = require('./routes/auth');
var postingRoutes = require('./routes/postings');




app.use((req,res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });



app.get("/",(req,res)=>{
  res.send("<h1>EAD Home</h1>")
})

app.use("/auth",authRoutes);
app.use("/postings",postingRoutes);


mongoose.connect("mongodb+srv://kushagra:kushagra@eadseller-qpo9h.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("DB connection successful")
  app.listen(port, () => console.log(` app listening on port ${port}!`))

});

module.exports = app
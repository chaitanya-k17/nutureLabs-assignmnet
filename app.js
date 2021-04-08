const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const UserModel = require('./model/userModel');
const advisorModel = require('./model/advisorModel');
require('dotenv').config()



//-----------MONGO DB ---------------------------------------------
const mongoosePass=process.env.MDBpswd;

const URI ='mongodb+srv://blogAdmin:'+mongoosePass+'@blogdata.cdg5g.mongodb.net/nurture-data?retryWrites=true'
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;


require('./authentication/authentication');
const route = require('./routes/route');
const routeAdvisor = require('./routes/route-advisor');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', route);
app.use('/admin', routeAdvisor);

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 404);
  res.json({ error: err });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('-------------------Wellcome NurtureLabs..... Server starts ----------')
});
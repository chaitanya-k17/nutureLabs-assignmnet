const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const Mschema = mongoose.Schema;


//------User Schema---------------------

const UserSchema = new Mschema({
  name:{
  	type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bookings:[
	  {
	  	bookingtime:String,
	  	advisorID: String
	  }
  ]

});


const UserModel = mongoose.model('nurture_user', UserSchema);


module.exports = UserModel;
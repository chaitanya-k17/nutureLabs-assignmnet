const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const Mschema = mongoose.Schema;

const AdvisorSchema = new Mschema({
  Advisorname:{
  	type: String,
    required: true,
  },
  photoURL: {
    type: String,
    required: true,
  }
});


const AdvisorModel = mongoose.model('nurture_advisor', AdvisorSchema);

module.exports = AdvisorModel;
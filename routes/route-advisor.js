const express = require('express');
const bodyParser=require("body-parser");

const AdvisorModel = require('../model/advisorModel');



const router = express.Router();


router.post(
  '/advisor',
  async (req, res, next) => {

  	    const Advisor = req.body.advisorName; 
    	const photoURL=req.body.photoURL;
    	console.log("okaytill here");
        
       newAdvisor = new AdvisorModel({
 		Advisorname:Advisor,
 		photoURL:photoURL, 	    
 	    })

       newAdvisor.save(function(err){
       	 if(err){
       	 	  const error = new Error('An error occurred.');

            return next(error);
       	 }  
       });
    res.json();
  }
);

module.exports = router;
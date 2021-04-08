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
       	 	return next({status:400});
       	 }  
       });
    res.json();
  }
);

module.exports = router;
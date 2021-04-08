
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser=require("body-parser");

const UserModel = require('../model/userModel');
const advisorModel = require('../model/advisorModel');




const router = express.Router();


//---------------------------register route-------------------------------

router.post(
  '/register',
  passport.authenticate('register', { session: false }),
  async (req, res, next) => {
  	passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {

            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.json({ body,token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

///---------------------------login route------------------------

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
         try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.json({ body,token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);


///---------------------------adviser get route------------------------


router.get(
  '/:id/advisor',
  async (req, res, next) => {
	const id=req.params.id;

  	const user = await UserModel.findById(id);

  	if(!user){
      res.json()
  	}

  	const advisors=  await advisorModel.find({})
  	res.json({
  		advisors
  	})


  });

///---------------------------Booking a call route------------------------


router.post(
  '/:userid/advisor/:advisorid',
  async (req, res, next) => {
	const uid=req.params.userid;
	const aid=req.params.advisorid;
	const bookingdate=req.body.bookingTime


  	const user = await UserModel.findById(uid);

  	if(!user){
      const error = new Error('An error occurred.');

            return next(error);
  	}

  	const advisor = await advisorModel.findById(aid);

  	if(!advisor){
      const error = new Error('An error occurred.');

            return next(error);
  	}

    var newBooking={bookingtime:bookingdate,advisorID:aid};    

    const bookeduser = await UserModel.findByIdAndUpdate(uid,{ $push :{ bookings: newBooking }} ,function (error, success) {
        if (error) {
          const error = new Error('An error occurred.');

          return next(error);
        }    
    })

    res.json();

  });

//----------------------getting my booking lists-------------------------------------------

router.get(
  '/:id/advisor/booking',
  async (req, res, next) => {
  const id=req.params.id;

    const user = await UserModel.findById(id);


    if(!user){
      const error = new Error('An error occurred.');
      return next(error);
    };

    const mybookings=user.bookings;



    const result = []

        mybookings.forEach( async (booking,index)=>{

           const advisor =  await advisorModel.findById(booking.advisorID);


           result.push( {
              AdvisorName:advisor.Advisorname,
              AdvisorProfilePic:advisor.photoURL,
              AdvisorId:booking.advisorID,
              Bookingtime:booking.bookingtime,
              BookingId:booking.id
            });

          if(index==mybookings.length-1)
            res.json(result);       
        });



  });

module.exports = router;
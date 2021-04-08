const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../model/userModel');
const AdvisorModel = require('../model/advisorModel');


//-----------------------Authenticating and Saving the user----------------------


passport.use( 'register', new localStrategy (

    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req,email, password, done) => {
    	const name = req.body.name; 
    	const booking=[];
      try {
        const user = await UserModel.create({ name ,email, password ,booking });

        return done(null, user);

      } catch (error) {
        return done(error);
      }
    }
  )

);

//----------------------Catching the user and logging in----------------------------


passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email:email },function(err){
           if(err){
             return done(null, false, { status: 400 });
           }
        });

        if (!user) {
          return done(null, false, { status: 401 });
        }


        if (user.password!=password) {
          return done(null, false, { status: 401 });
        }

        return done(null, user, { status: "200_OK" });
      } catch (error) {
        return done(error);
      }
    }
  )
);


//------------------------------Authenticating the login-------------------------------

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
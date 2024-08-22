const {check, validationResult}=require('express-validator');
const createError=require('http-errors');
const User=require('../../models/people');
const path = require('path');
const { unlink } = require('fs');

const addUserValidator= [
    
    check("name")
    .isLength({min:3})
    .withMessage("Name must be at least 3 characters long")
    .isAlpha("en-US", {ignore: " -"})
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),

    check("email")
    .isEmail()
    .withMessage("Must be a valid email address")
    .trim()
    .custom(async(value)=>{
        try{
            const user=await User.findOne({email:value});
            if(user){
                throw new createError("Email already in use");
            }
        }catch(err){
            throw new createError(err.message);
        }
    }),

    check("mobile")
    .isMobilePhone("bn-BD",{strictMode: true})//strictMode is to give +8801 format
    .withMessage("Must be a valid Bangladeshi mobile number")
    .custom(async(value)=>{
        try{
            const user=await User.findOne({mobile:value});
            if(user){
                throw new createError("Mobile number already in use");
            }
        }catch(err){
            throw new createError(err.message);
        }
    }),
    check("password")
    .isStrongPassword()
    .withMessage("Must be a strong password with 8 characters long, one uppercase, one lowercase, one number and one special case character") 
];


const addUserValidatorHandler=(req,res,next)=>{
    const errors=validationResult(req);
    const mappedErrors=errors.mapped();

    if(Object.keys(mappedErrors).length===0){
        next();
    }else{
        
        if(req.files && req.files.length){
            const {filename}=req.files[0];
            unlink(
                path.join(__dirname,`../../assets/profilePhoto/avatars/${filename}`),
                (err)=>{
                    if(err){
                        console.log(err);
                    }
                }
            )
        }
        res.status(422).json({
            errors:mappedErrors
        });
    }
}

module.exports={
    addUserValidator,
    addUserValidatorHandler
}
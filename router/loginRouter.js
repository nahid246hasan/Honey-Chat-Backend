//external imports
const express=require('express');

//internal imports
const router=express.Router();
const {getLogin}=require('../controller/loginController');

//login page
router.get('/', getLogin); 

module.exports=router;
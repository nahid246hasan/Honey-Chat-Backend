//external imports
const express=require('express');

//internal imports
const router=express.Router();
const {getInbox}=require('../controller/inboxController');

//inbox page
router.get('/', getInbox); 

module.exports=router;
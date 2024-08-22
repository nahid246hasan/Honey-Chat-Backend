//external imports
const express=require('express');


//internal imports
const router=express.Router();
const {getUsers, addUser, removeUser}=require('../controller/usersController');
const avatarUploads=require('../middlewares/users/avatarUploads');
const {addUserValidator,addUserValidatorHandler} = require('../middlewares/users/userValidator');
//login page
router.get('/', getUsers); 

//add user 
router.post('/', 
    avatarUploads, 
    addUserValidator, 
    addUserValidatorHandler, 
    addUser
);

router.delete('/:id', removeUser);



module.exports=router;
const bcrypt=require('bcrypt');
const User=require('../models/people');
const { unlink } = require('fs');
const path = require("path");

//get users page
async function getUsers(req, res, next) {
    try{
        const users=await User.find();
        res.status(200).json({
            users
        });
    }catch(err){
        res.status(500).json({
            errors:{
                common:{
                    msg:"Unknown error occured!"
                }
            }
        });
    }
    
        
}

async function addUser(req, res, next) {
    let newUser;
    const hashedPassword=await bcrypt.hash(req.body.password, 10);

    if(req.files && req.files.length > 0){
        newUser=new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashedPassword,
            
        });
    }else{
        newUser=new User({
            ...req.body,
            password: hashedPassword
        })
    }
    console.log(newUser);
    try{
        console.log("hi");  
        const user=await newUser.save();
        console.log(user);
        res.status(200).json({
            message:"User added successfully",
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            errors:{
                common:{
                    msg:"Unknown error occured!"
                }
            }
        });
    }
}

async function removeUser(req, res, next) {
    try{
        const user=await User.findByIdAndDelete({_id:req.params.id});

        if(user.avatar){
            unlink(
                path.join(__dirname,`../../assets/profilePhoto/avatars/${user.avatar}`), 
                (err)=>{
                    if(err){
                        console.log(err);
                    }
                }
            )
        }

        res.status(200).json({
            message:"User deleted successfully",
        });
    }catch(err){
        res.status(500).json({
            errors:{
                common:{
                    msg:"Could not delete user"
                }
            }
        });
    }
} 

module.exports = {
    getUsers,
    addUser,
    removeUser
};
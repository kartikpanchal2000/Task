const User = require('../model/user');
const bycrpt= require('bcrypt');
// Render signin form
exports.renderSignupForm = (req, res) => {
    res.render('signup');
  };

//create a new userr-
exports.createUser= async(req, res) =>{
    try{   
        const spassword= await securedPassword(req.body.password,);
        const user= new User({            
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobileNo,            
            password:spassword 
        });    
        const data = await user.save();
        if(data)
        {
            //res.status(201).json(user);
            res.render('signup',{message:'Your Registration has been successfully'});
        }else{
            res.render('signup', {message:'Your Registration has been failed'});
        }   
    }
    catch(error) {
        res.status(400).json({ message: error.message });
    }

};
const securedPassword= async(password) =>{
    try{
        const passwordHash= await bycrpt.hash(password,10);
        return passwordHash;
    }
    catch(error)
    {
        console.log(error.messsage);
    }
}


//Login 
exports.renderLogin = (req, res) => {
    res.render('login');
};

exports.loginUser = async (req, res) => {

    try{
        const email= req.body.email;
        const password= req.body.password;
        const userData = await User.findOne({email:email, });

        if(userData)
        {            
            const passwordMatch = bycrpt.compare(password,userData.password);
            if(passwordMatch)
            {                   
                const userName = userData.name;
                //console.log(userName);
                res.redirect(`/home?name=${encodeURIComponent(userName)}`);
            }
            else{
                res.render('login',{message:'Email and Password is Incorrect'});
            }
        }else{
            res.render('login',{message:'Email and Password is Incorrect'});
        }
    }
    catch(error){
        console.log(error.message);}    
};


//home
exports.renderHome = async(req, res) => {
    const userName = req.query.name; 
    res.render('home', { userName }); 
};

//get all users
exports.getAllUsers = async(req, res) =>{
    try{
        const users = await User.find();        
        res.json(users);
    }
    catch(error) {
        res.status(500).json({ message: error.message });
    }
};

// get user by Id:
exports.getUserById = async(req, res) =>{
    try{
        const user = await User.findById(req.params.id);
        if(user){
            res.json(user);
        }
        else{
            res.status(404).json({ message: 'User not Found' });
        }
    }
    catch(error) {
        res.status(500).json({ message: error.message });
    }
};

//Update User
exports.updateUser = async(req, res) =>{
    try{
        const user= await User.findById(req.params.id);
        if(user){
            user.name= req.body.name || user.name;
            user.mobileNo= req.body.mobileNo || user.mobileNo;
            user.email = req.body.email || user.email;
            user.password = req.body.pasword || user.password;

            await user.save();
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch(error) {
        res.status(500).json({ message: error.message });
    }
};

//delete User
exports.deleteUser = async(req, res) =>{
    try{
        const user = await User.findById(req.params.id);
        if(user){
            await user.remove();
            res.json({ message: 'User deleted' });
        }
        else{
            res.status(404).json({ message: 'User not found' });
        }            
    }
    catch(error) {
        res.status(500).json({ message: error.message });
    }
};

// Search user by name
exports.searchUserByName = async( req,res) => {
    try {
        const name = req.params.name;
        const user = await User.find({ name: {$regex: name, $option: 'i'}});
        res.json(user);      
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Follow another user
exports.followUser = async (req, res) => {
    try {
        const userToFollowId = req.body.userToFollowId;
        const followerId = req.params.id;

        // Find the follower
        const follower = await User.findById(followerId);

        if (!follower) {
            return res.status(404).json({ message: 'Follower not found' });
        }

        // Check if the user is already following the userToFollowId
        if (follower.following.includes(userToFollowId)) {
            return res.status(400).json({ message: 'User is already following this user' });
        }

        // Add the userToFollowId to the follower's 'following' list
        follower.following.push(userToFollowId);

        // Save the follower's updated information to the database
        await follower.save();

        res.json({ message: 'User followed successfully' });
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

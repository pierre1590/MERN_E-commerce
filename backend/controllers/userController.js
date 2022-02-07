import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import generateGravatar from '../utils/generateGravatar.js';
import User from '../models/userModel.js';
import sendEmail from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';

// @desc Auth user & get token
// @route POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

  const user = await User.findOne({ email });

  if(user && (await user.matchPassword(password))){
    res.json({
     _id: user._id,
     name: user.name,
     email: user.email,
     avatar: user.avatar,
     isAdmin: user.isAdmin,
     isConfirmed: user.isConfirmed,
     token: generateToken(user._id,'access'),
    });
  }else if (!user){
    res.status(404).json({
      message: "User not found"
    });
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password') 
  }
})


// @desc Get user profile
// @route GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if(user){
    res.json({
     _id: user._id,
     name: user.name,
     email: user.email,
     avatar: user.avatar,
     isAdmin: user.isAdmin,
     isConfirmed: user.isConfirmed,
    });
  } else {
    res.status(401)
    throw new Error('User not found') 
  }
})



// @desc Register a new user 
// @route POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password } = req.body;

 const userExist = await User.findOne({ email });

  if(userExist){
    res.status(400)
    throw new Error('Email already registered') 
  }
 
  const avatar = generateGravatar(email);

  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });

  // if user was created successfully
  if(user){
    // send a mail for email confirmation 
    await sendEmail(user._id,email, 'email verification')

    res.status(201).json({
     _id: user._id,
     name: user.name,
     email: user.email,
     avatar,
     isAdmin: user.isAdmin,
     token: generateToken(user._id,'email'),
    });
  } else {
    res.status(400)
    throw new Error('Invalid user data') 
  }
})

// @desc Send email confirmation
// @route POST /api/users/confirm
// @access  Public
const sendEmailConfirmation = asyncHandler(async (req, res) => {
  try{
        const {email} = req.body;

        const user = await User.findOne({ email });

        if(user){
           if(!user.isConfirmed) {
              // send email
              await sendEmail(user._id,email, 'email verification');
              res.status(200).json({
                id: user._id,
                email: user.email,
                name: user.name,
                isAdmin: user.isAdmin,
                avatar: user.avatar,
                isConfirmed: user.isConfirmed,
           });
          } else {
            res.status(400)
            throw new Error('User already confirmed');
          }
      }
  } catch(err){
    res.status(401)
    throw new Error('Could not send email confirmation.Plese retry');
  }
})

// @desc Confirm the email address of the registered user
// @route GET /api/users/confirm
// @access PUBLIC

// Function confirmUser with try/catch
const confirmUser = asyncHandler(async (req, res) => {
  try {
    // set the user to a confirmed status, once the corresponding JWT is verified correctly
    const emailToken = req.params.token;
    const decodedToken = jwt.verify(emailToken, process.env.JWT_EMAIL_TOKEN_SECRET);
    const user = await User.findById(decodedToken.id).select("-password");
    user.isConfirmed = true;
    const updatedUser = await user.save();
    res.json({
      id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
      avatar: updatedUser.avatar,
      isConfirmed: updatedUser.isConfirmed,
      accessToken: generateToken(user._id, 'access'),
    });
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Not authorised. Token failed");
  }
});

// @desc Send a mail with the link to reset password
// @route POST /api/users/reset
// @access PUBLIC
const mailForPasswordReset = asyncHandler(async (req, res) => {
	try {
		const { email } = req.body;

		const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "Email not found. ",
      });
    } else if (!user.isConfirmed) {
      res.status(401).json({
        message: "Email not yet confirmed.",
      });
    }
   
		// send a link to reset password only if it's a confirmed account
		if (user && user.isConfirmed) {
			// send the mail and return the user details
      
			// the sendMail util function takes a 3rd argument to indicate what type of mail to send
			await sendEmail(user._id, email, 'forgot password');

			res.status(201).json({
				id: user._id,
				email: user.email,
				name: user.name,
				isAdmin: user.isAdmin,
				avatar: user.avatar,
				isConfirmed: user.isConfirmed,
			});
		} 
   
	} catch (error) {
		res.status(401);
		throw new Error('Could not send the mail. Please retry.');
	}

 
});

// @desc Reset password of any verified user
// @route PUT /api/users/reset
// @access PUBLIC
const userPasswordReset = asyncHandler(async (req, res) => {
	try {
		// update the user password if the jwt is verified successfully
		const { password } = req.body;
    const {passwordToken} = req.body;
		const decodedToken = jwt.verify(passwordToken, process.env.JWT_FORGOT_PASSWORD_TOKEN_SECRET);

		const user = await User.findById(decodedToken.id);
    
    
    
		if (user && password) {
			user.password = password;
			const updatedUser = await user.save();

			if (updatedUser) {
				res.status(200).json({
					id: updatedUser._id,
					email: updatedUser.email,
					name: updatedUser.name,
					avatar: updatedUser.avatar,
					isAdmin: updatedUser.isAdmin,
				});
			} else {
				res.status(401);
				throw new Error('Unable to update password. Please retry.');
			}
		}
	} catch (error) {
		res.status(400).json({message:'Reset link has expired. Please try again with a new password reset link.'});
		
	}
});



// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.avatar = req.body.avatar || user.avatar
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.status(200).json({
      _id: updatedUser._id,
      avatar: updatedUser.avatar,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isConfirmed: updatedUser.isConfirmed,
      token: generateToken(updatedUser._id,'access'),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Delete user
// @route DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    await user.remove()
    res.status(200).json({
      message: 'User deleted successfully'
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


// @desc Get all users
// @route GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

   res.status(200).json(users)
})


// @desc  Delete user
// @route DELETE /api/users/:id
// @access  Private/Admin
const userDelete = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if(user){
    await user.remove()
    res.status(200).json({
      message: 'User deleted successfully'})
  }else{
    res.status(404)
    throw new Error('User not found')
  }
})


// @desc Get user by ID
// @route GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if(user){
    res.status(200).json(user)
  }else{
    res.status(404)
    throw new Error('User not found')
  }
})


// @desc    Update user 
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
   user.isAdmin = req.body.isAdmin || user.isAdmin

    const updatedUser = await user.save()

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isConfirmed: updatedUser.isConfirmed,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})




export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    deleteUser,
    getUsers,
    userDelete,
    getUserById,
    updateUser,
    sendEmailConfirmation,
    confirmUser,
    mailForPasswordReset,
   userPasswordReset,
};
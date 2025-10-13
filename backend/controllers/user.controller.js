import User from "../models/user.modal.js"

export const registerUser = async(req, res) => {
  try {
    const { email, password } = req.body; 

    //1. Check for required fields
    if (!email || !password) {
      return res.status(400).json({success: false, message: 'Please provide email and password'})
    }

    //2. Check if user already exists
    const existingUser = await User.findOne({email}); 
    if (existingUser) {
      return res.status(400).json({success: false, message: 'Email is already in use'})
    }

    //3. Create a new user 
    const newUser = new User({ email, password }); 
    await newUser.save(); 

    //4. Send back a success response (w/o password)
    res.status(201).json({
      success: true, 
      data: {
        _id: newUser._id, 
        email: newUser.email, 
      }
    })

  } catch (error) {
    res.status(500).json({success: false, message: "Server Error"})
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; 

    //1. Find the user by email
    const user = await User.findOne({email})

    //2. Checks if users exists AND password match
    if (user && (await user.matchPassword(password))) {
      //more to do here

      res.json({
        success: true, 
        data: {
          _id: user._id, 
          email: user.email,
        }
      })
    } else {
      return res.status(400).json({success: false, message: "Incorrect password, please try again"})
    }
  } catch (error) {
    res.status(500).json({success: false, message: "Sever Error"})
  }

}
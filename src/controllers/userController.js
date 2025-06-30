const { StatusCodes } = require("http-status-codes");
const User = require("../model/UserModel");
const {
  BadRequestError,
  UnAuthorizedError,
} = require("../errors/ErrorClass");

const register = async (req, res) => {
    console.log("CHECKING BODY", req)
  const { username, email,  password } = req.body;

  console.log("REGISTER BODY", req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("User with this email already exists");
    }

    const user = await User.create({ username, email, password });
    const token = user.createToken();

    res.status(StatusCodes.CREATED).json({
      token,
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.name === "ValidationError") {
      const errorMessages = Object.values(error.errors).map(
        (err) => err.message
      );
      throw new BadRequestError(
        `Validation failed: ${errorMessages.join(", ")}`
      );
    }
    throw error;
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN BODY", req.body);

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthorizedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.isMatch(password);
  if (!isPasswordCorrect) {
    throw new UnAuthorizedError("Invalid credentials");
  }

  const token = user.createToken();

  console.log("USER TO LOG", user)

  res.status(StatusCodes.OK).json({
    token,
    _id: user._id,
    username: user.username,
    email: user.email,
  });
};



module.exports = {
  register,
  login,
};
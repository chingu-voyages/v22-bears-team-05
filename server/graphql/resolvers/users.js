const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserInputError } = require("apollo-server")

const User = require("../../models/User")
const { validateRegisterInput } = require("./../../utils/validateRegisterInput")
const SECRET_KEY = process.env.SECRET_KEY
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    SECRET_KEY,
    { expiresIn: "100d" }
  )
}

module.exports = {
  Query: {
    async login(_, { email, password }, context) {
      const errorMessage = "The username or password is invalid" //security best practice to not give too much information
      const errors = {}
      const user = await User.findOne({ email })
      if (!user) {
        //user does not exist
        errors.general = errorMessage
        throw new UserInputError(errorMessage, { errors })
      }
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = errorMessage
        throw new UserInputError(errorMessage, { errors })
      }
      const token = generateToken(user)

      // save userId to session!
      context.req.session.userId = user._id;

      return {
        id: user._id,
        token,
        email,
      }
    },
    async userList() {
      try {
        const userData = await User.find()
        const userList = userData.map((element) => {
          return { email: element.email }
        })
        return userList
      } catch (err) {
        throw new Error(err)
      }
    },
  },

  Mutation: {
    async register(_, { email, password, confirmPassword }, context) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        email,
        password,
        confirmPassword
      )
      if (!valid) {
        throw new UserInputError("Errors", { errors })
      }
      const user = await User.findOne({ email })
      if (user) {
        throw new UserInputError("Could not register user", {
          errors: {
            registration: "Could not register user",
          },
        })
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12)

      const newUser = new User({
        email,
        password,
        createdDate: new Date().toISOString(),
      })

      const res = await newUser.save()

      const token = generateToken(res)

      context.req.session.userId = res._id;

      return {
        id: res._id,
        token,
        email,
      }
    },
  },
}

const bcrypt = require("bcrypt")
const { UserInputError } = require("apollo-server")

const User = require("../../models/User")
const { validateRegisterInput } = require("./../../utils/validateRegisterInput")

module.exports = {
  Query: {
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
    async me(_, __, { req }) {
      if (!req.session.userId) {
        return null;
      }
      const user = await User.findById(req.session.userId);
      return user;
    }
  },

  Mutation: {
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
      // save userId to session!
      context.req.session.userId = user._id;

      return {
        id: user._id,
        email,
      }
    },
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
        throw new UserInputError("Email in use", {
          errors: {
            registration: "Email in use",
          },
        })
      }
      // hash password
      password = await bcrypt.hash(password, 12)

      const newUser = new User({
        email,
        password,
        createdDate: new Date().toISOString(),
      })

      const res = await newUser.save()

      context.req.session.userId = res._id;

      return {
        id: res._id,
        email,
      }
    },
  },
}

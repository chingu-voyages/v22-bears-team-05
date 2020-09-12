const bcrypt = require("bcrypt");
const { UserInputError } = require("apollo-server");

const User = require("../../models/User");
const {
  validateRegisterInput,
} = require("./../../utils/validateRegisterInput");
const { COOKIE_NAME } = require("../../constants");

module.exports = {
  Query: {
    async userList() {
      try {
        const userData = await User.find();
        const userList = userData.map((element) => {
          return { email: element.email };
        });
        return userList;
      } catch (err) {
        throw new Error(err);
      }
    },
    async me(_, __, { req }) {
      if (!req.session.userId) {
        return null;
      }
      const user = await User.findById(req.session.userId);
      return user;
    },
  },

  Mutation: {
    async login(_, { email, password }, context) {
      const errorMessage = "The username or password is invalid"; //security best practice to not give too much information
      const errors = {};

      // email should be lowercase
      email = email.toLowerCase();

      const user = await User.findOne({ email });
      if (!user) {
        //user does not exist
        errors.general = errorMessage;
        throw new UserInputError(errorMessage, { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = errorMessage;
        throw new UserInputError(errorMessage, { errors });
      }
      // save userId to session!
      context.req.session.userId = user._id;

      return {
        id: user._id,
        email,
      };
    },
    async register(_, { email, password, confirmPassword }, context) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        email,
        password,
        confirmPassword,
      );

      // email should be lowercase
      email = email.toLowerCase();

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError("Email in use", {
          errors: {
            registration: "Email in use",
          },
        });
      }
      // hash password
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        password,
        createdDate: new Date().toISOString(),
      });

      const res = await newUser.save();

      context.req.session.userId = res._id;

      return {
        id: res._id,
        email,
      };
    },
    async logout(_, __, context) {
      return new Promise((resolve) =>
        context.req.session.destroy((err) => {
          context.res.clearCookie(COOKIE_NAME);
          if (err) {
            console.log(err);
            resolve(false);
            return;
          }

          resolve(true);
        }),
      );
    },
    async updateSmallRewards(_, { smallRewards }, { req }) {
      if (!req.session.userId) {
        return null;
      }
      const user = await User.findById(req.session.userId);
      const updatedRewards = smallRewards.filter(
        (reward) => reward.trim().length > 0 && reward.length <= 30,
      );
      if (updatedRewards.length > 3)
        throw new Error("The maximum number of rewards in a table is 3.");
      user.smallRewards = updatedRewards;
      user.save();
      return user;
    },
    async updateMediumRewards(_, { mediumRewards }, { req }) {
      if (!req.session.userId) {
        return null;
      }
      const user = await User.findById(req.session.userId);
      const updatedRewards = mediumRewards.filter(
        (reward) => reward.trim().length > 0 && reward.length <= 30,
      );
      if (updatedRewards.length > 3)
        throw new Error("The maximum number of rewards in a table is 3.");
      user.mediumRewards = updatedRewards;
      user.save();
      return user;
    },
    async updateLargeRewards(_, { largeRewards }, { req }) {
      if (!req.session.userId) {
        return null;
      }
      const user = await User.findById(req.session.userId);
      const updatedRewards = largeRewards.filter(
        (reward) => reward.trim().length > 0 && reward.length <= 30,
      );
      if (updatedRewards.length > 3)
        throw new Error("The maximum number of rewards in a table is 3.");
      user.largeRewards = updatedRewards;
      user.save();
      return user;
    },
  },
};

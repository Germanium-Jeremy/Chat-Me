const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwt_create = async (userId) => {
     const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
     return token + ""
}

const register = async (req, res) => {
     const response = req.body
     try {
          if (response == null || response == undefined) return res.status(400).send({ message: "All fields are required" })

          let user = await UserModel.findOne({ email: response.email });
          if (user) return res.status(400).send({ message: "Email already exists!" })

          const salt = await bcrypt.genSalt(10);
          response.password = await bcrypt.hash(response.password, salt);

          const newUser = new UserModel(response);
          await newUser.save();

          const token = await jwt_create(newUser._id)

          res.status(201).send({
               id: newUser._id,
               username: newUser.username,
               email: newUser.email,
               token: token,
               message: "registration successfully",
          });
     } catch (error) {
          console.log(error.message);
          return res.status(500).send({ message: "Internal Server Error At Backend" });
     }
}

const login = async (req, res) => {
     try {
          const { email, password } = req.body
          if (email == "" || email == null || email == undefined) return res.status(400).send({ message: "No Email provided" });

          let user = await UserModel.findOne({ email: email });
          if (!user) return res.status(400).send({ message: "Wrong email" });

          const passMatch = await bcrypt.compare(password, user.password);
          if (!passMatch) return res.status(300).send({ message: "Password doesn't match" });

          const token = await jwt_create(user._id)

          res.status(201).send({
               id: user._id,
               username: user.username,
               email: user.email,
               token: token,
               message: "signin successfully",
          });
     } catch (error) {
          console.log("Error", error.message);
          return res.status(500).send({ message: "Internal Server Error At Backend" });
     }
}

const googleAuth = async (req, res) => {
     const data = req.body
     try {
          const email = data.data.email
          let user = await UserModel.findOne({ email: email });

          if (user) {
               const token = await jwt_create(user._id)

               return res.status(201).send({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    token: token,
                    message: "signin successfully",
               });
          } else {
               const googleRegisterData = await googleRegister(data.data)
               if (googleRegisterData.username) {
                    return res.status(201).send(googleRegisterData)
               } else {
                    return res.status(400).send({ message: "Registration Failed, Try Again", error: googleRegisterData })
               }
          }
     } catch (error) {
          console.log("Error", error.message);
          return res.status(500).send({ message: "Internal Server Error At Backend" });
     }
}

const googleRegister = async (user) => {
     const username = user.name
     const email = user.email
     let password = user.family_name

     try {
          const salt = await bcrypt.genSalt(10);
          password = await bcrypt.hash(password, salt);

          const newUser = new UserModel({ username, email, password });
          await newUser.save();

          const token = await jwt_create(newUser._id)

          return user = {
               id: newUser._id,
               username: newUser.username,
               email: newUser.email,
               token: token,
               message: "registration successfully",
          }
     } catch (error) {
          return error.message
     }
}

const allUsers = async (req, res) => {
     const { userId } = req.params
     try {
          const allUsers = await UserModel.find({ _id: { $ne: userId } });
          if (!allUsers) return res.status(400).send({ message: "No Users" });

          const filteredUsers = allUsers.map(user => {
               const { password, ...userWithoutPassword } = user.toObject();
               return userWithoutPassword;
          });


          return res.status(200).send(filteredUsers);
     } catch (error) {
          console.log(error.message);
          return res.status(500).send("Internal Server Error, Please Try Again");
     }
}

module.exports = { register, login, allUsers, googleAuth }
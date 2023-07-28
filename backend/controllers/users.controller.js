import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const register = (req, res) => {
  let { body } = req;
  bcrypt.hash(body.password, 10, (error, hash) => {
    let regData = { ...body };
    regData = {...regData, password: hash };
    const regUser = new User(regData);
    regUser.save()
      .then((result) => {
        res.status(201).json({
          created: result
        })
      }).catch((err) => {
        console.log("Error saving new user:", err);
        res.status(400).json({
          msg: "Wrong or missing data."
        });
      });
  });
}

export const login = (req, res) => {
  let { body } = req;
  if (!body.username || !body.password) {
    return res.status(400).json({
      msg: "Wrong or missing data."
    });
  }
  // find user by email
  User.find({ email: body.username })
    .then((result) => {
      const found = result[0];
      // not found
      if (!found) {
        return res.status(404).json({
          msg: "User does not exist."
        })
      }
      // check password
      bcrypt.compare(body.password, found.password, function(err, result) {
        if (err) {
          return res.status(500).json({
            msg: "Internal server error",
            err
          });
        }
        else {
          if (!result) {
            return res.status(401).json({
              msg: "Wrong or missing data."
            });
          }
          // generate jwt
          const payload = {
            id: found._id.toString()
          }
          const token = jwt.sign(payload, process.env.LOGIN_SECRET);
          return res.json({ token });
        }
      });
    }).catch((err) => {
      return res.status(500).json({
        msg: "Error getting user."
      });
    });
}


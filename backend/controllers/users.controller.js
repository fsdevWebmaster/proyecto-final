import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Role from '../models/role.model.js';

export const register = (req, res, next) => {
  let { body } = req;
  bcrypt.hash(body.password, 10, (error, hash) => {
    let regData = { ...body };
    regData = {...regData, password: hash };
    const regUser = new User(regData);
    regUser.save()
      .then((result) => {
        return res.status(201).json(result);
      }).catch((err) => {
        next(err);
      });
  });
}

export const login = (req, res, next) => {
  let { body } = req;
  if (!body.username || !body.password) {
    next(new Error("Missing data"))  
  }
  // find user by email
  User.find({ email: body.username })
    .then((result) => {
      const found = result[0];
      // not found
      if (!found) {
        next(new Error("Not found"))
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
      next(err)
      // return res.status(500).json({
      //   msg: "Error getting user."
      // });
    });
}

export const getProfile = (req, res, next) => {
  const { userId } = req.query
  if (!userId) {
    return res.status(404).json({ error: 'Missing user id.' })
  }

  User.findById(userId)
    .populate("roles")
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      next(err)
    });  
}

export const updateProfile = (req, res, next) => {
  const updData = { ...req.body }
  delete updData.password
  
  if (!updData.userId) {
    next(new Error('Missing data'))
  }

  if (Object.keys(updData).length <= 1) {
    next(new Error('Nothing to update'))
  }

  User.findByIdAndUpdate(updData.userId, updData, { returnOriginal: false })
  .then((result) => {
    if (!result) {
      next(new Error("Not found"))      
    }
    return res.json(result)
  }).catch((err) => {
    next(err)
  });
}
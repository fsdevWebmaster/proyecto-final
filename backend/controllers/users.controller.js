import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Role from '../models/role.model.js';
import { getToken } from '../utils/app.utils.js';

export const register = (req, res, next) => {
  let { body } = req;
  bcrypt.hash(body.password, 10, (error, hash) => {
    let regData = { ...body };
    regData = {...regData, password: hash };
    delete regData.rol
    delete regData.submit
    const regUser = new User(regData);
    regUser.save()
      .then((result) => {
        return res.json(result)
      }).catch((err) => {
        next(err);
      });
  });
}

export const login = async (req, res, next) => {
  let { body } = req;
  if (!body.username || !body.password) {
    next(new Error("Missing data"))  
  }
  
  // find user by email
  User.find({ email: body.username })
    .then((result) => {
      const userFound = result[0];
      // not found
      if (!userFound) {
        next(new Error("Not found"))
      }
      // check password
      bcrypt.compare(body.password, userFound.password, async function(err, result) {
        if (err) {
          next(new Error("Server error"))
        }
        else {
          if (!result) {
            next(new Error("Missing data"))
          }
          // generate jwt
          const payload = {
            id: userFound._id.toString()
          }

          const maxAge = 2 * 60 * 60; // 2 hours
          const token = getToken(payload, maxAge);

          userFound.token =  token;

          res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
          });

          await userFound.save();

          return res.json({logged: true, user: token});
        }
      });
    }).catch((err) => {
      next(err)
    });
}

export const logout = (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(404).json({ error: 'Missing user id.' })
  }
  
  User.findById(userId).then((result) => {
    const token = result.token;
    const cookieToken = req.cookies.jwt;

    if (token === cookieToken) {
      result.token = '';
      result.save();
      return res.clearCookie('jwt').status(200).json({ logged: false, user: null})
    }

  }).catch((error) => next(err));
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
  if (!updData.id) {
    next(new Error('Missing data'))
  }

  if (Object.keys(updData).length <= 1) {
    next(new Error('Nothing to update'))
  }

  User.findByIdAndUpdate(updData.id, updData, { returnOriginal: false })
  .then((result) => {
    if (!result) {
      next(new Error("Not found"))      
    }
    return res.json(result)
  }).catch((err) => {
    next(err)
  });
}

export const getRoles = async (req, res, next) => {
  const roles = await Role.find()
  return res.json(roles)
}

export const getUsers = async (req, res, next) => {
  const users = await User.find()
  return res.json(users)
}
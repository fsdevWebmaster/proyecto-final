import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Driver from '../models/driver.model.js';

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
    
    res.status(201).json({ added: true, regData });
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
  res.json({ 
    msg: 'Pending find user by email. authenticate and generate jwt.',
    body 
  });
}

export const profile = (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Missing user id' })
  }

  User.findById(userId)
    .then((result) => {
      return res.json({ profile: result })
    }).catch((err) => {
      console.log("Error getting user profile", err)
      return res.status(404).json({ error: 'User not found' })
    });
}

export const newDriver = (req, res) => {
  const newDriver = new Driver(req.body)  
  newDriver.save()
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      if (err.message.includes('E11000 duplicate key error')) {
        return res.status(400).json({ error: 'User already registered.' })
      }
      if (err.message.includes('is required')) {
        return res.status(400).json({ error: 'Wrong or missing data.' })
      }
    });
}

export const getDriver = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Wrong or missing id." })
  }

  Driver.findById(id)
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      return res.status(400).json({ error: err.message })
    });
}

export const searchDriver = (req, res) => {
  const { idDoc } = req.params;
  if (!idDoc) {
    return res.status(500).json({ TODO: "Search error" })
  }
  Driver.find({ idDoc })
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).json({ error: "User not found." })
      }
      return res.json(result[0])
    }).catch((err) => {
      return res.status(500).json({ TODO: "Error finding driver by idDoc:", err })
    });

}

export const updateDriver = (req, res) => {
  const { id } = req.params
  const { name, idDoc, email } = req.body
  Driver.findById(id)
    .then((result) => {
      result.name = name
      result.idDoc = idDoc
      result.email = email
      result.save()
        .then((saveResult) => {
          return res.json(saveResult)
        }).catch((saveErr) => {
          return res.status(500).json({ TODO: saveErr })
        });
    }).catch((err) => {
      
    });
}
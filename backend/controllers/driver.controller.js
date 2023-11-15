import Driver from '../models/driver.model.js';
import { getToken } from '../utils/app.utils.js';

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

  export const loginDriver = async (req, res, next) => {
    let { body } = req;

    const { idDoc } = body;

    if (!idDoc) {
      next(new Error("Missing data"));
    }

    Driver.find({ idDoc })
      .then((result) => {
        const driverFound = result[0];

        if(!driverFound) {
          next(new Error("Driver not found"))
        }

        // generate jwt
        const payload = {
          driver: driverFound
        }

        const maxAge = 6 * 60 * 60; // 6 hours
        const token = getToken(payload, maxAge);

        return res.json(
          {
            token
          }
        );
      }).catch((err) => {
        next(err);
      });
  }
  
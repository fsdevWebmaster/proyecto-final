import Driver from '../models/driver.model.js';
import { getToken } from '../utils/app.utils.js';

export const newDriver = (req, res, next) => {
    const newDriver = new Driver(req.body)  
    newDriver.save()
      .then((result) => {
        return res.json(result)
      }).catch((err) => {
        return next(err)
      });
  }

export const getDriver = (req, res, next) => {
    const { id } = req.params;
    if (!id) {
      return next(new Error('Missing data'))
    }
    Driver.findByI(id)
      .then((result) => {
        return res.json(result)
      }).catch((err) => {
        return next(err)
      });
  }

  export const searchDriver = (req, res, next) => {
    const { idDoc } = req.params;

    if (!idDoc || idDoc === ':idDoc') {
      return next(new Error('Missing data'))

    }
    Driver.find({ idDoc })
      .then((result) => {
        if (result.length === 0) {
          return next(new Error('Not found'))
        }
        return res.json(result[0])
      }).catch((err) => {
        return next(err)
      });
  }

  export const updateDriver = (req, res, next) => {
    const { id } = req.params
    const { name, idDoc, email } = req.body
    if (!name || !idDoc || !email) {
      return next(new Error('Missing data'))
    }
    Driver.findByI(id)
      .then((result) => {
        if (!result) {
          return next(new Error('Not found'))
        }
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
      return next(new Error("Missing data"));
    }

    Driver.find({ idDoc })
      .then((result) => {
        const driverFound = result[0];

        if(!driverFound) {
          return next(new Error("Driver not found"))
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
  
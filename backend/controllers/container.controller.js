import Container from "../models/container.model.js";

export const newContainer = (req, res, next) => {
  const { containerNumber } = req.body
  if (!containerNumber) {
    return next(new Error("Missing data"))
  }
  const container = new Container()
  container.containerNumber = containerNumber
  container.save()
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      return next(err)
    });
}

export const getContainers = (req, res, next) => {
  Container.find()
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      next(err)
    });
}

export const updateContainer = (req, res, next) => {
  const { id } = req.params
  const { containerNumber } = req.body
  if (!containerNumber) {
    return next(new Error('Missing data'))
  }
  Container.findByI(id)
    .then((result) => {
      if (!result) {
       return next(new Error('Not found'))
      }
      result.containerNumber = containerNumber
      result.save()
        .then((saveResult) => {
          return res.json(saveResult)
        }).catch((error) => {
          return next(error)
        });
      }).catch((error) => {
        return next(error)
      });
}

export const containerByNumber = (req, res, next) => {
  const { containerNumber } = req.params

  if (!containerNumber || containerNumber === ':containerNumber') {
    next(new Error("Missing data"))
  }
  else {
    Container.findOne({ containerNumber })
      .then((result) => {
        if (!result) {
          next(new Error("Not found"))
        }
        else {
          return res.json(result)
        }
      }).catch((err) => {
        next(err)
      });
  }
}
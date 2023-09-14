import Container from "../models/container.model.js";

export const newContainer = (req, res) => {
  const { containerNumber } = req.body
  const container = new Container()
  container.containerNumber = containerNumber
  container.save()
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      return res.status(500).json({ TODO: `error handling ${err}` })
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

export const containerByNumber = (req, res, next) => {
  const { containerNumber } = req.params
  if (!containerNumber) {
    next(new Error("Missing data"))
  }
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
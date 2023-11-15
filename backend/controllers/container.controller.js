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


export const updateContainer = (req, res) => {
  const { id } = req.params
  const { containerNumber } = req.body
  Container.findById(id)
    .then((result) => {
      result.containerNumber = containerNumber
      result.save()
        .then((saveResult) => {
          return res.json(saveResult)
        }).catch((error) => {
          return res.status(500).json({ error })
        });
      }).catch((error) => {
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

export const containerById = (req, res, next) => {
  const { containerId } = req.params;

  if(!containerId) {
    next(new Error("Missing data"));
  }

  Container.findById({ "_id": containerId})
  .then((result) => {
    return res.json({ isValidId: result ? true : false, containerNumber: result ? result.containerNumber : null });
  })
  .catch((err) => next(err))
}
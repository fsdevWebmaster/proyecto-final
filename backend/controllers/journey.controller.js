import Container from "../models/container.model.js";
import Journey from "../models/journey.model.js";

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

export const newJourney = (req, res) => {
  let insData = { ...req.body }
  // mock entry date
  const now = new Date()
  insData = { ...insData, entryDate: now, status: '64e51075dc9071b3342697ef' }
  const journey = new Journey(insData);
  journey.save()
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      return res.status(500).json({ TODO: `error handling ${err}` })
    });
}

export const getInTransit = (req, res) => {
  Journey.find({ status: '64e51414dc9071b3342697fa' })
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      return res.status(500).json({ TODO: `Error handling ${err}` })
    });
}
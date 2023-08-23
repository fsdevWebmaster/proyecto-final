import Container from "../models/container.model.js";
import Journey from "../models/journey.model.js";
import JourneyLog from "../models/journeyLog.model.js";

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
    .then(async (result) => {
      const logData = {
        step: "Waiting yard",
        stepValue: "--",
        journeyId: result._id
      }
      const newLog = await newJourneyLog(logData)
      if (!newLog) {
        return res.status(500).json({ TODO: `error handling. Error creating new journey log` })
      }
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

export const newJourneyLog = async (logData) => {
  const newLog = new JourneyLog(logData)
  try {
    const saveResult = await newLog.save()
    return saveResult
  } catch (error) {
    console.log("Error creating journey log", error)
    return false
  }
}
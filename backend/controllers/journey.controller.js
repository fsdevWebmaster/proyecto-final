import Container from "../models/container.model.js";
import Journey from "../models/journey.model.js";
import JourneyLog from "../models/journeyLog.model.js";
import Step from "../models/step.model.js";

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
  insData = { ...insData, status: process.env.STATUS_ON_HOLD }
  const journey = new Journey(insData);
  journey.save()
    .then(async (result) => {
      // gate
      const gateData = {
        step: process.env.STEP_GATE,
        stepValue: "--",
        journeyId: result._id,
        status: process.env.STATUS_ON_HOLD
      }
      const gateLog = await newJourneyLog(gateData)
      if (!gateLog) {
        return res.status(500).json({ TODO: `error handling. Error creating new journey log` })
      }
      // yard
      const yardData = {
        step: process.env.STEP_YARD,
        stepValue: "--",
        journeyId: result._id,
        status: process.env.STATUS_ON_HOLD
      }
      const yardLog = await newJourneyLog(yardData)
      if (!yardLog) {
        return res.status(500).json({ TODO: `error handling. Error creating new journey log` })
      }
      return res.json({ gateLog, yardLog })
    }).catch((err) => {
      return res.status(500).json({ TODO: `error handling ${err}` })
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

export const getInTransit = (req, res) => {
  Journey.find({ status: '64e51414dc9071b3342697fa' })
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      return res.status(500).json({ TODO: `Error handling ${err}` })
    });
}

export const createJourneyLog = async (req, res) => {
  const createData = req.body
  const creatingLog = new JourneyLog(createData)
  creatingLog.save()
    .then(async (result) => {
      await result.populate("journeyId")
      let journey = result.journeyId
      journey.status = result.status;
      journey.save()
        .then((journeyResult) => {
          return res.json({
            journeyResult,
            logResult: result
          })
        }).catch((err) => {
          return res.status(500).json({ TODO: `Error handling ${err}` })
        });
      }).catch((err) => {
        return res.status(500).json({ TODO: `Error handling ${err}` })
      });
}

export const getJourneyLog = (req, res) => {
  const { journey } = req.params
  JourneyLog.find({journeyId: journey})
  .then((result) => {
      return res.json(result)
    }).catch((err) => {
      return res.status(500).json({ TODO: `Error handling ${err}` })
    });
}

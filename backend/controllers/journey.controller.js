import Container from "../models/container.model.js";
import Journey from "../models/journey.model.js";
import JourneyLog from "../models/journeyLog.model.js";
import Step from "../models/step.model.js";
const mockUserId = "64da7c0f484e531a6eeebbfc"

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

export const createJourney = async (req, res) => {
  let createData = req.body
  const journey = new Journey(createData)
  await journey.save()
  await journey.populate("container")
  await journey.populate("driver")
  await journey.populate("step")
  journey.containerNumber = journey.container.containerNumber;
  journey.driverDoc = journey.driver.idDoc
  await journey.save()
  createIniLogs(journey)

  return res.json(createData)
}

const createIniLogs = async (journey) => {
  // gate
  let gateLogData = {
    journey: journey._id,
    step: journey.step,
    stepValue: null,
    user: mockUserId,
    description: ""
  }
  const gateLog = new JourneyLog(gateLogData)
  gateLog.save()

  // yard
  const journeyStep = gateLog.step;
  let yardLogData = {
    journey: journey._id,
    step: journeyStep.next,
    stepValue: null,
    user: mockUserId,
    description: ""
  }
  const yardLog = new JourneyLog(yardLogData)
  yardLog.save()

  // update journey step
  journey.step = journeyStep.next
  journey.save()
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
      // update journey
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

export const updateJourneyLog = (req, res) => {
  const { journeyLogId, stepValue } = req.body
  JourneyLog.findByIdAndUpdate(journeyLogId, { stepValue }, { new: true })
    .then((result) => {
      return res.json(result)
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

export const updateJourney = async (req, res) => {
  const updBody = req.body;
  const journey = await Journey.findById(updBody.journey)
  // update actual log step value
  const actualLog = await JourneyLog.findOne({ journey: updBody.journey, step: journey.step })
  actualLog.stepValue = updBody.value
  await actualLog.save()

  // update journey step
  await journey.populate("step")
  journey.step = journey.step.next
  await journey.save()

  // create new journey log
  const newLog = new JourneyLog({
    journey: updBody.journey,
    step: journey.step,
    stepValue: null,
    user: mockUserId,
    description: ""
  })
  await newLog.save()

  return res.json(actualLog);
}

export const getSteps = (req, res) => {
  Step.find()
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      return res.status(500).json({ TODO: `Error handling ${err}` })
    });
}

export const getStepJourneys = (req, res) => {
  const { step } = req.params
  JourneyLog.find({ step , stepValue: null})
    .then((result) => {
      console.log(result)
    }).catch((err) => {
      console.error(`Error handling ${err}`)
    });
  return res.json({ ok: true });
}
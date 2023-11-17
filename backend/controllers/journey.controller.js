import Journey from "../models/journey.model.js";
import JourneyLog from "../models/journeyLog.model.js";
import Step from "../models/step.model.js";
const exitId = "652d7e154bf411f7d939495b"

export const getJourneyByContainerNumber = (req, res, next) => {
  const { containerNumber } = req.params;
  if (!containerNumber || containerNumber.includes(":")) {
    next(new Error("Missing data"))
  }
  const journey = Journey.findOne({containerNumber, status:{ $ne: 'DONE' }})
    .populate('step')
    .then(result =>{
      if (!result) {
        return res.status(404).json({ message: 'Journey not found for the given container number.' });
      }
      else {
        return res.json(result)
      }
    })
    .catch(error =>{
      return res.status(500).json({ error: 'Error while searching for journey.' });
    })
  }
    
export const createJourney = async (req, res, next) => {
  const postData = req.body
  const createData = {
    driver: postData.driver.id,
    container: postData.container.id,
    step: postData.step.id
  }

  try {
    const journey = new Journey(createData)
    await journey.save()
    await journey.populate("container")
    await journey.populate("driver")
    await journey.populate("step")
    journey.containerNumber = journey.container.containerNumber;
    if (!journey.driver) {
      next(new Error("Not found driver"))
    }
    journey.driverDoc = journey.driver.idDoc
    await journey.save()
    const j = await createIniLogs(journey, postData)
    return res.json(j)
  } catch (error) {
    next(error) 
  }
}

const createIniLogs = async (journey, postData) => {
  // gate
  let gateLogData = {
    journey: journey._id,
    step: journey.step,
    stepValue: null,
    user: postData.userId,
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
    user: postData.userId,
    description: ""
  }
  const yardLog = new JourneyLog(yardLogData)
  yardLog.save()

  // update journey step
  journey.step = journeyStep.next
  await journey.populate("step")
  journey.save()
  return journey
}

export const createJourneyLog = async (req, res, next) => {
  const createData = req.body
  const creatingLog = new JourneyLog(createData)
  creatingLog.save()
    .then(async (result) => {
      // update journey
      await result.populate("journey")
      let journey = result.journey
      journey.save()
        .then((journeyResult) => {
          return res.json({
            journeyResult,
            logResult: result
          })
        }).catch((err) => {
          console.log("save journey error::", err)
          next(err)
        });
      }).catch((err) => {
        console.log("creatingLog error::", err)
        next(err)
      });
}

export const updateJourneyLog = (req, res, next) => {
  const { journeyLogId, stepValue } = req.body
  JourneyLog.findByIdAndUpdate(journeyLogId, { stepValue }, { new: true })
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      next(err)
    });
}

export const getJourneyLog = (req, res, next) => {
  const { journey, step } = req.body

  if(!journey || !step) {
    next(Error('Missing data'))
  }

  JourneyLog.find({journey, step})
    .then((result) => {
      return res.json(result[0])
    }).catch((err) => {
      next(err)
    });
}

export const updateJourney = async (req, res, next) => {
  const updBody = req.body;
  try {
    if (!updBody.journey || !updBody.step) {
      next(new Error("Missing data"))
    }
    const journey = await Journey.findById(updBody.journey)
    // update actual log step value
    const actualLog = await JourneyLog.findOne({ journey: updBody.journey, step: journey.step }).exec()
    if (!actualLog) {
      next(new Error('Not found'))
    }
    else {
      actualLog.stepValue = updBody.value
      await actualLog.save()
    }
  
    // update journey
    await journey.populate("step")
    if (journey.step.next) {
      journey.step = journey.step.next
      journey.status = updBody.status
      await journey.save()
    }
  
    // create new journey log
    const newLog = new JourneyLog({
      journey: updBody.journey,
      step: journey.step,
      stepValue: null,
      user: updBody.userId,
      description: ""
    })
    await newLog.save()

    return res.json(actualLog);      
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const journeyToUnload = async (req, res, next) => {
  const { journeyId, userId } = req.body
  if (!journeyId) {
    next(new Error('Missing data'))
  }

  try {
    // update journey
    const journey = await Journey.findOneAndUpdate(
      { _id: journeyId, status: { $ne: 'DONE' }},
      { step: exitId}
    )
    // create log
    let logData = {
      journey: journey._id,
      step: exitId,
      stepValue: null,
      user: userId,
      description: ""
    }
    const log = new JourneyLog(logData)
    const created = await log.save()
    return res.json(created)
  } catch (error) {
    next(error)
  }
}

export const getSteps = async (req, res, next) => {
  const steps = await Step.find();
  let stepsData = steps.map(async (step) => {
    let stepRow = {}
    const journeys = await stepJourneys(step)
    stepRow = {...stepRow, step: step, journeys: journeys }
    return stepRow
  })
  stepsData = await Promise.all(stepsData);
  return res.json(stepsData)
}

export const getStations = async (req, res, next) => {
  try {
    const steps = await Step.find();
    if (steps) {
      return res.status(200).json(steps);
    }
  } catch (error) {
    next();
  }  
}

const stepJourneys = async (step) => {
  const journeys = await Journey.find({ step });
  return journeys
}

export const getStepJourneys = async (req, res, next) => {
  const { step } = req.params
  if (!step) {
    next(new Error('Missing data'))
  }
  try {
    const journeys = await Journey.find({ step });
    return res.json(journeys)
  } catch (error) {
    next()
  }
}

export const getJourneyByDriver = (req, res, next) => {
  const driverId = req.body.driver
  if (!driverId) {
    next(new Error("Missing data"))
  }
  Journey.findOne({ driver: driverId })
  .then((result) => {
    if (!result) {
      next(new Error("Not found"))
    }
    return res.json(result)
  }).catch((err) => {
    next(err)
  })    
}

export const getJourneyLogs = async (req, res, next) => {
  const { journeyId } = req.params
  if (!journeyId) {
    return next(new Error('Missing data'))
  }
  try {
    const resp = await JourneyLog.find({ journey: journeyId }).exec()
    if (resp.length < 1) {
      return next(new Error('Not found'))
    }
    const promises = resp.map(async item => {
      await item.populate('journey')
      return item
    })
    let logs = await Promise.all(promises)
    const jLogs = logs.filter(item => item.journey.status === 'ON_HOLD' || item.journey.status === 'IN_PROGRESS')
    return res.json(jLogs)
  } catch (error) {
    return next(error)
  }
}

export const getJourneyByDriverDocId = async (req, res, next) => {
  const { docId } = req.params;

  if (!docId || docId.length === 0) {
    return next(new Error("Missing data"))
  }

  try {
    const resp = await Journey.findOne({ driverDoc: docId, status: { $in: ['ON_HOLD', 'IN_PROGRESS'] } }).exec()
    if (!resp) {
      return next(new Error("Not found"));
    }
    return res.json({ journeyId: resp._id.toString() })    
  } catch (error) {
    return next(error)
  }
}

export const finishJourney = async (req, res, next) => {
  const { journeyId, step, journeyLogId } = req.body
  
  if (!journeyId || !step || !journeyLogId) {
    return next(new Error("Missing data"))
  }
  
  try {
    const journey = await Journey.findByIdAndUpdate(journeyId, { status: 'DONE' })
    const journeyLog = await JourneyLog.findByIdAndUpdate(journeyLogId, { stepValue: true })
    if (!journey || !journeyLog) {
      return next(new Error("Not found"))
    }
    return res.json({ journeyFinished: true })
  } catch (error) {
    return next(error)
  }
}
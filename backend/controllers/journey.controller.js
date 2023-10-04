import Journey from "../models/journey.model.js";
import JourneyLog from "../models/journeyLog.model.js";
import Step from "../models/step.model.js";
const hardGateId = "64f7a092eb2116cb79ca7445"
const hardUserId = "64f8b2a5968ea93827b02a91"

export const getJourneyByContainerNumber = (req, res, next) => {
  const { containerNumber } = req.params;
  if (!containerNumber || containerNumber.includes(":")) {
    next(new Error("Missing data"))
  }
  const journey = Journey.findOne({containerNumber})    
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
    step: hardGateId
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
    const j = await createIniLogs(journey)
    return res.json(j)
  } catch (error) {
    next(error) 
  }
}

const createIniLogs = async (journey) => {
  // gate
  let gateLogData = {
    journey: journey._id,
    step: journey.step,
    stepValue: null,
    user: hardUserId,
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
    user: hardUserId,
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
  const { journey } = req.params
  JourneyLog.find({journeyId: journey})
    .then((result) => {
      return res.json(result)
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
  
    // update journey step
    await journey.populate("step")
    if (journey.step.next) {
      journey.step = journey.step.next
      await journey.save()
    }
  
    // create new journey log
    const newLog = new JourneyLog({
      journey: updBody.journey,
      step: journey.step,
      stepValue: null,
      user: hardUserId,
      description: ""
    })
    await newLog.save()

    return res.json(actualLog);      
  } catch (error) {
    next(error)
  }
}

export const getSteps = (req, res, next) => {
  Step.find()
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      next(err)
    });
}

export const getStepJourneys = async (req, res, next) => {
  try {
    const { step } = req.params
    const journeys = await Journey.find({ step });
    const result = {
      stepCount: journeys.length, 
      step: step,
      journeys: journeys,
    };
    return res.json(result)    
  } catch (error) {
    next(error)
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

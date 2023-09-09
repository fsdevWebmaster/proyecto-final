import Journey from "../models/journey.model.js";
import JourneyLog from "../models/journeyLog.model.js";
import Step from "../models/step.model.js";
const mockUserId = "64da7c0f484e531a6eeebbfc"


export const getJourneyByContainerNumber = (req, res) => {
  const {containerNumber} = req.params;
  const journey = Journey.findOne({containerNumber})    
    .then(result =>{
      console.log(result);
      if (!result) {
        return res.status(404).json({ message: 'Journey not found for the given container number.' });
      }
      return res.json(result)
    })
    .catch(error =>{
      return res.status(500).json({ error: 'Error while searching for journey.' });
    })
  }
    
    

export const createJourney = async (req, res, next) => {
  let createData = req.body
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
    createIniLogs(journey)
    return res.json(createData)
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

export const createJourneyLog = async (req, res, next) => {
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
          next(err)
        });
      }).catch((err) => {
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

export const updateJourney = async (req, res) => {
  const updBody = req.body;
  try {
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

export const getStepJourneys = (req, res, next) => {
  const { step } = req.params
  JourneyLog.find({ step , stepValue: null})
    .then((result) => {
      console.log(result)
    }).catch((err) => {
      next(err)
    });
  return res.json({ ok: true });
}

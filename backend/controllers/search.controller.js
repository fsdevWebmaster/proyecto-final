import Container from "../models/container.model.js";
import Driver from "../models/driver.model.js";
import Journey from "../models/journey.model.js";

export const search = async (req, res, next) => {
  const { searchType, searchString, stepId } = req.body
  const gateId = '64f7a092eb2116cb79ca7445'

  if (searchString) {
    let found;
    if (stepId === gateId && searchType === 'containers') {
      found = await Container.find({ 
        "containerNumber": { "$regex": searchString }
      }).exec()
    }
    else if (stepId !== gateId && searchType === 'containers') {
      found = await Journey.find({ 
        "containerNumber": { "$regex": searchString },
        "step": { $ne: gateId }
      }).exec()
    }
    else if (searchType === 'drivers') {
      found = await Driver.find({ 
        "idDoc": { "$regex": searchString },
      }).exec()
    }
    return res.json(found)
  }

}
import Container from "../models/container.model.js";
import Driver from "../models/driver.model.js";

export const search = async (req, res, next) => {
  const { searchType, searchString } = req.body
  if (searchString) {
    let found;
    switch (searchType) {
      case 'containers': 
        found = await Container.find({ 
          "containerNumber": { "$regex": searchString },
        }).exec()
      break;
      case 'drivers': 
        found = await Driver.find({ 
          "idDoc": { "$regex": searchString },
        }).exec()
      break;
    }
    return res.json(found)
  }

}